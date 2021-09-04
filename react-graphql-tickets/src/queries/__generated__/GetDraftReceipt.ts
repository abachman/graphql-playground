/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDraftReceipt
// ====================================================

export interface GetDraftReceipt_draftReceipt_customer_user {
  __typename: "User";
  id: string;
  name: string | null;
  email: string | null;
}

export interface GetDraftReceipt_draftReceipt_customer {
  __typename: "Customer";
  id: string;
  name: string | null;
  email: string | null;
  user: GetDraftReceipt_draftReceipt_customer_user | null;
}

export interface GetDraftReceipt_draftReceipt_tickets_ticketType_production_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface GetDraftReceipt_draftReceipt_tickets_ticketType_production {
  __typename: "Production";
  id: string;
  title: string | null;
  organization: GetDraftReceipt_draftReceipt_tickets_ticketType_production_organization;
}

export interface GetDraftReceipt_draftReceipt_tickets_ticketType {
  __typename: "TicketType";
  id: string;
  priceInCents: number;
  production: GetDraftReceipt_draftReceipt_tickets_ticketType_production;
}

export interface GetDraftReceipt_draftReceipt_tickets_performance {
  __typename: "Performance";
  id: string;
  showtimeAt: any | null;
}

export interface GetDraftReceipt_draftReceipt_tickets {
  __typename: "Ticket";
  id: string;
  ticketType: GetDraftReceipt_draftReceipt_tickets_ticketType;
  performance: GetDraftReceipt_draftReceipt_tickets_performance;
}

export interface GetDraftReceipt_draftReceipt {
  __typename: "Receipt";
  id: string;
  customer: GetDraftReceipt_draftReceipt_customer;
  tickets: GetDraftReceipt_draftReceipt_tickets[];
}

export interface GetDraftReceipt {
  draftReceipt: GetDraftReceipt_draftReceipt | null;
}
