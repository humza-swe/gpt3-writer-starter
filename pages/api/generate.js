import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
Given the following variables below (problem, age, ethnicity, gender, height, weight, and history), create a detailed list 5 options of what the issue could be.  Use simple language at the 10th grade reading level. Include a likelihood with each possibility as a percentage. Be detailed. The audience for this is the patient. 

Comment on the urgency of the issue and recommended next steps. 

Also list a few questions that the patient can ask their healthcare provider.

Problem:
Age:
Ethnicity:
Gender:
Height:
Weight:
History:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  console.log(`API: ${basePromptPrefix}`)
  
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.75,
    max_tokens: 1100,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
