import React from 'react'
import { updateSearch} from '../Utils'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './componentsStyling/TeamView.css'
import './componentsStyling/TypeStyles.css'
import InfoCard from './InfoCard'

const TeamView = ({fullTeam, updateTeamsFunc, userId}) => {

    const [focusedPokemon, setFocusedPokemon] = useState('');
    const [focusedAbility, setFocusedAbility] = useState('');
    const [focusedTeam, setFocusedTeam] = useState(fullTeam.team1);

    useEffect(() => {
        setFocusedTeam(fullTeam.team1)
    }, [fullTeam])
    
    const navigate = useNavigate();
    const removePokemon = (pokeId) =>{
        
        let teamName = '';
        if(focusedTeam === fullTeam.team1){
            teamName = 'Team 1'
        }else if(focusedTeam === fullTeam.team2){
            teamName = 'Team 2'
        }else{
            teamName = 'Team 3'
        }

        fetch('https://batbackend.herokuapp.com/deletePoke',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: pokeId, 
                Username: userId,
                team: teamName}),
        })
        .then( (response)=>{

            updateTeamsFunc();
            setFocusedTeam(focusedTeam.filter(poke=>poke.pokeID !== pokeId))
            setFocusedPokemon('');
            
        })
        .catch((error) => console.log(error))
    }
    
    const updateFocused = (poke)=>{
        setFocusedPokemon(poke)
        setFocusedAbility('')
        updateTeamsFunc();
    }

    const addPokemonToTeam = () =>{
        const updateError = document.querySelector('.errorMessage');
        let teamName = '';
        if(focusedTeam === fullTeam.team1){
            teamName = 'Team 1'
        }else if(focusedTeam === fullTeam.team2){
            teamName = 'Team 2'
        }else{
            teamName = 'Team 3'
        }
        if(focusedTeam.length === 6){
            updateError.innerHTML = "Current team is too large! Try removing a pokemon and trying again"
        }else{
            //this conversion should be in the backend
            fetch('https://batbackend.herokuapp.com/addPoke',{
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                pokeID: focusedPokemon.pokeID,
                pokeImage: focusedPokemon.pokeImage,
                pokeImageAnim: focusedPokemon.pokeImageAnim,
                pokeName: focusedPokemon.pokeName,
                pokeAbility: focusedPokemon.pokeAbility, 
                pokeAbilityEffect: focusedPokemon.pokeAbilityEffect,
                pokeAbility2: focusedPokemon.pokeAbility2, 
                pokeAbilityEffect2: focusedPokemon.pokeAbilityEffect2,
                pokeType: focusedPokemon.pokeType,
                pokeType2: focusedPokemon.pokeType2,
                pokeTypeCompare:{
                    adv: focusedPokemon.pokeTypeCompare.adv,
                    weak: focusedPokemon.pokeTypeCompare.weak,
                },
                Username: userId,
                team: teamName}) 
            })
            .then(()=>{updateTeamsFunc(); setFocusedTeam([...focusedTeam, focusedPokemon]);setFocusedPokemon('')})
            .catch((error)=>{updateError.innerHTML = error})
        }
    }

    const pokeHover = (poke) =>{
        const pokeElement = document.getElementById(poke);
        pokeElement.classList.add("pokeSpriteImgHover");
    }

    const removePokeHover = (poke) =>{
        const pokeElement = document.getElementById(poke);
        pokeElement.classList.remove("pokeSpriteImgHover");
    }

    const goToTrainerCard = () =>{
        let teamName = '';
        if(focusedTeam === fullTeam.team1){
            teamName = 'Team1'
        }else if(focusedTeam === fullTeam.team2){
            teamName = 'Team2'
        }else{
            teamName = 'Team3'
        }

        navigate("/trainer-card/"+teamName);

    }




    return (
        <div className="teamviewContainer">
            <div className="search2">
                <input id='input' type="text" placeholder="Try &quot;Absol&quot; or &quot;Piplup&quot;!"></input>
                <button type='button' id= "searchBtn"onClick={()=>{updateSearch(setFocusedPokemon);}}>Search!</button>
                <h1 className="errorMessage"> </h1>
            </div>

            
                
                <div className="teamDropdown">
                    <button type="button" className="teamDropdownBtn" onClick={()=>{setFocusedTeam(fullTeam.team1)}}>Team 1</button>
                    <button type="button" className="teamDropdownBtn" onClick={()=>{setFocusedTeam(fullTeam.team2)}}>Team 2</button>
                    <button type="button" className="teamDropdownBtn" onClick={()=>{setFocusedTeam(fullTeam.team3)}}>Team 3</button>
                </div>
            
      
            <div className="info">
                {(focusedPokemon === '') ? <span></span>:
                    <div>
                        <InfoCard Pokemon={focusedPokemon} />
                        <button type="button" className="addBtn" onClick={()=>{addPokemonToTeam()}}> Add Pokemon</button>
                        <button type="button" className="removeBtn" onClick={()=>{removePokemon(focusedPokemon.pokeID)}}>Remove Pokemon</button>
                    </div>
                }
                
            </div>
            <div id="team">
                {focusedTeam && focusedTeam.map((pokemon)=>
                    <div className='teamCardContainer' key= {pokemon.pokeName} onClick={() => {updateFocused(pokemon)}} onMouseOver={()=>{pokeHover(pokemon.pokeID)}} onMouseLeave={()=>{removePokeHover(pokemon.pokeID)}}>
                        <div className="pokeSprite">
                            <img className="pokeSpriteImg" src={pokemon.pokeImage} alt='wooo' id={pokemon.pokeID}></img>
                        </div>
                        <div className="teamCardHeader">
                            <p className="cardName">{pokemon.pokeName}</p>
                            <p className="cardLvl">Lv.99</p>
                        </div>
                        <div className="teamCardHP">
                            <div className ="hpBar">
                                <p>HP</p>
                                <span></span>
                            </div>
                        </div>
                        
                    </div>
                )}
                <div>
                    <button type="button" className="shareBtn" onClick={()=>{goToTrainerCard()}}> Share Team</button>
                </div>
            </div>
        </div>
    )
}

export default TeamView
