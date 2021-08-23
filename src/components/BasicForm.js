import useInput from '../hooks/Input/use-input';

const BasicForm = (props) => {
	const isNotEmpty = (value) => value.trim() !== '';
	const isEmail = (value) => value.includes('@');

	const {
		value: firstnameValue,
		valueBlurHandler: firstnameBlur,
		hassError: firstnameIsInValid,
		valueChangeHandler: firstnameChangeHandler,
		isValid: firstnameIsValid,
		reset: firstnameReset
	} = useInput(isNotEmpty);

	const {
		value: lastnameValue,
		valueBlurHandler: lastnameBlur,
		hassError: lastnameIsInValid,
		valueChangeHandler: lastnameChangeHandler,
		isValid: lastnameIsValid,
		reset: lastnameReset
	} = useInput(isNotEmpty);

	const {
		value: emailValue,
		isValid: emailIsValid,
		hassError: emailIsInValid,
		valueBlurHandler: emailBlur,
		valueChangeHandler: emailChangeHandler,
		reset: emailReset
	} = useInput(isEmail);

	let formIsValid = false;

	if (emailIsValid && firstnameIsValid && lastnameIsValid) {
		formIsValid = true;
	}

	const submitFormHandler = (e) => {
		e.preventDefault();
		if (firstnameIsInValid && lastnameIsInValid && emailIsInValid) {
			return;
		}
		emailReset();
		firstnameReset();
		lastnameReset();
	};

	const firstnameClasses = firstnameIsInValid ? 'form-control invalid' : 'form-control';
	const lastnameClasses = lastnameIsInValid ? 'form-control invalid' : 'form-control';
	const emailClasses = emailIsInValid ? 'form-control invalid' : 'form-control';

	return (
		<form onSubmit={submitFormHandler}>
			<div className="control-group">
				<div className={firstnameClasses}>
					<label htmlFor="name">First Name</label>
					<input
						type="text"
						id="name"
						value={firstnameValue}
						onBlur={firstnameBlur}
						onChange={firstnameChangeHandler}
					/>
					{firstnameIsInValid && <p className="error-text"> Pleased enter your firstname!</p>}
				</div>
				<div className={lastnameClasses}>
					<label htmlFor="lastname">Last Name</label>
					<input
						type="text"
						id="lastname"
						value={lastnameValue}
						onBlur={lastnameBlur}
						onChange={lastnameChangeHandler}
					/>
					{lastnameIsInValid && <p className="error-text"> Pleased enter your lastname!</p>}
				</div>
			</div>
			<div className={emailClasses}>
				<label htmlFor="email">E-Mail Address</label>
				<input type="email" id="email" value={emailValue} onBlur={emailBlur} onChange={emailChangeHandler} />
				{emailIsInValid && <p className="error-text">Please enter valid email!</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
