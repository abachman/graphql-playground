import { Route, Switch } from "react-router-dom";
import { OrganizationContainer } from "./components/OrganizationContainer";
import { OrganizationsContainer } from "./components/OrganizationsContainer";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/:id">
          <OrganizationContainer />
        </Route>

        <Route path="/">
          <OrganizationsContainer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
