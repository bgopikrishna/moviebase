import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./components/extras/Loader";
import AppRoutes from "./AppRoutes";
import Layout from "./components/layout";

function App() {
  const [loading, setLoading] = useState(true);

  //Turn of the loader after component mounts
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
