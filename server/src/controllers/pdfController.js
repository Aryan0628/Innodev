import { extractText } from "../utils/extract_text.js";

export const uploadPdf = async (req, res) => {
  try {
    console.log("Upload PDF request received");
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const text = await extractText(req.file);

    res.json({
      success: true,
      textLength: text.length,
      textPreview: text.slice(0, 1000),
    });
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
