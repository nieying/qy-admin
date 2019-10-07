import React, { Component, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "@pages/login";
import Layout from "@components/Layout";
const PrivateRoute = lazy(() => import('@routes/privateRoute'));

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Suspense fallback={<div>loading...</div>}>
          <PrivateRoute path="/" component={Layout} />
        </Suspense>
      </Switch>
    );
  }
}

export default App;
