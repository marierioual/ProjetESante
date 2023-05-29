import "./ProfilePage.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import UserData from "../models/UserData";
import User from "../models/User";
import ActivitiesChart from "./ActivitiesChart";
import ActivityData from "../models/ActivityData";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Recharts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CaloriesChart from "./CaloriesChart";

const axiosInstance = axios.create({
    baseURL: "https://fake-health-data-api.shrp.dev/",
    timeout: 3000,
    headers: {},
  });

function ProfilePage(){    
    const navigate = useNavigate();

    library.add(faQuoteLeft, faQuoteRight);    
    var user = localStorage.getItem("user");
    if (user == null) {
        navigate("/");
    }
    console.log("User: ")
    console.log(user);
    user = JSON.parse(user);


    const MotivationQuotes = [
        "La santé est un état de complet bien-être physique, mental et social, et ne consiste pas seulement en une absence de maladie ou d'infirmité.",
        "La santé est un trésor qui se conserve par la tempérance, et se perd par la précipitation.",
        "Le succès n’est pas final, l’échec n’est pas fatal : c’est le courage de continuer qui compte.",
        "Courir sur la pause du déjeuner.. on y pense pas assez !!",
        "Chaque pas que vous faites vous rapproche de votre objectif. Ne sous-estimez jamais le pouvoir des victoires quotidiennes.",
        "Fixez-vous des petites récompenses pour chaque objectif atteint , cela peut être une sortie cinéma, un nouveau vêtement, un massage, un voyage, etc.",
        "Avoir un objectif est la première étape pour transformer l’invisible en visible.",
        "Bien-être : état d’une personne qui se sent bien, en forme, en bonne santé.",
        "Courir est une activité qui permet de se sentir bien dans son corps et dans sa tête.",
        "Work hard, play hard.",
    ];
    let activityQuoteIndex = Math.floor(Math.random() * MotivationQuotes.length);
    let activityQuote = MotivationQuotes[activityQuoteIndex];
    MotivationQuotes.splice(activityQuoteIndex, 1);
    let caloriesQuoteIndex = Math.floor(Math.random() * MotivationQuotes.length);
    let caloriesQuote = MotivationQuotes[caloriesQuoteIndex];
    MotivationQuotes.splice(caloriesQuoteIndex, 1);

    const [userPData, setUserPData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userActivities, setUserActivities] = useState(null);

    // on utilise l'id fdad8f49-c212-4662-bd42-37b14a03c365 parce qu'on a pas de donnée avec notre compte
    let UserId = "fdad8f49-c212-4662-bd42-37b14a03c365";
    // let UserId = user.id;
    let accessToken = user.accessToken;

    async function loadAllUsersData(){
        const responseAllUsersData = await axiosInstance.get(`/people`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(responseAllUsersData);
    }

    async function loadUserData(){
        const response = await axiosInstance.get(`/people/${UserId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("Response User data :");
        console.log(response);
        var userData = new UserData(response.data.people);
        console.log("User Data:");
        console.log(userData);   
        setUserData(userData);
    }

    async function loadUserPhysicalActivity(){
        const responsePA = await axiosInstance.get(`/people/${UserId}/physical-activities`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("Physical Activities:");
        console.log(responsePA.data.people.physicalActivities);
        var activities = [];        
        for (var i = 0; i < responsePA.data.people.physicalActivities.length; i++) {
            var activity = responsePA.data.people.physicalActivities[i];
            activities.push(new ActivityData(activity));
        }
        console.log("Activities:");
        console.log(activities);
        // Set activities in the local state
        setUserActivities(activities);
    }

    async function loadUserPhysiologicalData(){
        const responsePData = await axiosInstance.get(`/people/${UserId}/physiological-data`, 
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(responsePData);
    }
    
    function onSignOut() {
        localStorage.removeItem("user");
        navigate("/");
    }

    useEffect(() => {
            
        loadAllUsersData();
        loadUserData();
        loadUserPhysicalActivity();
        loadUserPhysiologicalData();
    }, []);


    return(
        <div className="ProfilePage">
            <Header />
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#"></a>
                <div class="collapse_navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                    <button class="btn" onClick={() => onSignOut()}>Se déconnecter</button>
                    </li>
                    </ul>
                </div>                
            </nav>
            
            <div className="ProfileContainer">
                <Container>
                    <Row>
                        <Col md={4}>
                            <div class="ProfileCard">
                                <h2>Profil</h2>
                                <hr></hr>
                                <p><span class="ProfileInfoLabel">Nom</span> : <span class="ProfileInfoValue">{userData?.lastname}</span></p>
                                <p><span class="ProfileInfoLabel">Prénom</span> : <span class="ProfileInfoValue">{userData?.firstname}</span></p>
                                <p><span class="ProfileInfoLabel">Email</span> : <span class="ProfileInfoValue">{user?.email}</span></p>
                                <p><span class="ProfileInfoLabel">Age</span> : <span class="ProfileInfoValue">{userData?.age} ans</span></p>
                                <p><span class="ProfileInfoLabel">Taille</span> : <span class="ProfileInfoValue">{userData?.height} cm</span></p>
                                <p><span class="ProfileInfoLabel">Poids de départ</span> : <span class="ProfileInfoValue">{userData?.weightStart} kg</span></p>
                                <p><span class="ProfileInfoLabel">Poids souhaité</span> : <span class="ProfileInfoValue">{userData?.weightGoal} kg</span></p>
                                <p><span class="ProfileInfoLabel">IMC de départ</span> : <span class="ProfileInfoValue">{userData?.bmiStart}</span></p>
                                <p><span class="ProfileInfoLabel">IMC souhaité</span> : <span class="ProfileInfoValue">{userData?.bmiGoal}</span></p>
                            </div>
                        </Col>
                        <Col md={8}>
                            <div class="ProfileCard">
                                <h2>Activités</h2>
                                <hr></hr>
                                <ActivitiesChart data={userActivities}/>
                                <p class="ProfileQuote ProfileQuoteActivities">
                                    <FontAwesomeIcon icon="quote-left" />
                                    {activityQuote}  
                                    <FontAwesomeIcon icon="quote-right" />
                                </p>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div class="ProfileCard">
                                <h2>Calories</h2>
                                <hr></hr>
                                <CaloriesChart data={userActivities}/>
                                <p class="ProfileQuote ProfileQuoteCalories">
                                    <FontAwesomeIcon icon="quote-left" />
                                    {caloriesQuote}
                                    <FontAwesomeIcon icon="quote-right" />
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
          </div>
          
        </div>
    )
}

export default ProfilePage;