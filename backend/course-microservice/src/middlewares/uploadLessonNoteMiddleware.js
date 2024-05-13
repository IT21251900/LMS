import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/lesson_note_files/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/vnd.ms-powerpoint" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs and PowerPoint files are allowed!"), false);
  }
};

const lesson_notes = multer({ storage: storage, fileFilter: fileFilter });

export default lesson_notes;
