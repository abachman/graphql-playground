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
        {data.organization.customers.edges?.map((edge) => {
          if (edge?.node) {
            return (
              <p key={edge?.node?.id}>
                {edge?.node?.name} &lt;{edge?.node?.email}&gt;
              </p>
            );
          } else {
            return null;
          }
        })}

        <p>
          page {page}: {JSON.stringify(data.organization.customers.pageInfo)}
        </p>

        {data.organization.customers.pageInfo.hasNextPage && (
          <button
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
            Next &gt;&gt;
          </button>
        )}
      </div>
    );
  }

  return <p>no customers :(</p>;
};
