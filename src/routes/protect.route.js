import PrimaryLayout from "../layouts/PrimaryLayout";
import EditLayout from "../layouts/EditLayout";
import Home from "../pages/Home";
import Edit from "../pages/Edit";

const protectRoutes = [
  {
    Layout: PrimaryLayout,
    Page: Home,
    path: "/",
    title: "Our Form",
  },
  {
    Layout: PrimaryLayout,
    Page: Home,
    path: "/home",
    title: "Our Form",
  },
  {
    Layout: EditLayout,
    Page: Edit,
    path: "/edit/:id",
    title: "Edit",
  },
];

export default protectRoutes;
