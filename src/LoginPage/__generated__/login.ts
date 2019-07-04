/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_tokenAuth {
  __typename: "ObtainJSONWebToken";
  token: string | null;
  refreshToken: string | null;
}

export interface login {
  tokenAuth: login_tokenAuth | null;
}

export interface loginVariables {
  username: string;
  password: string;
}
