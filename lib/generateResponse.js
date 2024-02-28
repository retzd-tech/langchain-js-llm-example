import { OpenAI } from 'langchain/llms';
import { LLMChain, PromptTemplate } from 'langchain';
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from 'langchain/embeddings';
import promptTemplate from './basePrompt.js'

// Load the Vector Store from the `vectorStore` directory
const store = await HNSWLib.load("vectorStoreKejagungMiniDemo", new OpenAIEmbeddings({
  openAIApiKey: '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'
}));
console.clear();

// OpenAI Configuration
const model = new OpenAI({ 
  temperature: 0,
  openAIApiKey: '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',
  modelName: 'gpt-3.5-turbo-instruct'
});

// Parse and initialize the Prompt
const prompt = new PromptTemplate({
  template: promptTemplate,
  inputVariables: ["history", "context", "prompt"]
});

// Create the LLM Chain
const llmChain = new LLMChain({
  llm: model,
  prompt
});

/** 
 * Generates a Response based on history and a prompt.
 * @param {string} history - 
 * @param {string} prompt - Th
 */
const generateResponse = async ({
  history,
  prompt
}) => {
  // Search for related context/documents in the vectorStore directory
  const data = await store.similaritySearch(prompt, 1);
  const context = [];
  data.forEach((item, i) => {
    context.push(`Context:\n${item.pageContent}`)
  });
  let result = await llmChain.predict({
    prompt,
    context: context.join('\n\n'),
    history: []
  });

  if (result.includes('Maaf saya tidak tahu.')) return 'Ijin Menjawab, Maaf saya tidak tahu.'

  return result;
}

export default generateResponse;