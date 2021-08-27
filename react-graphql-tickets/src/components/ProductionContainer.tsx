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

  return (
    <div>
      <h2>{data?.title}</h2>

      <p>Organization: {organizationId}</p>
      <p>Production: {productionId}</p>

      <h3 className="mt-8">
        <strong>Count: {data?.performanceCount}</strong> Performances
      </h3>

      {data?.performances?.map((performance) => {
        return <div key={performance.id}>{performance.showtimeAt}</div>;
      })}

      <Link to={`/${organizationId}`}>Back</Link>
    </div>
  );
};
