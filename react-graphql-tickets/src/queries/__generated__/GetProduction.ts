/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProduction
// ====================================================

export interface GetProduction_production_performances {
  __typename: "Performance";
  id: string;
  name: string | null;
  showtimeAt: any | null;
}

export interface GetProduction_production {
  __typename: "Production";
  id: string;
  title: string | null;
  performanceCount: number;
  /**
   * Performances of the given production
   */
  performances: GetProduction_production_performances[] | null;
}

export interface GetProduction {
  /**
   * A single production
   */
  production: GetProduction_production;
}

export interface GetProductionVariables {
  organizationId: string;
  productionId: string;
}
