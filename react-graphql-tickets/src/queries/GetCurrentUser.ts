import { gql } from "@apollo/client";

interface User {
  id: number;
  name: string;
  email: string;
  organizationId: number;
}

export interface GetCurrentUserData {
  currentUser: User | null;
}

export const GetCurrentUser = gql`
  query {
    currentUser {
      id
      name
      email
      organizationId
    }
  }
`;
