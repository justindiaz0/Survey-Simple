import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Survey from "@/pages/Survey";
import Results from "@/pages/Results";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Survey} />
      <Route path="/results" component={Results} />
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
            <a href="/" className="mt-4 inline-block text-indigo-600 hover:underline">Back to survey</a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
