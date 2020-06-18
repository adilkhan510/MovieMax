import { useState } from 'react';

// Similar pattern to useState
// It takes in a initial value paramater, and returns an array of 2 items

// take in the intial value. 
export default (initialVal) => {
    // call useState and set the initial Val as its parameter.
    const [ val, setVal ] = useState(initialVal);
    const handleChange = (event) => {
        setVal(event.target.value)
    };
    const resetInput = () => {
        setVal('');
    }

    return [val, handleChange, resetInput];
}

