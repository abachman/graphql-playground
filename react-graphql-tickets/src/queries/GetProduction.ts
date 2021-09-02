import { gql } from "@apollo/client";

export interface Performance {
  id: number;
  showtimeAt: string;
  name: string;
}

export interface Production {
  id: number;
  title: string;
  performanceCount: number;
  performances: Performance[];
}

export interface GetProductionData {
  production: Production;
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
        name
        showtimeAt
      }
    }
  }
`;
