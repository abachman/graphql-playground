import { gql } from "@apollo/client";

interface Performance {
  id: number;
  showtimeAt: string;
}

export interface GetProductionData {
  id: number;
  title: string;
  performanceCount: number;
  performances: Performance[];
}

export interface GetProductionVariables {
  organizationId: string;
  productionId: string;
}

export const GetProduction = gql`
  query GetProduction($organizationId: ID!, $productionId: ID!) {
    production(organizationId: $organizationId, id: $productionId) {
      id
      title
      performanceCount
      performances {
        id
        showtimeAt
      }
    }
  }
`;
