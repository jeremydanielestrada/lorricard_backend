import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function parseDocumentWithGroq(document) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an expert flashcard generator for studying and learning. Your task is to create comprehensive, diverse flashcards from the given content. Follow these guidelines:\n\n" +
          "1. Generate AT LEAST 15-25 flashcards (or more if content allows)\n" +
          "2. Create VARIED question types:\n" +
          "   - Direct questions: 'What is X?', 'Who created Y?', 'When did Z happen?'\n" +
          "   - Definition-based: Provide a definition and expect a key term as answer (e.g., 'A process of converting input into fixed-length string using algorithms' → 'hashing')\n" +
          "   - Fill-in-the-blank: 'The capital of France is ____' → 'Paris'\n" +
          "   - Conceptual questions: 'Explain the purpose of...', 'How does X work?'\n" +
          "   - True/False statements converted to questions\n" +
          "3. For KEY TERMS and VOCABULARY:\n" +
          "   - Create questions asking for the term when given the definition\n" +
          "   - Create questions asking for the definition when given the term\n" +
          "4. Keep answers concise but complete (single words for terms, short phrases for concepts)\n" +
          "5. Cover ALL important concepts, facts, definitions, and details from the text\n" +
          "6. Return ONLY a JSON object with a 'flashcards' array containing objects with 'question' and 'answer' fields.\n\n" +
          "Example format:\n" +
          "{\n" +
          '  "flashcards": [\n' +
          '    {"question": "What is the color of the apple?", "answer": "red"},\n' +
          '    {"question": "A process of converting any input into a fixed-length string using a mathematical algorithm", "answer": "hashing"},\n' +
          '    {"question": "What does the term \'photosynthesis\' mean?", "answer": "The process by which plants convert light into energy"}\n' +
          "  ]\n" +
          "}",
      },
      {
        role: "user",
        content: `Generate comprehensive flashcards from this text. Create at least 15-25 flashcards with diverse question types, including keyword-based questions and definition-to-term flashcards:\n\n${document}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.8,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });
  const parsed = JSON.parse(completion.choices[0].message.content);
  return parsed.flashcards || []; // Extract the array
}

export default parseDocumentWithGroq;
