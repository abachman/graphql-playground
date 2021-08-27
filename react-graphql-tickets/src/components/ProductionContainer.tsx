import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  GetProduction,
  GetProductionData,
  GetProductionVariables,
} from "../queries/GetProduction";
import { QueryError } from "./QueryError";

type ProductionParams = {
  productionId: string;
  organizationId: string;
};

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
      <h2>{production.title}</h2>

      <p>Organization: {organizationId}</p>
      <p>Production: {productionId}</p>

      {production.performanceCount && (
        <h3 className="mt-8">
          <strong>{production.performanceCount} Performances</strong>
        </h3>
      )}

      {production.performances?.map((performance) => {
        return (
          <div key={performance.id}>
            {performance.name} {performance.showtimeAt}
          </div>
        );
      })}

      <Link to={`/${organizationId}`}>Back</Link>
    </div>
  );
};
