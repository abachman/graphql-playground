import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GetPerformanceOrderFormQuery } from "../queries/GetPerformanceOrderForm";
import { GetPerformanceOrderForm } from "../queries/__generated__/GetPerformanceOrderForm";
import { shortDate } from "../utils/dates";
import { ProductionParams } from "./ProductionContainer";
import { QueryError } from "./QueryError";

export interface PerformanceOrderParams extends ProductionParams {
  performanceId: string;
}

export const PerformanceOrderForm = () => {
  const { performanceId } = useParams<PerformanceOrderParams>();

  const { loading, error, data } = useQuery<GetPerformanceOrderForm>(
    GetPerformanceOrderFormQuery,
    {
      variables: { id: performanceId },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <QueryError error={error} />;

  if (!data) return <p>NO DATA</p>;

  const { performanceOrderForm } = data;

  if (!performanceOrderForm) return <p>Not an actual performance!</p>;

  const { production, performance, ticketTypes } = performanceOrderForm;

  return (
    <div>
      <header>
        <h2>{production.title}</h2>
        <h3>{shortDate(performance.showtimeAt)}</h3>
      </header>

      {ticketTypes.map((ticketType) => (
        <div key={ticketType.id}>
          <span className="">{ticketType.name}</span>
          <span className="">
            {(ticketType.priceInCents / 100.0).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};
