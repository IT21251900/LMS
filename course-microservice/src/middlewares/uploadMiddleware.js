import multer from "multer";
// import {df} from "../../src/../../frontend/admin-dashboard/public/uploads"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/../../frontend/admin-dashboard/public/uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
