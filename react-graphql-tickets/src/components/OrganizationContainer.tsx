import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { GetOrganizationQuery } from "../queries/GetOrganization";
import { QueryError } from "./QueryError";
import { GetOrganization } from "./__generated__/GetOrganization";

export interface OrganizationParams {
  id: string;
}

export const OrganizationContainer = () => {
  const { id } = useParams<OrganizationParams>();
  const token = localStorage.getItem(AUTH_TOKEN);

  const { loading, error, data } = useQuery<GetOrganization>(
    GetOrganizationQuery,
    {
      variables: { organizationId: id },
    }
  );

  if (loading) return <p>loading...</p>;
  if (error) return <QueryError error={error} />;

  if (data && data.organization) {
    return (
      <div>
        <header>
          <h1>{data.organization.name} Productions</h1>
          <Link to="/">See all organizations</Link>
        </header>

        {data.organization.productions?.map((production: any) => {
          return (
            <div className="mb-4" key={production.id}>
              <Link to={`/${id}/${production.id}`}>{production.title}</Link>
            </div>
          );
        })}

        {token && <button>Add Organization</button>}
      </div>
    );
  }

  return <p>Organization not found :(</p>;
};
