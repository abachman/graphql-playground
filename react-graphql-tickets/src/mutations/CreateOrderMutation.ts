import { gql } from "@apollo/client";

export const CreateOrderMutation = gql`
  mutation CreateOrder {
    createOrder {
      receipt {
        id
      }
    }
  }
`;
