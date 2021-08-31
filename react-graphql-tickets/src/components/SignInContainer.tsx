import { Link, useHistory } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import { QueryError } from "./QueryError";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { setToken } from "../store/authSlice";

interface LogInUserData {
  signInUser: {
    user: {
      name: string;
      email: string;
    };

    token: string;
  };
}

const LogInMutation = gql`
  mutation signIn($credentials: AuthProviderCredentialsInput!) {
    signInUser(credentials: $credentials) {
      user {
        name
        email
      }
      token
    }
  }
`;

export const SignInContainer = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [logIn, { client, loading, error }] = useMutation<LogInUserData>(
    LogInMutation,
    {
      variables: {
        credentials: {
          email: formState.email,
          password: formState.password,
        },
      },
      onCompleted: ({ signInUser }) => {
        dispatch(setToken(signInUser.token));
        client.clearStore();
        history.push("/");
      },
      onError: (error) => {
        console.error("[failed login]", error);
      },
    }
  );

  if (loading) return <p>loading...</p>;

  return (
    <div>
      <h1>Log In</h1>
      <Link to="/">Back</Link>
      <form
        className="flex justify-center align-middle"
        onSubmit={(evt) => {
          evt.preventDefault();
          logIn();
        }}
      >
        <div className="w-1/3">
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="email"
              name="email"
              type="text"
              value={formState.email}
              onChange={(evt) =>
                setFormState({ ...formState, email: evt.currentTarget.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              name="password"
              type="password"
              value={formState.password}
              onChange={(evt) =>
                setFormState({
                  ...formState,
                  password: evt.currentTarget.value,
                })
              }
            />
          </div>
          <button className="btn" type="submit">
            Sign In
          </button>
        </div>
      </form>

      {error && <QueryError error={error} />}
    </div>
  );
};
