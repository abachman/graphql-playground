import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  GetProduction,
  GetProductionData,
  GetProductionVariables,
} from "../queries/GetProduction";
import { shortDate } from "../utils/dates";
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
      <header>
        <h2>{production.title}</h2>
        <Link to={`/${organizationId}`}>See all productions</Link>
      </header>

      {production.performanceCount && (
        <h3 className="mt-8 mb-4">
          <strong>{production.performanceCount} Performances</strong>
        </h3>
      )}

      {production.performances?.map((performance) => {
        return (
          <div
            className="grid gap-4 grid-cols-2 w-1/3 mb-4"
            key={performance.id}
          >
            <span>{shortDate(performance.showtimeAt)}</span>
            <button className="btn">Start Order</button>
          </div>
        );
      })}
    </div>
  );
};
