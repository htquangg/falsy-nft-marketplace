import { ConfigModule } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { HDNodeWallet, Wallet } from 'ethers';
import { join } from 'path';
import * as request from 'supertest';
import { GenericContainer, PostgreSqlContainer } from 'testcontainers';
import Web3Token from 'web3-token';
import { AppModule } from '../src/app.module';

describe('Authentication Service (e2e)', () => {
  let app: NestFastifyApplication;
  let signer: HDNodeWallet;

  beforeAll(async () => {
    await new PostgreSqlContainer()
      .withExposedPorts({
        host: 5433,
        container: 5432,
      })
      .start();

    await new GenericContainer('redis')
      .withExposedPorts({
        host: 6380,
        container: 6379,
      })
      .start();

    // Generate wallet for testing
    signer = Wallet.createRandom();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: join(__dirname, 'test.env'),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/challenge (POST): Challenge nonce', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/auth/challenge')
      .send({ address: signer.address });

    expect(status).toEqual(201);
    expect(body.nonce).not.toBeNull();
  });

  it('/auth/login (POST): Login', async () => {
    const signerAddress = signer.address;

    const { status, body } = await request(app.getHttpServer())
      .post('/auth/challenge')
      .send({ address: signerAddress });

    expect(status).toEqual(201);
    expect(body.nonce).not.toBeNull();

    const currentNonce = body.nonce as string;

    const signature = await Web3Token.sign(
      async (msg: any) => await signer.signMessage(msg),
      {
        domain: 'example.com',
        statement: 'I accept the WoD Terms of Service: https://service.org/tos',
        expires_in: '1 days',
        nonce: currentNonce,
      },
    );

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        address: signer.address,
        signature: signature,
      });

    expect(loginResponse.status).toEqual(201);
    expect(loginResponse.body?.token).not.toBeNull();
  });
});
