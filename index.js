import generateResponse from "./lib/generateResponse.js";
import promptSync from 'prompt-sync';

const prompt = promptSync();

const conversationHistory = [];

while (true) {
  const question = prompt("Anda : ");
  const answer = await generateResponse({
    prompt: question,
    history: conversationHistory
  });

  console.log(`Kejagung AI: ${answer}\n`);

  if (!answer.includes('Maaf saya tidak tahu, ada yang bisa saya bantu lagi ?')) conversationHistory.push(`Human: ${question}`)
}