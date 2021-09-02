/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPerformanceOrderForm
// ====================================================

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
