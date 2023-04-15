const multer = require("multer");
const path = require("path");
const HttpError = require("../utilities/httpError");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};
const MAX_SIZE = 1 * 1024 * 1024;

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = ({ headers }, { mimetype }, cb) => {
  const fileSize = parseInt(headers["content-length"]);
  if (!MIME_TYPES[mimetype])
    return cb(HttpError(400, "File must be an image"), false);
  if (fileSize > MAX_SIZE)
    return cb(HttpError(400, "The file size must not exceed 1 MB"), false);
  cb(null, true);
};

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: MAX_SIZE },
  fileFilter: fileFilter,
});

module.exports = upload;