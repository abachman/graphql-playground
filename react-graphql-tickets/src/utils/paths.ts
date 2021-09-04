import { ProductionParams } from "./../components/ProductionContainer";
import { PerformanceOrderParams } from "../components/PerformanceOrderForm";
import { OrganizationParams } from "../components/OrganizationContainer";

export const Paths = {
  root: () => "/",

  organization: ({ id }: OrganizationParams) => `/${id}`,

  production: ({ organizationId, productionId }: ProductionParams) =>
    `/${organizationId}/${productionId}`,

  performance: ({
    organizationId,
    productionId,
    performanceId,
  }: PerformanceOrderParams) =>
    `/${organizationId}/${productionId}/${performanceId}`,

  checkout: () => "/checkout",
};
