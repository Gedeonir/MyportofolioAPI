import express from "express"
import multer from "multer";

const router = express.Router()
router.use('/uploads', express.static('uploads'));
 
// request handlers
router.get('/upload', (req, res) => {
    res.send('Node js file upload rest apis');
});
// handle storage using multer
let storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads');
   },
   filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
   }
});
let upload = multer({ storage: storage });
// handle single file upload
router.post('/upload', upload.single('dataFile'), (req, res, next) => {
   const file = req.file;
   if (!file) {
      return res.status(400).send({ message: 'Please upload a file.' });
   }
   return res.send({ message: 'File uploaded successfully.', file });
});




export{router as default}