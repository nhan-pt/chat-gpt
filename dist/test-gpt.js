"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const key = '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';
const configuration = new openai_1.Configuration({
    apiKey: key,
});
const openai = new openai_1.OpenAIApi(configuration);
async function getRespon() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Làm sao để tỏ ra tự tin mà không tự cao",
        temperature: 1,
        max_tokens: 500,
    });
    console.log(response.data.choices[0]);
}
getRespon();
//# sourceMappingURL=test-gpt.js.map