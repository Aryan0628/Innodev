import express from "express";
import upload from "../middleware/upload.js";
<<<<<<< HEAD
import { uploadPdf } from "../controllers/pdfController.js";
=======
import { uploadPdf } from "../../controllers/pdfController.js";
>>>>>>> f38132ecf0585d90f5de3abe3298b3264705f07d

const router = express.Router();

router.post("/upload-pdf", upload.single("pdf"), uploadPdf);

export default router;
