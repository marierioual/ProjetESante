import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";

import User from "../models/User";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fake-health-data-api.shrp.dev/",
  timeout: 3000,
  headers: {},
});

function Signup() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  async function onSubmitSignUpForm(data) {
    const aUser = new User(
      data.first_name,
      data.last_name,
      data.email,
      data.password
    );

    try {
      setLoading(true);

      const response = await axiosInstance.post(`/auth/signup`, {
        firstname: data.first_name,
        lastname: data.last_name,
        email: data.email,
        password: data.password,
      });
      
      if (response.status === 204) {
        setUser(aUser);
      }

      setLoading(false);
      setError(false);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="Signup">
        <div className="SignCard">
          {loading === false && error === false && user !== null && (
            <p>
              Compte créé pour <b>{`${user.first_name} ${user.last_name}`}</b> (
              {user.email})
            </p>
          )}
          {loading === true && <p>Chargement...</p>}
          {error === true && <p>Une erreur s'est produite</p>}
        
          <div className="SignUpPhrase">
            <p>Trouvez votre rythme avec le programme E-santé.<br/>
              Des exercices et des conseils nutritionnels développés par des professionnels et adaptés à vous et à vos objectifs.<br/> 
              Planifiez vos séances et vos repas en toute simplicité.<br/> 
              N'attendez plus pour prendre soin de vous.</p>
          </div>
          <br/>
          <form onSubmit={handleSubmit(onSubmitSignUpForm)}>
            <div class="form-group">
              <label>Prénom</label>
            <input class="form-control" type="text" placeholder="Prénom"
              {...register("first_name", { required: true })}
            />
            {errors.first_name && <span>Ce champ est obligatoire</span>}
            </div>
            <div class="form-group">
              <label>Nom</label>
            <input class="form-control" type="text" placeholder="Nom"
              {...register("last_name", { required: true })}
            />
            </div>
            {errors.last_name && <span>Ce champ est obligatoire</span>}
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
              <button type="submit">Création de compte</button>
            </div>            
          </form>
        </div>
    </div>
  );
}

export default Signup;
