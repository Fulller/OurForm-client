import loadingIcon from "~/images/loading/loading1.svg";

function Image({ src, alt = "image", className = "", isLoading = false }) {
  if (!src) {
    return <></>;
  }
  return (
    <img src={isLoading ? loadingIcon : src} alt={alt} className={className} />
  );
}
export default Image;
