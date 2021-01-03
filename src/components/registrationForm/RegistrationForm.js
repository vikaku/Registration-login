import React,{useState} from "react";
import axios from 'axios';

const RegistrationForm = (props) => {
  const [state ,setState] = useState({
      email:'',
      password:'',
      confirmPassword:'',
      successMsg:null
  }) 

  const handleChange = (e) =>{
    const {id,value} = e.target;
    setState(prevState =>({
      ...prevState,
      [id]:value
    }))
    console.log(state);

  }

  const sendDetailToServer = () => {
    if(state.email.length && state.password.length){
      props.showError(null);
      const payload = {
        email:state.email,
        password:state.password
      }
    axios.post('url',payload)
      .then(response = () =>{
        if(response.status === 200){
          setState(prevState  => ({
            ...prevState,
            'successMsg':'Registration Successful.Redirecting to home page.'
          }))
        }else{
      props.showError('Some error occured..')
    }

      })
    .catch( error = () =>{
      console.log(error);
    })
      
    }else{
      props.showError('Please enter valid username and password.')
    }
    
    }
  

  const handleSubmit =(e) => {
    e.preventDefault();
    if(state.password === state.confirmPassword){
      sendDetailToServer()
    }
    else{
        props.showError('Password do not match.')
    }
    
  }
  return(
    <div className = "card col-12 col-lg-12 login-card mt-2 hv-center">
        <form>
          <div className= "form-group text-left">
            <label htmlFor="emailLabel">Email</label>
            <input type="email" 
                    className="form-control"
                    id="email"
                    placeHolder="enter email"
                    value={state.email}
                    onChange={handleChange}/>

          <small id ="emailHelp" className=" form-text text-muted"> we'll never share your email with anyone.</small>
          
          </div>
          <div className= "form-group text-left">
            <label htmlFor="passwordLabel1">Password</label>
            <input type="password" 
                    className="form-control" 
                    id="password"
                    value={state.password}
                    placeHolder="password"
                    onChange={handleChange}/>
          
          </div>
          <div className= "form-group text-left">
            <label htmlFor="passwordLabel2">Confirm Password</label>
            <input type="password" 
                    className="form-control"
                    id="confirmPassword"
                    value={state.confirmPassword}
                    placeHolder="confirm password"
                    onChange={handleChange}/>
          
          </div>

          <button type="submit" 
                  className="btn btn-primary"
                 onClick={handleSubmit}
                  >Register</button>
        </form>
        <div className = "alert alert-success mt-2 successMessage" style = {{display:state.successMsg ? 'block':'none'}} role='alert'>
          {state.successMsg}
        </div>
        <div className="mt-2">
          <span>Already have an account?</span>
          <span className="loginText" onClick = {() => redirectToLogin() }>Login Here</span>
        </div>
    
    </div>
  )
}

export default RegistrationForm;