import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm"

function Login() {
  return (
    <>
      <Head>
        <title>해먹남녀 | STARVING</title>    
      </Head>
      <Layout>
          <LoginForm/>
      </Layout>
    </>
  );
}

export default Login;
