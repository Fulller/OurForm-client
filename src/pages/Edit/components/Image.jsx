function Image({ src, alt = "image", className = "" }) {
  if (!src) {
    return <></>;
  }
  return <img src={src} alt={alt} className={className} />;
}
export default Image;
