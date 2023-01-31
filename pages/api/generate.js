import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
Below, a user will enter the details about their pet animal's medical situation. Pretend that you are an experienced and skilled veterinarian. 

Create a detailed list of 5 possible issues that the pet could be experiencing. Include a likelihood factor as a percentage for each option. 

Rank the situation as severe, moderate, or low-risk. Also recommend whether or not the user should take their pet to the veterinarian.

At the end, also include a few relevant questions that the user should ask their pet's veterinarian. 

`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  console.log(`API: ${basePromptPrefix}`)
  
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.75,
    max_tokens: 1500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
