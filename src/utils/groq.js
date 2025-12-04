import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function parseDocumentWithGroq(document) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a flashcard generator. Parse the given text and create question-answer pairs. Return ONLY a JSON array of objects with 'question' and 'answer' fields.",
      },
      {
        role: "user",
        content: `Generate flashcards from this text:\n\n${document}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    response_format: { type: "json_object" },
  });
  return JSON.parse(completion.choices[0].message.content);
}

export default parseDocumentWithGroq;
