/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPerformanceOrderForm
// ====================================================

export interface GetPerformanceOrderForm_performanceOrderForm_receipt_tickets_performance {
  __typename: "Performance";
  id: string;
}

export interface GetPerformanceOrderForm_performanceOrderForm_receipt_tickets_ticketType {
  __typename: "TicketType";
  id: string;
}

export interface GetPerformanceOrderForm_performanceOrderForm_receipt_tickets {
  __typename: "Ticket";
  id: string;
  performance: GetPerformanceOrderForm_performanceOrderForm_receipt_tickets_performance;
  ticketType: GetPerformanceOrderForm_performanceOrderForm_receipt_tickets_ticketType;
}

export interface GetPerformanceOrderForm_performanceOrderForm_receipt {
  __typename: "Receipt";
  id: string;
  tickets: GetPerformanceOrderForm_performanceOrderForm_receipt_tickets[];
}

export interface GetPerformanceOrderForm_performanceOrderForm_production {
  __typename: "Production";
  id: string;
  title: string | null;
}

export interface GetPerformanceOrderForm_performanceOrderForm_performance {
  __typename: "Performance";
  id: string;
  showtimeAt: any | null;
}

export interface GetPerformanceOrderForm_performanceOrderForm_ticketTypes {
  __typename: "TicketType";
  id: string;
  name: string;
  priceInCents: number;
}

export interface GetPerformanceOrderForm_performanceOrderForm {
  __typename: "PerformanceOrderForm";
  receipt: GetPerformanceOrderForm_performanceOrderForm_receipt;
  production: GetPerformanceOrderForm_performanceOrderForm_production;
  performance: GetPerformanceOrderForm_performanceOrderForm_performance;
  ticketTypes: GetPerformanceOrderForm_performanceOrderForm_ticketTypes[];
}

export interface GetPerformanceOrderForm {
  /**
   * Performance order form fields
   */
  performanceOrderForm: GetPerformanceOrderForm_performanceOrderForm | null;
}

export interface GetPerformanceOrderFormVariables {
  id: string;
}
