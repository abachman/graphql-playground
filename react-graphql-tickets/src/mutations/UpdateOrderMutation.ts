import { gql } from "@apollo/client";

export const UpdateOrderMutation = gql`
  mutation UpdateOrder($receiptId: ID!, $update: UpdateOrderInput!) {
    updateOrder(receiptId: $receiptId, update: $update) {
      receipt {
        id
        tickets {
          id
          ticketType {
            name
            priceInCents
            production {
              id
            }
          }
          performance {
            id
          }
        }
      }
    }
  }
`;
