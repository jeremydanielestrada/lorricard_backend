// Validation helper function
const validateDocumentContent = (document) => {
  // Remove extra whitespace and check length
  const cleanedDoc = document.trim();

  // Minimum character requirement
  if (cleanedDoc.length < 50) {
    return {
      valid: false,
      message: "Please provide at least 50 characters of meaningful content",
    };
  }

  // Maximum character limit (optional)
  if (cleanedDoc.length > 10000) {
    return {
      valid: false,
      message: "Content is too long. Please limit to 10,000 characters",
    };
  }

  // Check if it's just random characters (no spaces or very few words)
  const words = cleanedDoc.split(/\s+/).filter((word) => word.length > 2);
  if (words.length < 10) {
    return {
      valid: false,
      message: "Please provide at least 10 meaningful words",
    };
  }

  // Check for repeated characters (like "aaaaaaa" or "111111")
  const repeatedPattern = /(.)\1{10,}/;
  if (repeatedPattern.test(cleanedDoc)) {
    return {
      valid: false,
      message: "Content appears to be invalid. Please provide meaningful text",
    };
  }

  // Check for mostly numbers or special characters
  const alphaCount = (cleanedDoc.match(/[a-zA-Z]/g) || []).length;
  const alphaRatio = alphaCount / cleanedDoc.length;
  if (alphaRatio < 0.5) {
    return {
      valid: false,
      message: "Content should contain mostly text, not numbers or symbols",
    };
  }

  return { valid: true };
};

export default validateDocumentContent;
