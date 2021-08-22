import { useInput } from '../hooks';

const SimpleInput = (props) => {
	const {
		value: enteredName,
		isValid: nameInputIsValid,
		hasError: nameInputHasError,
		reset: resetNameHandler,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameInputBlurHandler
	} = useInput((value) => value.trim() !== '');

	const {
		value: enteredEmail,
		isValid: emailInputIsValid,
		hasError: emailInputHasError,
		reset: resetEmailHandler,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailInputBlurHandler
	} = useInput((value) => value.includes('@'));

	let formIsValid = false;

	if (nameInputIsValid && emailInputIsValid) {
		formIsValid = true;
	}

	const submitHandler = (e) => {
		e.preventDefault();

		if (!nameInputIsValid && emailInputIsValid) {
			return;
		}

		resetNameHandler();
		resetEmailHandler();
	};

	const inputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
	const emailClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

	return (
		<form onSubmit={submitHandler}>
			<div className={inputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					value={enteredName}
					onBlur={nameInputBlurHandler}
					onChange={nameChangeHandler}
				/>
				{nameInputHasError && <p className="error-text">Please Enter Your Name!</p>}
			</div>
			<div className={emailClasses}>
				<label htmlFor="email">Your email</label>
				<input
					type="email"
					id="email"
					value={enteredEmail}
					onBlur={emailInputBlurHandler}
					onChange={emailChangeHandler}
				/>
				{emailInputHasError && <p className="error-text">Please Enter Valid Number!</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
