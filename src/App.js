import React from "react";
import "./styles.css";
import Header from './components/header/Header'
import RegistrationForm from './components/registrationForm/RegistrationForm'

export default class App extends React.Component {

  render(){

   return (
    <div className="App">
      <Header />
      <RegistrationForm />
    </div>
   );

  }
  
}
