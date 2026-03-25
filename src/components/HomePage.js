import {useState, useEffect} from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import TeamView from './TeamView';
import Navbar from './Navbar'
import './componentsStyling/HomePage.css';

function HomePage() {

  const [premadeTeams, setPremadeTeams] = useState([])
  const [userId, setUserId] = useState('no');
  const navigate = useNavigate();
 
  useEffect(() => {
    renderTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const renderTeams = async() =>{
    const teams = {
      team1: [],
      team2: [],
      team3: []
    }
    
      if(auth.currentUser){
        const uid = auth.currentUser.email;
        
        setUserId(uid)
        fetch('https://batbackend.herokuapp.com/getTeam',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: uid}),
        })
        .then((response)=> { return response.json()})
        .then((data) => {
          for (let i = 0; i < data[0].Team1.length; ++i ) {
            teams.team1.push(data[0].Team1[i]);
          }
          for (let i = 0; i < data[0].Team2.length; i++ ) {
            teams.team2.push(data[0].Team2[i]);
          }
          for (let i = 0; i < data[0].Team3.length; i++ ) {
            teams.team3.push(data[0].Team3[i]);
          }
          setPremadeTeams(teams) 
          }
        )
        .catch((error) =>console.log(error))
      }else{
        navigate("/")
      }
        
    };
  

  return (
    <div className="App">
        <Navbar/>
      <h1> Welcome Back! </h1>
      <div className="TeamViewContainer">
        <TeamView 
          fullTeam={premadeTeams}
          updateTeamsFunc={renderTeams}
          userId = {userId}
        />
      </div>
    </div>
  );
}

export default HomePage;
