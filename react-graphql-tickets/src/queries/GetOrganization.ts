import { gql } from "@apollo/client";

export const GetOrganizationQuery = gql`
  query GetOrganization($organizationId: ID!) {
    organization(id: $organizationId) {
      id
      name
      productions {
        id
        title
      }
    }
  }
`;
