import { useRouteError } from "react-router-dom";
// import MainNavigation from '../components/MainNavigation';

import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong. Try again later!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  if (error.status === 401) {
    (title = "Unauthorized🔒!"), (message = "Wrong username or password.");
  }

  return (
    <>
      <PageContent title={error.data.title} status={error.status}>
        <p>{error.data.message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
