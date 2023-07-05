import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


//EmailReducer
const emailHandler = (state, action)=>{
  if(action.type === 'INPUT'){
    return {value: action.val, IsValid:action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, IsValid:state.value.includes('@')}
  }
return {value: '', IsValid:false}
}
//PasswordReducer
const passwordHandler = (state, action)=>{
  if(action.type === 'PASSWORD'){
    return {value: action.val, IsValid:action.val.trim().length > 6}
  }
  if(action.type === 'PASSWORD_BLUR'){
    return {value: state.value, IsValid:state.value.trim().length > 6}
  }
return {value: '', IsValid:false}
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail] = useReducer(emailHandler, {value: '', IsValid:null})
  const [passwordState,dispatchPassword] = useReducer(passwordHandler, {value: '', IsValid:false})


  useEffect(()=>{
    setFormIsValid(
      emailState.value.includes('@') && passwordState.value.trim().length > 6 && enteredCollege.trim().length>0
    );
  },[passwordState.value,emailState.value,enteredCollege])

  const emailChangeHandler = (event) => {
   dispatchEmail({type : 'INPUT', val: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type : 'PASSWORD', val: event.target.value})

  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);

  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchEmail({type: 'PASSWORD_BLUR'})


  };
  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.IsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.IsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          </div>

<div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="college"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
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
