const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
// const path = require("path");
const HttpError = require("../utilities/httpError");

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};
const MAX_SIZE = 1 * 1024 * 1024;

// const tempDir = path.join(__dirname, "../", "tmp");

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const fileFilter = ({ headers }, { mimetype }, cb) => {
  const fileSize = parseInt(headers["content-length"]);
  if (!MIME_TYPES[mimetype])
    return cb(HttpError(400, "File must be an image"), false);
  if (fileSize > MAX_SIZE)
    return cb(HttpError(400, "The file size must not exceed 1 MB"), false);
  cb(null, true);
};

const avatarsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    allowedFormats: ["jpg", "png", "webp"],
    transformation: [{ width: 182, crop: "scale" }, { fetch_format: "auto" }],
  },
  // filename: (req, file, cb) => {
  // 	console.log("Setting filename to:", file.originalname, file);
  // 	cb(null, file.originalname);
  // },
});

const petsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pets",
    allowedFormats: ["jpg", "png", "webp"],
    transformation: [{ width: 600, crop: "scale" }, { fetch_format: "auto" }],
  },
  // filename: (req, file, cb) => {
  // 	console.log("Setting filename to:", file.originalname, file);
  // 	cb(null, file.originalname);
  // },
});

const avatars = multer({
  storage: avatarsStorage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: fileFilter,
});

const pets = multer({
  storage: petsStorage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: fileFilter,
});

const uploads = {
  avatars,
  pets,
};

module.exports = uploads;
