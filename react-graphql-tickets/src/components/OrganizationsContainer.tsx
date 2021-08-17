import React from "react";
import { gql, useQuery } from "@apollo/client";
import { QueryError } from "./QueryError";
import { Link } from "react-router-dom";

const ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      id
      name
    }
  }
`;

export const OrganizationsContainer = () => {
  const { loading, error, data } = useQuery(ORGANIZATIONS);

  if (loading) return <p>LOADING</p>;
  if (error) return <QueryError error={error} />;

  return (
    <div>
      <h2>Tickets!</h2>

      <ul>
        {data.organizations.map((organization: any) => {
          return (
            <li key={organization.id}>
              <Link to={`/${organization.id}`}>{organization.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
