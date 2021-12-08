import { gql } from "@apollo/client";

export const GetOrganizationCustomersQuery = gql`
  query GetOrganizationCustomers($organizationId: ID!, $cursor: String) {
    organization(id: $organizationId) {
      id
      customers(after: $cursor) {
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            name
            email
          }
        }
      }
    }
  }
`;
