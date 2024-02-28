# LangChain.js LLM 

## Setup
1. Provide all the information you want your LLM to be trained on in the `training` directory in markdown 
2. Install dependancies `npm install`
3. Run `npm run train` to set up your vector store, if needed
4. Modify the base prompt in `lib/basePrompt.js` if needed.
5. Change the AI Model used in `lib/generateResponse.js` to change the AI Model in `HNSWLib.load("vectorStoreKejagungMiniDemo")` if you want.
6. If you want default, then just Run `node index.js`, and start chatting.
