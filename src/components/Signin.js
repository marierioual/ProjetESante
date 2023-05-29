import "./Signin.css";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import User from "../models/User";

import axios from "axios";
import ProfilePage from "./ProfilePage";

const axiosInstance = axios.create({
  baseURL: "https://fake-health-data-api.shrp.dev/",
  timeout: 3000,
  headers: {},
});

function Signin() {
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  async function onSubmitSignInForm(data) {
    try {
      setLoading(true);
      // Request "auth/signin" API endpoint with axiosInstance
      // to get access_token and refresh_token from the API
      // BY using the same method as "Basic Auth" in Postman but with axiosInstance

      const response = await axiosInstance.post("/auth/signin", {}, {
        auth: {
          username: data.email,
          password: data.password,
        },
      });

      if (response.status === 200) {

        console.log("REPONSE DATA:");
        console.log(response.data);
        const aUser = new User(null, null, data.email);

        aUser.accessToken = response.data.access_token;
        aUser.refreshToken = response.data.refresh_token;
        aUser.expires = response.data.expires;

        const decodedPayload = jwt_decode(aUser.accessToken);

        aUser.id = decodedPayload.id;

        console.log(aUser);

        // Save the user in the localStorage
        localStorage.setItem("user", JSON.stringify(aUser));
        setUser(aUser);
        setLoading(false);      
        // Redirect to the ProfilePage
        navigate("/profil");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }


  return (
    <div className="Signup">
      <div className="SignCard">
          {loading === true && <p>Chargement...</p>}
          {error === true && <p>Une erreur s'est produite</p>}
          {user === null && (
            <form onSubmit={handleSubmit(onSubmitSignInForm)}>
              <div class="form-group">
                  <label>Email</label>
                <input class="form-control" type="email" placeholder="Adresse mail"
                  {...register("email", { required: true })}
                />
                </div>
                {errors.email && <span>Ce champ est obligatoire</span>}
                <div class="form-group">
                <label>Mot de passe</label>
                <input class="form-control" type="password"
                  placeholder="Mot de passe"
                  {...register("password", { required: true })}
                />
                </div>
                {errors.password && <span>Ce champ est obligatoire</span>}

                <div>
                  <button type="submit">Connexion</button>
                </div>
            </form>
          )}
      </div>
    </div>
  );
}

export default Signin;
