import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { QueryError } from "./QueryError";

const ORGANIZATION = gql`
  query GetOrganization($organizationId: ID!) {
    organization(id: $organizationId) {
      id
      name
      productions {
        id
        title
      }
    }
  }
`;

export const OrganizationContainer = () => {
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem(AUTH_TOKEN);

  const { loading, error, data } = useQuery(ORGANIZATION, {
    variables: { organizationId: id },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <QueryError error={error} />;

  return (
    <div>
      <header>
        <h1>{data.organization.name} Productions</h1>
        <Link to="/">See all organizations</Link>
      </header>

      {data.organization.productions.map((production: any) => {
        return (
          <div className="mb-4" key={production.id}>
            <Link to={`/${id}/${production.id}`}>{production.title}</Link>
          </div>
        );
      })}

      {token && <button>Add Organization</button>}
    </div>
  );
};
