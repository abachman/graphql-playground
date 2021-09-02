/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateOrder
// ====================================================

export interface CreateOrder_createOrder_receipt {
  __typename: "Receipt";
  id: string;
}

export interface CreateOrder_createOrder {
  __typename: "CreateOrderPayload";
  receipt: CreateOrder_createOrder_receipt;
}

export interface CreateOrder {
  createOrder: CreateOrder_createOrder | null;
}
