import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  TicketTypeQuantityInput,
  UpdateOrderInput,
} from "../../__generated__/globalTypes";
import { UpdateOrderMutation } from "../mutations/UpdateOrderMutation";
import { UpdateOrderVariables } from "../mutations/__generated__/UpdateOrder";
import { GetPerformanceOrderFormQuery } from "../queries/GetPerformanceOrderForm";
import { GetPerformanceOrderForm } from "../queries/__generated__/GetPerformanceOrderForm";
import { shortDate } from "../utils/dates";
import { centsToDollars } from "../utils/money";
import { Paths } from "../utils/paths";
import { ProductionParams } from "./ProductionContainer";
import { QueryError } from "./QueryError";
import { Button } from "./widgets/Button";

export interface PerformanceOrderParams extends ProductionParams {
  performanceId: string;
}

export const PerformanceOrderForm = () => {
  const { performanceId } = useParams<PerformanceOrderParams>();
  const [orderForm, setOrderForm] = useState<
    Record<string, TicketTypeQuantityInput>
  >({});
  const { loading, error, data } = useQuery<GetPerformanceOrderForm>(
    GetPerformanceOrderFormQuery,
    {
      variables: { id: performanceId },
      onCompleted: (result) => {
        // accumulate tickets on the draft receipt belonging to this performance
        // so we can preload the form with the proper values
        setOrderForm(() => {
          const nextForm: Record<string, TicketTypeQuantityInput> = {};

          result.performanceOrderForm?.receipt.tickets.forEach((ticket) => {
            if (nextForm[ticket.ticketType.id]) {
              nextForm[ticket.ticketType.id].quantity += 1;
            } else {
              nextForm[ticket.ticketType.id] = {
                ticketTypeId: ticket.ticketType.id,
                quantity: 1,
              };
            }
          });

          return nextForm;
        });
      },
    }
  );

  const [updateOrder] = useMutation<UpdateOrderInput, UpdateOrderVariables>(
    UpdateOrderMutation
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <QueryError error={error} />;
  if (!data) return <p>NO DATA</p>;

  const { performanceOrderForm } = data;

  if (!performanceOrderForm) return <p>Not an actual performance!</p>;

  const { receipt, production, performance, ticketTypes } =
    performanceOrderForm;

  return (
    <div>
      <header>
        <h2>{production.title}</h2>
        <h3>{shortDate(performance.showtimeAt)}</h3>
      </header>

      <p>Select your tickets:</p>
      {ticketTypes.map((ticketType) => (
        <div
          key={ticketType.id}
          className="w-1/3 flex space-x-4 align-middle mb-4"
        >
          <span className="flex-grow">{ticketType.name}</span>
          <span className="self-end flex-grow-0">
            ${centsToDollars(ticketType.priceInCents)}
          </span>
          <input
            type="number"
            min="0"
            value={orderForm[ticketType.id]?.quantity || 0}
            name={`ticket_type_${ticketType.id}_quantity`}
            className="border border-gray-300 rounded w-12"
            onChange={(evt) => {
              const val = evt.currentTarget.value;
              setOrderForm((prev) => ({
                ...prev,
                [ticketType.id]: {
                  quantity: parseInt(val, 10),
                  ticketTypeId: ticketType.id,
                },
              }));
            }}
          />
        </div>
      ))}

      <Button
        type="submit"
        onClick={() => {
          console.log("update with", orderForm);
          updateOrder({
            variables: {
              receiptId: receipt.id,
              update: {
                performanceId: performance.id,
                ticketTypeQuantities: Object.values(orderForm),
              },
            },
          });
        }}
      >
        Update
      </Button>
      <Link to={Paths.checkout()}>Checkout</Link>
    </div>
  );
};
