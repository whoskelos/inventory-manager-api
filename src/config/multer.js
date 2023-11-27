import { fileURLToPath } from "url";
import { dirname, join } from "path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, "../static/images"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//todo: saber como devolver el error al front

const fileUpload = multer({
    limits: {
        fileSize: 1572864,
    },
    storage,
}).single("foto_usuario");

export default fileUpload;
