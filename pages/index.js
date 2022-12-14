import Head from 'next/head';
import Image from 'next/image';
//import buildspaceLogo from '../assets/buildspace-logo.png';
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

  const placeHolderValue = "Problem:\nAge:\nEthnicity:\nGender:\nHeight:\nWeight:\nHistory:"
  
  return (
    <div className="root">
      <Head>
        <title>triage</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>triage.ai</h1>
          </div>
          <div className="header-subtitle">
            <h2>Enter your information below. Use AI to plan the response to your medical issue. </h2>
            <h3>*Disclaimer: Please see a healthcare provider. This tool is meant to be for informational purposes only.*</h3>
          </div>
        </div>

	  <div className="prompt-container">
	    <textarea 
        placeholder={placeHolderValue}
        className="prompt-box"
        value={userInput}
        onChange={onUserChangedText}
        rows="10"
        cols="50"
        readOnly={false}
      />

      <div className="placeholder-text" style={{position:"relative"}}>{placeHolderValue</div>

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
      <p>{apiOutput}</p>
    </div>
  </div>
  )}

      </div>



      </div>
      
    </div>
  );
};

export default Home;