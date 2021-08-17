import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
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

  const { loading, error, data } = useQuery(ORGANIZATION, {
    variables: { organizationId: id },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <QueryError error={error} />;

  console.log("data with stuff", data);

  return (
    <div>
      <h1>{data.organization.name} Productions</h1>

      <ul>
        {data.organization.productions.map((production: any) => {
          return <li key={production.id}>{production.title}</li>;
        })}
      </ul>

      <Link to="/">Back</Link>
    </div>
  );
};
