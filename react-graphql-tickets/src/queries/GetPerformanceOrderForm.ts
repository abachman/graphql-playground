import { gql } from "@apollo/client";

export const GetPerformanceOrderFormQuery = gql`
  query GetPerformanceOrderForm($id: ID!) {
    performanceOrderForm(id: $id) {
      receipt {
        id
        tickets {
          id
          performance {
            id
          }
          ticketType {
            id
          }
        }
      }
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
