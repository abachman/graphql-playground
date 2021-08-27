import React from "react";
import { useQuery } from "@apollo/client";
import { QueryError } from "./QueryError";
import { Link } from "react-router-dom";
import {
  GetOrganizations,
  GetOrganizationsData,
} from "../queries/GetOrganizations";

export const OrganizationsContainer = () => {
  const { loading, error, data } =
    useQuery<GetOrganizationsData>(GetOrganizations);

  if (loading) return <p>LOADING</p>;
  if (error) return <QueryError error={error} />;
  if (!data) return <p>NO DATA</p>;

  return (
    <div>
      <h2>Tickets!</h2>

      {data.organizations.map((organization) => {
        return (
          <div key={organization.id} className="mt-8">
            <Link to={`/${organization.id}`}>{organization.name}</Link>
          </div>
        );
      })}
    </div>
  );
};
