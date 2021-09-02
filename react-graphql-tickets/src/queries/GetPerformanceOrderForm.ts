import { gql } from "@apollo/client";

export const GetPerformanceOrderFormQuery = gql`
  query GetPerformanceOrderForm($id: ID!) {
    performanceOrderForm(id: $id) {
      production {
        id
        title
      }
      performance {
        id
        showtimeAt
      }
      ticketTypes {
        id
        name
        priceInCents
      }
    }
  }
`;
