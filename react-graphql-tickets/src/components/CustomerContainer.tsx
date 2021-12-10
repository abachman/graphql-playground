import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GetOrganizationCustomersQuery } from "../queries/GetOrganizationCustomers";
import {
  GetOrganizationCustomers,
  GetOrganizationCustomersVariables,
} from "../queries/__generated__/GetOrganizationCustomers";
import { QueryError } from "./QueryError";

interface Props {
  organizationId: string;
}

export const CustomerContainer = ({ organizationId }: Props) => {
  const variables: GetOrganizationCustomersVariables = {
    organizationId,
  };
  const [page, setPage] = useState(1);
  const { loading, error, data, fetchMore } =
    useQuery<GetOrganizationCustomers>(GetOrganizationCustomersQuery, {
      variables,
    });

  if (loading) return <p>loading...</p>;
  if (error) return <QueryError error={error} />;

  if (data && data.organization) {
    console.log(data?.organization.customers.edges);
    console.log(data?.organization.customers.pageInfo.endCursor);
    return (
      <div>
        <h4>Customers</h4>

        {data.organization.customers.edges && (
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 pl-0 text-left">ID</th>
                <th className="p-4 pl-0 text-left">Name</th>
                <th className="p-4 pl-0 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.organization.customers.edges?.map((edge) => {
                if (edge?.node) {
                  const customer = edge.node;
                  return (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>&lt;{customer.email}&gt;</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        )}

        <p className="mt-8 mb-8">
          loaded {data.organization.customers.edges?.length} of {}
        </p>

        {data.organization.customers.pageInfo.hasNextPage && (
          <button
            className="btn"
            onClick={() => {
              console.log("more", {
                organizationId,
                cursor: data.organization.customers.pageInfo.endCursor,
              });
              fetchMore({
                query: GetOrganizationCustomersQuery,
                variables: {
                  organizationId,
                  cursor: data.organization.customers.pageInfo.endCursor,
                },
              });
              setPage(page + 1);
            }}
          >
            Load More
          </button>
        )}
      </div>
    );
  }

  return <p>no customers :(</p>;
};
