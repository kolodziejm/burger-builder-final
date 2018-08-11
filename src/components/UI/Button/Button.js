import React from 'react'

import classes from './Button.css';

// ogolny button do wykorzystania gdziekolwiek na stronie
// props children to w zasadzie slot na tekst
// <Button>Jakis tekst</Button>

const button = (props) => (
    <button
    disabled={props.disabled} 
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(' ')}>{props.children}</button>
);
// w className musi byc string, .Button, .Success / .Danger

export default button;