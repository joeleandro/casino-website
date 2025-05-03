import { Switch, Route } from "wouter";
import NotFound from "./pages/not-found";
import HomePage from "./pages/home-page";
import AboutPage from "./pages/about-page";
import ProductsPage from "./pages/products-page";
import ProductDetailPage from "./pages/product-detail";
import ContactPage from "./pages/contact-page";
import AdminPage from "./pages/admin-page";
import { ProtectedRoute } from "./lib/protected-route";

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/sobre" component={AboutPage} />
      <Route path="/produtos" component={ProductsPage} />
      <Route path="/produtos/:id" component={ProductDetailPage} />
      <Route path="/contato" component={ContactPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
