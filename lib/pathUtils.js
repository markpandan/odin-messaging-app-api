const path = require("node:path");

// Example: /tmp/Destination/Folder/ -> Destination/Folder/
function removeTmpInPath(filePath) {
  return filePath.split(path.sep).slice(2).join(path.sep);
}

function cloudinaryUrl(filename) {
  return `${process.env.CLOUDINARY_DELIVERY_URL}/${filename}`;
}

module.exports = { removeTmpInPath, cloudinaryUrl };
