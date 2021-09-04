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
      <header>
        <h2 className="mb-8">Organizations</h2>
      </header>

      {data.organizations.map((organization) => {
        return (
          <div key={organization.id} className="mb-8">
            <Link to={`/${organization.id}`}>{organization.name}</Link>
          </div>
        );
      })}
    </div>
  );
};
