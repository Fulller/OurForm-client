import axios from "../tools/axios.tool";
import { getDataApi } from "../tools/lodash.toll";

const UploadService = {
  uploadImage: (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    return axios
      .post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        return getDataApi(data, "url");
      })
      .catch(() => null);
  },
  deleteImage: (url) => {
    return axios
      .post("/upload/image/delete", { image_url: url })
      .then(() => true)
      .catch(() => false);
  },
};
export default UploadService;
