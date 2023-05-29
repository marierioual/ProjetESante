import { useForm } from "react-hook-form";
import { useState } from "react";
// Import font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./MainPage.css";

import axios from "axios";
import Signup from "./Signup";
import Signin from "./Signin" ;
import Header from "./Header";

const axiosInstance = axios.create({
  baseURL: "https://fake-health-data-api.shrp.dev/",
  timeout: 3000,
  headers: {},
});

function MainPage() {
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [SignUp, setSignUp] = useState(false);
  const [SignIn, setSignIn] = useState(false)
  const [user, setUser] = useState(null);


  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSignUp() {
    setSignUp(SignUp ? false : true ); 
    if(SignIn === true){
      setSignIn(SignIn ? false : true);
    }
  }

  function onSignIn() {
    setSignIn(SignIn ? false : true);
    if(SignUp === true){
      setSignUp(SignUp ? false : true );
    }
  }


  
  return (   
  
  <div className="MainPage"> 
{/* 
     <div className="FondDecran">
      <img src="images/FondDecran.png" alt="fond d'écran" class="background-image" />
    </div> */}
<Header></Header>
   
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"></a>
        <div class="collapse_navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item dropdown active">
              <button class="btn" onClick={() => onSignUp()}>S'inscrire</button>
            </li>
            <li class="nav-item dropdown">
              <button class="btn" onClick={() => onSignIn()}>Se connecter</button>
            </li>
          </ul>
        </div>
      </nav>
   

      {loading === true && <p>Chargement...</p>}
      {error === true && <p>Une erreur s'est produite</p>}


      <div className="SignIn">
        {SignIn && !SignUp && <Signin/>}
      </div>

      <div className="SignUp">
        {SignUp && !SignIn && <Signup/>}
      </div>

      </div>
  );
}

export default MainPage;
