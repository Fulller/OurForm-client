import ReactRouter from "../Router";
import { ConfigProvider } from "antd";
import "./variables.css";
import "./Global.scss";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#438c7d",
        },
      }}
    >
      <ReactRouter></ReactRouter>
    </ConfigProvider>
  );
};

export default App;
