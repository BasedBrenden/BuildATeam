import Navbar from "./Navbar"
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom"
import { auth } from "../firebase";
import { useState,useEffect } from "react";
import gen1boy from "../images/gen1boy.png";
import { useNavigate } from "react-router-dom";
import './componentsStyling/TrainerCard.css'
//honestly unsure about this, double check to see if this is redundant
import {getStorage, ref, getDownloadURL} from "firebase/storage";

const TrainerCard = () => {
    const {teamParam} = useParams();
    const [selectedTeam, setSelectedTeam] = useState(teamParam)
    const [trainerTeam, setTrainerTeam] = useState([])
    const [trainerName, setTrainerName] = useState('')

    const navigate = useNavigate();
    const storage = getStorage();
    
    const renderTeam = async() =>{
        const team = []
        fetch('https://batbackend.herokuapp.com/getTeam',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: auth.currentUser.email}),
        })
        .then((response)=> { return response.json()} )
        .then((data) => {
            setTrainerName(data[0].trainerName);
          if(selectedTeam === 'Team1'){
            for (let i = 0; i < data[0].Team1.length; ++i ) {
                team.push(data[0].Team1[i]);
              }
          }else if(selectedTeam === 'Team2'){
            for (let i = 0; i < data[0].Team2.length; ++i ) {
                team.push(data[0].Team2[i]);
              }
          }else{
            for (let i = 0; i < data[0].Team3.length; ++i ) {
                team.push(data[0].Team3[i]);
              }
            }
          setTrainerTeam(team) 
          }
        )
        .catch((error) =>console.log(error))
    }

    const download = (uri, filename) => {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename
            //Firefox requires the link to be in the body
            document.body.appendChild(link);
            //simulate click
            link.click();
            //remove the link when done
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
    }

    const downloadCard = () =>{
        const card = document.querySelector(".card-body");
        html2canvas(card, { logging: false, letterRendering: 1,  allowTaint: false , useCORS: true }).then(canvas => {
            download(canvas.toDataURL("image/jpeg"),"trainerCardee.jpg");
            window.open("https://cucucovers.com/pages/custom-covers")
        });
    }

    const getBackgrounds = () =>{
        const bucketParam = document.querySelector(".backgroundsSelect").value;
        getDownloadURL(ref(storage, 'backgrounds/'+ bucketParam + '.png'))
        .then((url) => {
            document.querySelector('.card-body').style.backgroundImage = "url("+url+")";
        })
        .catch((error) => {
            alert(error)
        })

    }

    const getTrainerSprites = () =>{
        const bucketParam = document.querySelector(".trainersSelect").value;
        getDownloadURL(ref(storage, 'trainersprites/'+ bucketParam + '.png'))
        .then((url) => {
            document.querySelector('.trainerHeadshot').setAttribute('src', url);
        })
        .catch((error) => {
            alert(error)
        })
    }

    const changeBorderColors = () =>{
        const newColor = document.querySelector(".bordersSelect").value;
        console.log(newColor)
        document.querySelector('.card-body').style.borderColor = newColor;
    
    }



    useEffect(() => {
        setSelectedTeam(teamParam)
        renderTeam();
    }, [])
    return (    
        <div className="trainerCardContainer">
            <Navbar/>
        <div className="card">
            
            <div>
                <div className="card-buttons">
                    <form name="cardBorders">
                        <label>Change Border Colors</label>
                        <select className="bordersSelect" onChange={()=>{changeBorderColors()}}>
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Green">Green</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Grey">Grey</option>
                        </select>
                    </form>
                    <form name="backgrounds">
                        <label>Change Background</label>
                        <select className="backgroundsSelect" onChange={()=>{getBackgrounds()}}>
                            <option value="Volcano">Volcano</option>
                            <option value="Antarctic">Antarctic</option>
                            <option value="Rainforest">Rainforest</option>
                            <option value="Dunes">Dunes</option>
                            <option value="Cave">Cave</option>
                            <option value="Deep Sea">Deep Sea</option>
                            <option value="Black Hole">Black Hole</option>
                            <option value="Star Nursery">Star Nursery</option>
                            <option value="Fighting Ring">Fighting Ring</option>
                            <option value="Midas Touch">Midas Touch</option>
                        </select>
                    </form>
                    <form name="trainerSprites">
                        <label>Change Trainer Sprite</label>
                        <select className="trainersSelect" onChange={()=>{getTrainerSprites()}}>
                            <option value="Boy Gen1">Gen1 Boy</option>
                            <option value="Gold">Gold</option>
                            <option value="Leaf">Leaf</option>
                            <option value="bugcatcher">Bugcatcher</option>
                            <option value="elite">Elite</option>
                            <option value="elitef">Elite f</option>
                            <option value="elite2">Elite2</option>
                            <option value="elitef2">Elite2 f</option>
                            <option value="gigachad">Giga Chad</option>
                            <option value="trainer1">Trainer</option>
                            <option value="trainer1f">Trainer f</option>
                            <option value="trainer2">Trainer2</option>
                            <option value="trainer2f">Trainer2 f</option>
                            <option value="wrangler">Wrangler</option>
                            <option value="wranglerf">Wrangler f</option>
                        </select>
                    </form>
                </div>
                <div className="card-container">
                    <div className="card-body">
                        <div className="card-name">
                            <h5 className="card-title">{trainerName}</h5>
                        </div>
                        <div className="trainerPhoto">
                            <img className="trainerHeadshot" src={gen1boy} alt="trainerSprites"></img>
                        </div>
                        <div className="cardTeam">
                        {trainerTeam.map((poke, index)=>
                            <img key={index} src={poke.pokeImage} alt="pokemonSprite" className="memberBackground"></img>
                        )}
                        </div>
                    {/* open circles for pokemon team sprites */}
                    
                    </div>
                </div>
            </div>
            <div className="options">
                <button type="button" className="homeBtn" onClick={()=>{navigate("/")}}>Home</button>
                <button type="button" id="downloadBtn" onClick={()=>{downloadCard()}}>Download and Create Trainer Card</button>
            </div>
            
        </div>
        </div>
        
    )

}

export default TrainerCard