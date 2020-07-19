import React, { useState, useEffect } from 'react';
import './App.css';
import KeypadButton from './KeypadButton';

function App() {
  const [response, setResponse] = useState('');
  const [dial, setDial] = useState('');

  useEffect(() => {
    document.addEventListener('keypress', handleKeypress.bind(this), false);
  }, [])

  function handleKeypadClick(digit) {
    if (digit === '#') {
      digit = ' ';
    }
    setDial(prev => {
      return prev + digit
    })
  }

  function handleSendClick() {
    if (!dial) {
      return;
    }
    setDial('');
    const dialledString = dial.trim();
    if (/0\s\d{1,}/.test(dialledString)) {
      // if Crime Zero format matched then make request to backend
      fetch(`http://localhost:3000/?code=${dialledString.split(' ')[1]}`)
        .then(res => res.json())
        .then(res => {
          setResponse(res.message);
        });
    }
    setResponse(`Calling ${dial}`);
  }

  function handleKeypress(event) {
    const key = event.key || '';
    if (isNaN(key)) {
      if (key === '*') {
        handleSendClick()
      } else if (key === '#') {
        handleKeypadClick(key)
      }      
    } else if (parseInt(key, 10) >= 0 && parseInt(key, 10) <= 9) {
      handleKeypadClick(key);
    }
  }

  return (
    <div className="App">
      <main>
        <div className="column">
          <div className="row screen">
            <p>
              {response}<br />
              {dial}<span className="cursor">_</span>
            </p>              
          </div>
          <div className="row">
            <KeypadButton digit="1" text="@.?" handleKeypadClick={handleKeypadClick} />
            <KeypadButton digit="2" text="ABC" handleKeypadClick={handleKeypadClick} />
            <KeypadButton digit="3" text="DEF" handleKeypadClick={handleKeypadClick} />
          </div>
          <div className="row">
            <KeypadButton digit="4" text="GHI" handleKeypadClick={handleKeypadClick} />
            <KeypadButton digit="5" text="JKL" handleKeypadClick={handleKeypadClick} />
            <KeypadButton digit="6" text="MNO" handleKeypadClick={handleKeypadClick} />
          </div>
          <div className="row">
            <KeypadButton digit="7" text="PQRS" handleKeypadClick={handleKeypadClick} />
            <KeypadButton digit="8" text="TUV" handleKeypadClick={handleKeypadClick} />
            <KeypadButton digit="9" text="WXYZ" handleKeypadClick={handleKeypadClick} />
          </div>
          <div className="row">
            <KeypadButton digit="*" text="send" handleKeypadClick={handleSendClick}/>
            <KeypadButton digit="0" text="Zero" handleKeypadClick={handleKeypadClick} />
            <KeypadButton digit="#" text="space" handleKeypadClick={handleKeypadClick}/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
