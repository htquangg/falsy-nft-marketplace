import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';
dotenv.config();

const PUBLIC_GATEWAY_URL = process.env.PUBLIC_GATEWAY_URL;

const config: CodegenConfig = {
	overwrite: true,
	schema: PUBLIC_GATEWAY_URL,
	generates: {
		'src/lib/graphql/generated-types.ts': {
			plugins: ['typescript', 'typescript-document-nodes']
		}
	}
};

export default config;
