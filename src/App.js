import { BrowserRouter, Switch, Route } from "react-router-dom";
import Driver from "./pages/DriverForm.jsx";
import Order from "./pages/Order.jsx";
import { ToastContainer } from 'react-toastify';
function App() {

  const routes = [
    {
      path: "/",
      component: Order
    },
    {
      path: "/driver",
      component: Driver
    }
  ]

  return (
    <BrowserRouter>
      <Switch>
        {
          routes.map(route => <Route key={route.path} path={route.path} component={route.component} exact/>)
        }
      </Switch>
      <ToastContainer         
        autoClose = {3000}
        theme = "colored"
      />
    </BrowserRouter>
  );
}

export default App;
