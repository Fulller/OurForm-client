export const formatFileSize = (sizeInBytes) => {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  return (sizeInBytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
};
