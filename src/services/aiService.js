import OpenAI from 'openai';

// Konfiguration für OpenRouter (kompatibel mit dem OpenAI SDK)
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true, // Notwendig für direkte Frontend-Aufrufe
  defaultHeaders: {
    'HTTP-Referer': 'https://promptstudio.live', 
    'X-Title': 'Prompt Studio Live',
  }
});

/**
 * Sendet einen generierten Prompt direkt an ein KI-Modell via OpenRouter.
 * @param {string} promptText - Der generierte Text- oder Bild-Prompt.
 * @param {string} modelId - Das Zielmodell (z.B. 'anthropic/claude-3-opus' oder 'openai/gpt-4o').
 * @returns {Promise<string>} - Die Antwort der KI.
 */
export const executePromptViaAI = async (promptText, modelId = 'openai/gpt-4o') => {
  try {
    const response = await openai.chat.completions.create({
      model: modelId,
      messages: [{ role: 'user', content: promptText }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Fehler bei der Kommunikation mit OpenRouter:', error);
    throw error;
  }
};
