import NoLayout from "../layouts/NoLayout";
import Auth from "../pages/Auth";

const publicRoutes = [
  {
    Layout: NoLayout,
    Page: Auth,
    path: "/auth",
    title: "Auth",
  },
];

export default publicRoutes;
