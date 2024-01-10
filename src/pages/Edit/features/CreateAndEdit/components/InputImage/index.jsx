import UploadService from "~/services/upload.service";
import ".scss";

const InputImage = ({
  className = "",
  url,
  onChange = (value) => value,
  setLoading = (state) => state,
}) => {
  async function handleChange(e) {
    setLoading(true);
    const imageFile = e.target.files[0];
    try {
      const newUrl = await UploadService.uploadImage(imageFile);
      if (newUrl) {
        if (url) {
          await UploadService.deleteImage(url);
        }
        onChange(newUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <label className={`input-image-cpn ${className}`}>
      <input
        type="file"
        hidden
        onChange={handleChange}
        accept="image/*"
        onInput={() => setLoading(true)}
        onBeforeInput={() => setLoading(true)}
      />
      <span className="material-symbols-outlined">add_photo_alternate</span>
    </label>
  );
};

export default InputImage;
