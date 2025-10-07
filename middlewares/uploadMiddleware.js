import multer from "multer";
import path from "path";
import fs from "fs";

// Storage config generator
const storage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join("public", folder);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext);
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
  });

  

/**
 * uploadFiles
 * @param {string} folder - folder inside public (e.g. "adminAssets/uploads")
 * @param {string} type - 'single' | 'multiple' | 'fields'
 * @param {string} fieldName - field name in form (default: "file")
 * @param {number} maxCount - for multiple files max count (default: 1)
 * @param {Array} fields - for multiple different field names [{ name: "thumbnail", maxCount: 1 }, { name: "images", maxCount: 4 }]
 */


export const uploadFiles = (
  folder,
  type = "single",
  fieldName = "file",
  maxCount = 1,
  fields = []
) => {
  const multerStorage = storage(folder);
  const upload = multer({ storage: multerStorage });

  switch (type) {
    case "single":
      return upload.single(fieldName); // req.file
    case "multiple":
      return upload.array(fieldName, maxCount); // req.files
    case "fields":
      return upload.fields(fields); // req.files.<fieldName>
    default:
      throw new Error(
        "Invalid upload type: choose 'single', 'multiple' or 'fields'"
      );
  }
};
