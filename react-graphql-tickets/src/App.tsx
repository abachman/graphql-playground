import { Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { OrganizationContainer } from "./components/OrganizationContainer";
import { OrganizationsContainer } from "./components/OrganizationsContainer";
import { ProductionContainer } from "./components/ProductionContainer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/:organizationId/:productionId">
            <ProductionContainer />
          </Route>

          <Route path="/:id">
            <OrganizationContainer />
          </Route>

          <Route path="/">
            <OrganizationsContainer />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
