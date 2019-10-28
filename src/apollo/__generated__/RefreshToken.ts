/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RefreshToken
// ====================================================

export interface RefreshToken_refreshToken {
  __typename: "Refresh";
  token: string | null;
  refreshToken: string | null;
}

export interface RefreshToken {
  refreshToken: RefreshToken_refreshToken | null;
}

export interface RefreshTokenVariables {
  refreshToken: string;
}
