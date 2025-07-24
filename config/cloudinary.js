const cloudinary = require("cloudinary").v2;
const path = require("node:path");
const { removeTmpInPath } = require("../lib/pathUtils");

async function uploadToCloud(filePath, destination) {
  destination = removeTmpInPath(destination);
  const filename = path.parse(filePath).name;

  const databaseFolder = process.env.CLOUDINARY_DATABASE_FOLDER;
  await cloudinary.uploader
    .upload(filePath, {
      public_id: filename,
      asset_folder: databaseFolder + "/" + destination,
    })
    .then((result) => {
      console.log("Success", JSON.stringify(result, null, 2));
    });
}

module.exports = { uploadToCloud };
