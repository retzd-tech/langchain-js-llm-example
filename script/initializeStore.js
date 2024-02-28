import glob from 'glob';
import fs from 'fs'
import { CharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from 'langchain/embeddings';

const data = [];
const files = await new Promise((resolve, reject) => 
  glob("training/uu19-mini-demo.txt", (err, files) => err ? reject(err) : resolve(files))
);

// const files = [
//   'training/uu19-kejagung-ai-data-1.txt',
//   'training/uu19-kejagung-ai-data-2.txt',
//   'training/uu21-kejagung-ai-data-1.txt',
//   'training/uu21-kejagung-ai-data-2.txt',
//   'training/uu22-kejagung-ai-data-1.txt',
//   'training/uu22-kejagung-ai-data-1-2.txt',
// ];

for (const file of files) {
  data.push(fs.readFileSync(file, 'utf-8'));
}

console.log(`Added ${files.length} files to data.  Splitting text into chunks...`);

const textSplitter = new CharacterTextSplitter({
  chunkSize: 12720,
  separator: "\n"
});

let docs = [];
for (const d of data) {
  const docOutput = textSplitter.splitText(d);
  docs = [...docs, ...docOutput];
}

console.log(docs.length);
docs = docs.splice(docs.length - 4, 4);
console.log(docs);

console.log("Initializing Store...");

const store = await HNSWLib.fromTexts(
  docs,
  docs.map((_, i) => ({ id: i })),
  new OpenAIEmbeddings({
    openAIApiKey: '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'
  })
)

console.clear();
console.log("Saving Vectorstore");

store.save("vectorStoreKejagungMiniDemo")

console.clear();
console.log("VectorStore saved");