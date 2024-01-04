import { BrowserRouter, Routes, Route } from "react-router-dom";
import protectRoutes from "~/routes/protect.route";
import publicRoutes from "~/routes/public.route";

const ReactRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {protectRoutes.map((protectRoute) => {
          const { Layout, Page, path, title } = protectRoute;
          return (
            <Route
              key={path}
              element={
                <Layout title={title} key={title} protect={true}>
                  <Page />
                </Layout>
              }
              path={path}
            ></Route>
          );
        })}
        {publicRoutes.map((publicRoute) => {
          const { Layout, Page, path, title } = publicRoute;
          return (
            <Route
              key={path}
              element={
                <Layout title={title} key={title}>
                  <Page />
                </Layout>
              }
              path={path}
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default ReactRouter;
