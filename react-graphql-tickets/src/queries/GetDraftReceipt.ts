import { gql } from "@apollo/client";

export const GetDraftReceiptQuery = gql`
  query GetDraftReceipt {
    draftReceipt {
      id
      customer {
        id
        name
        email
        user {
          id
          name
          email
        }
      }
      tickets {
        id
        ticketType {
          id
          priceInCents
          production {
            id
            title
            organization {
              id
              name
            }
          }
        }
        performance {
          id
          showtimeAt
        }
      }
    }
  }
`;
