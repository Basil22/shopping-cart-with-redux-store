import { Navigate, RouteObject } from "react-router-dom";
import Items from "../components/Items";
import Cart from "../components/Cart";

const mainRoutes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/items" />,
      },
      {
        path: "items",
        element: <Items />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default mainRoutes;
