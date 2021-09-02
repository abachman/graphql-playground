import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  GetProduction,
  GetProductionData,
  GetProductionVariables,
} from "../queries/GetProduction";
import { PerformancesTableRow } from "./PerformancesTableRow";
import { QueryError } from "./QueryError";

export interface ProductionParams {
  productionId: string;
  organizationId: string;
}

export const ProductionContainer = () => {
  const { organizationId, productionId } = useParams<ProductionParams>();

  const { loading, error, data } = useQuery<
    GetProductionData,
    GetProductionVariables
  >(GetProduction, {
    variables: { organizationId, productionId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <QueryError error={error} />;

  if (!data) return <p>NO DATA</p>;

  const { production } = data;

  return (
    <div>
      <header>
        <h2>{production.title}</h2>
        <Link to={`/${organizationId}`}>See all productions</Link>
      </header>

      {production.performanceCount && (
        <h3 className="mt-8 mb-4">
          <strong>{production.performanceCount} Performances</strong>
        </h3>
      )}

      {production.performances?.map((performance) => (
        <PerformancesTableRow key={performance.id} performance={performance} />
      ))}
    </div>
  );
};
