import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  ObjMap: any;
};

export type AuthenticationDto_Input = {
  address: Scalars['String'];
  signature: Scalars['String'];
};

export type ChallengeDto_Input = {
  address: Scalars['String'];
};

export enum HttpMethod {
  Connect = 'CONNECT',
  Delete = 'DELETE',
  Get = 'GET',
  Head = 'HEAD',
  Options = 'OPTIONS',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT',
  Trace = 'TRACE'
}

export type Mutation = {
  __typename?: 'Mutation';
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `{env.AUTH_SERVICE}`
   * >**Path**: `/auth/challenge`
   * Challenge user nonce
   *
   */
  challengeNonce?: Maybe<NonceDto>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `{env.AUTH_SERVICE}`
   * >**Path**: `/auth/login`
   * Login
   *
   */
  login?: Maybe<TokenDto>;
};


export type MutationChallengeNonceArgs = {
  input?: InputMaybe<ChallengeDto_Input>;
};


export type MutationLoginArgs = {
  input?: InputMaybe<AuthenticationDto_Input>;
};

export type NonceDto = {
  __typename?: 'NonceDto';
  nonce: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `{env.AUTH_SERVICE}`
   * >**Path**: `/health`
   * Auth service health check
   *
   */
  authHealthCheck?: Maybe<AuthHealthCheck_200_Response>;
};

export type TokenDto = {
  __typename?: 'TokenDto';
  token: Scalars['String'];
};

export type AuthHealthCheck_200_Response = {
  __typename?: 'authHealthCheck_200_response';
  details?: Maybe<Query_AuthHealthCheck_Details>;
  info?: Maybe<Query_AuthHealthCheck_Info>;
  status?: Maybe<Scalars['String']>;
};

export type Query_AuthHealthCheck_Details = {
  __typename?: 'query_authHealthCheck_details';
  additionalProperties?: Maybe<Array<Maybe<Query_AuthHealthCheck_Details_AdditionalProperties_Entry>>>;
  database?: Maybe<Query_AuthHealthCheck_Details_Database>;
};

export type Query_AuthHealthCheck_Details_AdditionalProperties = {
  __typename?: 'query_authHealthCheck_details_additionalProperties';
  additionalProperties?: Maybe<Scalars['JSON']>;
  status?: Maybe<Scalars['String']>;
};

export type Query_AuthHealthCheck_Details_AdditionalProperties_Entry = {
  __typename?: 'query_authHealthCheck_details_additionalProperties_entry';
  key: Scalars['ID'];
  value?: Maybe<Query_AuthHealthCheck_Details_AdditionalProperties>;
};

export type Query_AuthHealthCheck_Details_Database = {
  __typename?: 'query_authHealthCheck_details_database';
  status?: Maybe<Scalars['String']>;
};

export type Query_AuthHealthCheck_Info = {
  __typename?: 'query_authHealthCheck_info';
  additionalProperties?: Maybe<Array<Maybe<Query_AuthHealthCheck_Info_AdditionalProperties_Entry>>>;
  database?: Maybe<Query_AuthHealthCheck_Info_Database>;
};

export type Query_AuthHealthCheck_Info_AdditionalProperties = {
  __typename?: 'query_authHealthCheck_info_additionalProperties';
  additionalProperties?: Maybe<Scalars['JSON']>;
  status?: Maybe<Scalars['String']>;
};

export type Query_AuthHealthCheck_Info_AdditionalProperties_Entry = {
  __typename?: 'query_authHealthCheck_info_additionalProperties_entry';
  key: Scalars['ID'];
  value?: Maybe<Query_AuthHealthCheck_Info_AdditionalProperties>;
};

export type Query_AuthHealthCheck_Info_Database = {
  __typename?: 'query_authHealthCheck_info_database';
  status?: Maybe<Scalars['String']>;
};
