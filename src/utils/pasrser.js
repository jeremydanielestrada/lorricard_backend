import mammoth from "mammoth";

export const parseFile = async (file) => {
  const fileExtension = file.originalname.split(".").pop().toLowerCase();

  try {
    if (fileExtension === "pdf") {
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(file.buffer);
      return data.text;
    } else if (fileExtension === "docx" || fileExtension === "doc") {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      return result.value;
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    throw new Error(`Error parsing file: ${error.message}`);
  }
};
