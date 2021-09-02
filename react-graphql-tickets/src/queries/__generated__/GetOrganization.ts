/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganization
// ====================================================

export interface GetOrganization_organization_productions {
  __typename: "Production";
  id: string;
  title: string | null;
}

export interface GetOrganization_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
  productions: GetOrganization_organization_productions[];
}

export interface GetOrganization {
  /**
   * A single organization
   */
  organization: GetOrganization_organization;
}

export interface GetOrganizationVariables {
  organizationId: string;
}
