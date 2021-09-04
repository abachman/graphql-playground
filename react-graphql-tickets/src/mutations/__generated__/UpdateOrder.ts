/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrderInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateOrder
// ====================================================

export interface UpdateOrder_updateOrder_receipt_tickets_ticketType_production {
  __typename: "Production";
  id: string;
}

export interface UpdateOrder_updateOrder_receipt_tickets_ticketType {
  __typename: "TicketType";
  name: string;
  priceInCents: number;
  production: UpdateOrder_updateOrder_receipt_tickets_ticketType_production;
}

export interface UpdateOrder_updateOrder_receipt_tickets_performance {
  __typename: "Performance";
  id: string;
}

export interface UpdateOrder_updateOrder_receipt_tickets {
  __typename: "Ticket";
  id: string;
  ticketType: UpdateOrder_updateOrder_receipt_tickets_ticketType;
  performance: UpdateOrder_updateOrder_receipt_tickets_performance;
}

export interface UpdateOrder_updateOrder_receipt {
  __typename: "Receipt";
  id: string;
  tickets: UpdateOrder_updateOrder_receipt_tickets[];
}

export interface UpdateOrder_updateOrder {
  __typename: "UpdateOrderPayload";
  receipt: UpdateOrder_updateOrder_receipt;
}

export interface UpdateOrder {
  updateOrder: UpdateOrder_updateOrder | null;
}

export interface UpdateOrderVariables {
  receiptId: string;
  update: UpdateOrderInput;
}
