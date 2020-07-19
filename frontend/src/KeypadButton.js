import React from 'react';

export default function KeypadButton(props) {
    function handleClick() {
        props.handleKeypadClick(props.digit);
    }
    return <div onClick={handleClick} className="column keypad-button">
        <div>
            {props.digit}
        </div>
        <div>
            {props.text}
        </div>
    </div>
}