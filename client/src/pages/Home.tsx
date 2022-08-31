import React, { useState, useEffect, Suspense } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Posts from "../components/Posts";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import PageLoader from "../components/Loader";
import Error from "../components/Error";

const Home = () => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const user = useSelector((state: any) => state.user.user.user);

  useEffect(() => {
    setShowLoader(false);
  }, []);
  return (
    <>
      <ErrorBoundary fallback={<Error>Error Getting Data</Error>}>
        <Suspense fallback={<PageLoader />}>
          <Header />
          {!user && (
            <h1 style={{ textAlign: "center", paddingTop: "10vh" }}>
              Login to access content.
            </h1>
          )}
          {user && (
            <>
              {showLoader ? (
                <Loader />
              ) : (
                <>
                  <Banner />

                  <Posts />
                </>
              )}
            </>
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Home;
