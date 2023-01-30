import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
Given the following radiation safety situation below, create a detailed list 5 options that could help guide the radiation safety officer.  Use detailed language. This information should be provided for radiation safety officers working in a medical cancer clinic.

Comment on the urgency of the issue and recommended next steps. 

Also list a few questions that the RSO can ask involved staff members.
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  console.log(`API: ${basePromptPrefix}`)
  
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.75,
    max_tokens: 1200,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
