import { useQuery } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { GetCurrentUser, GetCurrentUserData } from "../queries/GetCurrentUser";
import { setToken } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { QueryError } from "./QueryError";

export const SignInButton = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const token = useAppSelector((state) => state.auth.token);

  const { client, loading, error, data } =
    useQuery<GetCurrentUserData>(GetCurrentUser);

  if (loading) return <p>loading...</p>;
  if (error) return <QueryError error={error} />;

  if (token && data?.currentUser) {
    return (
      <>
        <span className="inline-block text-gray-200 no-underline py-2 px-2">
          {data.currentUser.email}
        </span>
        <button
          className="inline-block text-blue-200 underline py-2 px-4"
          onClick={() => {
            dispatch(setToken(null));
            console.log("removed token!");
            client.clearStore();
            history.push("/");
          }}
        >
          sign out
        </button>
      </>
    );
  }

  return (
    <Link
      to="/login"
      className="inline-block text-gray-200 no-underline hover:text-blue-200 hover:text-underline py-2 px-4"
    >
      Sign In
    </Link>
  );
};
