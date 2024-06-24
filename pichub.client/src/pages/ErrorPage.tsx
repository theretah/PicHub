import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Layout currentPage="Error">
      <div className="container h-100 d-flex align-items-center">
        <div className="row">
          <h2 className="text-light">Something went wrong!</h2>
          <div className="w-100">
            <span className="h5 text-danger">
              {isRouteErrorResponse(error)
                ? "This page does not exist. Maybe there is a typo in the url.    "
                : "An unexpected error occurred."}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
