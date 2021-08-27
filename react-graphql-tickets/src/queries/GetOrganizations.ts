import { gql } from "@apollo/client";

interface Organization {
  id: number;
  name: string;
}

export interface GetOrganizationsData {
  organizations: Organization[];
}

export const GetOrganizations = gql`
  query GetOrganizations {
    organizations {
      id
      name
    }
  }
`;
