import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const SCHEMA_URL = process.env.GATEWAY_URL as string;

const config: CodegenConfig = {
	overwrite: true,
	schema: SCHEMA_URL,
	generates: {
		'src/lib/graphql/graphql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-document-nodes']
		}
	}
};

export default config;
