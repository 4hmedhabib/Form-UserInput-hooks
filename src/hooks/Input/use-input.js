import { useState } from 'react';

const useInput = (validateValue) => {
	const [ enteredValue, setEnteredValue ] = useState('');
	const [ isTouched, setIsTouched ] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hassError = !valueIsValid && isTouched;

	const valueChangeHandler = (e) => {
		setEnteredValue(e.target.value);
	};

	const valueBlurHandler = () => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		valueBlurHandler,
		hassError,
		valueChangeHandler,
		isValid: valueIsValid,
		reset
	};
};

export default useInput;
