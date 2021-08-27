/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganizations
// ====================================================

export interface GetOrganizations_organizations {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface GetOrganizations {
  /**
   * All organizations
   */
  organizations: GetOrganizations_organizations[] | null;
}
