import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
Below, a user will enter the details about their pet animal's medical situation. 

Create a detailed list of 5 possible issues that the pet could be experiencing. 

For each option, include its likelihood as a percentage and also rank it as severe, moderate, or low risk.

At the end, recommend whether or not the pet owner should take the pet to the veterinarian and also include a few relevant questions that the user should ask their pet's veterinarian. 

Finally, leave a cute hopeful message for the pet owner about their pet that will make them smile.

Pretend that you are an experienced and skilled veterinarian. Be verbose, and write in the style of Paul Graham. List the output as a table. 

`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  console.log(`API: ${basePromptPrefix}`)
  
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 1500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
