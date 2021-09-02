/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthProviderCredentialsInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: signIn
// ====================================================

export interface signIn_signInUser_user {
  __typename: "User";
  name: string | null;
  email: string | null;
}

export interface signIn_signInUser {
  __typename: "SignInUserPayload";
  user: signIn_signInUser_user | null;
  token: string | null;
}

export interface signIn {
  signInUser: signIn_signInUser | null;
}

export interface signInVariables {
  credentials: AuthProviderCredentialsInput;
}
