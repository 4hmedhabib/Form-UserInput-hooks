import { useReducer } from 'react';

const inputStateReducer = (state, action) => {
	if (action.type === 'INPUTCHANGEHANDLER') {
		return { value: action.value, isTouched: state.isTouched };
	}
	if (action.type === 'BLURHANDLER') {
		return { value: state.value, isTouched: action.isTouched };
	}
	if (action.type === 'RESET') {
		return initialInputState;
	}
	return initialInputState;
};

const initialInputState = {
	value: '',
	isTouched: false
};

const useInput = (validateValue) => {
	const [ inputState, dispatch ] = useReducer(inputStateReducer, initialInputState);

	const valueChangeHandler = (e) => {
		dispatch({ type: 'INPUTCHANGEHANDLER', value: e.target.value });
	};

	const valueBlurHandler = () => {
		dispatch({ type: 'BLURHANDLER', isTouched: true });
	};

	const reset = () => {
		dispatch({ type: 'RESET' });
	};

	const valueIsValid = validateValue(inputState.value);
	const hassError = !valueIsValid && inputState.isTouched;

	return {
		value: inputState.value,
		valueBlurHandler,
		hassError,
		valueChangeHandler,
		isValid: valueIsValid,
		reset
	};
};

export default useInput;
