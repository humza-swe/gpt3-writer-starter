import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput ] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
      console.log(event.target.value);
      setUserInput(event.target.value);
  };

  const placeHolderValue = "Enter your pet's situation below. Be as descriptive as possible and let AI work its magic."

  return (
    <div className="root">
      <Head>
        <title>AI Veterinarian</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>AIvet</h1>
          </div>
          <div className="header-subtitle">
          <h2>Disclaimer: This tool is meant to be for informational purposes only.</h2>
          <h3>How is your pet doing? Please list any symptoms and descriptions here. Include your pet's species, breed, age, weight, and any relevant history.</h3>
          </div>
        </div>

	  <div className="prompt-container">
	    <textarea 
        placeholder={placeHolderValue}
        className="prompt-box"
        value={userInput}
        onChange={onUserChangedText}
        readOnly={false}
      />


<div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Diagnose</p>}
    </div>
  </a>
</div>

      {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p style="text-align:right">{apiOutput}</p>
    </div>
  </div>
  )}
      </div>
      </div>
      
    </div>
  );
};

export default Home;