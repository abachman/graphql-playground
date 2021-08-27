import { Route, Switch } from "react-router-dom";
import { OrganizationContainer } from "./components/OrganizationContainer";
import { OrganizationsContainer } from "./components/OrganizationsContainer";
import { ProductionContainer } from "./components/ProductionContainer";

function App() {
  return (
    <main>
      <section className="absolute w-full h-full">
        <div className="absolute top-0 w-full h-full bg-gray-900"></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4 bg-gray-50">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
