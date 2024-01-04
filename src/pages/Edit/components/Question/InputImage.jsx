import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import editFormSlide from "~/redux/slides/edit_form.slide";
import QuestionService from "~/services/question.service";
import UploadService from "~/services/upload.service";
import Image from "../Image";

const InputImage = ({ question }) => {
  const dispatch = useDispatch();
  const { _id, image } = question;
  const [previewImage, setPreviewImage] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 576 });

  async function handleImageChange(value) {
    dispatch(
      editFormSlide.actions.updateQuestion({
        _id,
        key: "image",
        value,
      })
    );
    await QuestionService.update(_id, {
      key: "image",
      value: value,
    });
  }
  async function handleUploadImage(imageFile) {
    const newUrl = await UploadService.uploadImage(imageFile);
    if (newUrl) {
      handleImageChange(newUrl);
      if (image) {
        await UploadService.deleteImage(image);
      }
    }
    setPreviewImage(null);
  }
  async function handleDeleteImage() {
    handleImageChange(null);
    if (image) {
      await UploadService.deleteImage(image);
    }
  }
  const onDrop = async (files) => {
    const imageFile = files[0];
    setPreviewImage(URL.createObjectURL(imageFile));
    handleUploadImage(imageFile);
  };
  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
  });
  if (previewImage || image) {
    return (
      <div className="question-header-wrap-image">
        <Image
          src={previewImage || image}
          className="question-header-image"
        ></Image>
        <span
          onClick={handleDeleteImage}
          className="material-symbols-outlined delete"
        >
          delete
        </span>
      </div>
    );
  }
  return (
    <label
      {...(!isMobile && getRootProps())}
      className={
        "question-header-input-image " + (isDragActive && "drap-active")
      }
    >
      {isMobile && (
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => onDrop(e.target.files)}
        />
      )}
      {isDragActive ? (
        <p>Drop the image file here...</p>
      ) : (
        <p>
          <span className="material-symbols-outlined">add</span>
          Upload image
        </p>
      )}
    </label>
  );
};

export default InputImage;
