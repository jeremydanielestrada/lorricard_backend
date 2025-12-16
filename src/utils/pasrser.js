import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const parseFile = async (file) => {
  const fileExtension = file.originalname.split(".").pop().toLowerCase();

  try {
    if (fileExtension === "pdf") {
      const data = await pdfParse(file.buffer);
      return data.text;
    } else if (fileExtension === "docx" || fileExtension === "doc") {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      return result.value;
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    console.error("Parse error:", error);
    throw new Error(`Error parsing file: ${error.message}`);
  }
};
