import React, { useEffect, useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && enteredCollege.trim().length > 0);
    }, 500);

    return () => { 
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, enteredCollege]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'INPUT', val: event.target.value });
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value, enteredCollege);
    } else {
      // Handle invalid form submission
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Login type = 'email'
        label ='E-mail'
        id = 'email'
        isValid = {emailIsValid}
        value = {emailState.value}
        onChange = {emailChangeHandler}
        onBlur = {validateEmailHandler}
        ></Login>
         <Login type = 'password'
        label ='Password'
        id = 'password'
        isValid = {passwordIsValid}
        value = {passwordState.value}
        onChange = {passwordChangeHandler}
        onBlur = {validatePasswordHandler}
        ></Login>
        <Login type = 'college'
        label ='College'
        id = 'college'
        isValid = {collegeIsValid}
        value = {enteredCollege}
        onChange = {collegeChangeHandler}
        onBlur = {validateCollegeHandler}
        ></Login>

      <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
          </div>
      </form>
    </Card>
  );
};

export default Login;
