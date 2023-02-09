import {Configuration, OpenAIApi} from 'openai'

const key = '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'
const configuration = new Configuration({
  apiKey: key,
});
const openai = new OpenAIApi(configuration);


async function getRespon(){
const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Làm sao để tỏ ra tự tin mà không tự cao",
    temperature: 1,
    max_tokens: 500,
  });

  console.log(response.data.choices[0]);
  
}
getRespon()