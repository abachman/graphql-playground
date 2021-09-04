import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GetDraftReceiptQuery } from "../queries/GetDraftReceipt";
import {
  GetDraftReceipt,
  GetDraftReceipt_draftReceipt_customer,
  GetDraftReceipt_draftReceipt_tickets,
} from "../queries/__generated__/GetDraftReceipt";
import { shortDate } from "../utils/dates";
import { centsToDollars } from "../utils/money";
import { Paths } from "../utils/paths";
import { QueryError } from "./QueryError";

const customerName = (given: GetDraftReceipt_draftReceipt_customer): any => {
  if (given.name) {
    return given.name;
  } else if (given.user) {
    return given.user.name;
  }
};

const sumOfTicketPrices = (
  tickets: GetDraftReceipt_draftReceipt_tickets[]
): number => {
  return tickets.reduce((sum, ticket) => {
    return sum + ticket.ticketType.priceInCents;
  }, 0);
};

export const CheckoutContainer = () => {
  const { data, error, loading } =
    useQuery<GetDraftReceipt>(GetDraftReceiptQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <QueryError error={error} />;

  if (!data) return <p>NULL data</p>;
  if (!data.draftReceipt) return <p>NULL draftReceipt</p>;

  const receipt = data.draftReceipt;

  return (
    <>
      <header>
        <h2>Checkout</h2>
      </header>

      <hr className="my-8" />

      <p>
        For{" "}
        <strong className="font-bold">{customerName(receipt.customer)}</strong>
      </p>

      <hr className="my-6" />

      <div className="w-2/3 grid grid-cols-4 column-gap-8 gap-4">
        <span>Organization</span>
        <span>Production</span>
        <span>Performance</span>
        <span>Price</span>

        {receipt.tickets.map((ticket) => (
          <React.Fragment key={ticket.id}>
            <span>
              <Link
                to={Paths.organization({
                  id: ticket.ticketType.production.organization.id,
                })}
              >
                {ticket.ticketType.production.organization.name}
              </Link>
            </span>
            <span>
              <Link
                to={Paths.production({
                  organizationId: ticket.ticketType.production.organization.id,
                  productionId: ticket.ticketType.production.id,
                })}
              >
                {ticket.ticketType.production.title}
              </Link>
            </span>
            <span>
              <Link
                to={Paths.performance({
                  organizationId: ticket.ticketType.production.organization.id,
                  productionId: ticket.ticketType.production.id,
                  performanceId: ticket.performance.id,
                })}
              >
                {shortDate(ticket.performance.showtimeAt)}
              </Link>
            </span>
            <span>${centsToDollars(ticket.ticketType.priceInCents)}</span>
          </React.Fragment>
        ))}
      </div>

      <p className="text-lg mt-8">
        Total:{" "}
        <strong>${centsToDollars(sumOfTicketPrices(receipt.tickets))}</strong>
      </p>

      <hr className="my-8" />

      <Link to="/">Continue Shopping</Link>
    </>
  );
};
