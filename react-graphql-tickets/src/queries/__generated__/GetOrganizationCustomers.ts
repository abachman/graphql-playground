/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganizationCustomers
// ====================================================

export interface GetOrganizationCustomers_organization_customers_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface GetOrganizationCustomers_organization_customers_edges_node {
  __typename: "Customer";
  id: string;
  name: string | null;
  email: string | null;
}

export interface GetOrganizationCustomers_organization_customers_edges {
  __typename: "CustomerEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: GetOrganizationCustomers_organization_customers_edges_node | null;
}

export interface GetOrganizationCustomers_organization_customers {
  __typename: "CustomerConnection";
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetOrganizationCustomers_organization_customers_pageInfo;
  /**
   * A list of edges.
   */
  edges: (GetOrganizationCustomers_organization_customers_edges | null)[] | null;
}

export interface GetOrganizationCustomers_organization {
  __typename: "Organization";
  customers: GetOrganizationCustomers_organization_customers;
}

export interface GetOrganizationCustomers {
  /**
   * A single organization
   */
  organization: GetOrganizationCustomers_organization;
}

export interface GetOrganizationCustomersVariables {
  organizationId: string;
  cursor?: string | null;
}
