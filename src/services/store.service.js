import axios from "~/tools/axios.tool";
import { getDataApi } from "../tools/lodash.toll";

const StoreService = {
  get: () => {
    return axios
      .get("/store/get")
      .then((data) => getDataApi(data, "store"))
      .catch(() => null);
  },
};
export default StoreService;
