import { Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { SignInContainer } from "./components/SignInContainer";
import { OrganizationContainer } from "./components/OrganizationContainer";
import { OrganizationsContainer } from "./components/OrganizationsContainer";
import { ProductionContainer } from "./components/ProductionContainer";
import { PerformanceOrderForm } from "./components/PerformanceOrderForm";
import { CheckoutContainer } from "./components/CheckoutContainer";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={SignInContainer} />
        <Route exact path="/checkout">
          <Header />
          <main>
            <CheckoutContainer />
          </main>
        </Route>

        <Route path="/:organizationId/:productionId/:performanceId">
          <Header />
          <main>
            <PerformanceOrderForm />
          </main>
        </Route>

        <Route path="/:organizationId/:productionId">
          <Header />
          <main>
            <ProductionContainer />
          </main>
        </Route>

        <Route path="/:id">
          <Header />
          <main>
            <OrganizationContainer />
          </main>
        </Route>

        <Route path="/">
          <Header />
          <main>
            <OrganizationsContainer />
          </main>
        </Route>
      </Switch>
    </>
  );
}

export default App;
