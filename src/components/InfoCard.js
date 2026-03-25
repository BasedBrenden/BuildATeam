import { useState, useEffect} from 'react'
import { changeTypeColor } from '../Utils';
import './componentsStyling/InfoCard.css'

const InfoCard = ({Pokemon}) => {
    const [focusedAbility, setFocusedAbility] = useState('');
    const [typeAdvToggle, setTypeAdvToggle] = useState(false);

    const typeAdvWeak = () =>{
        const allTypesOnPage = document.querySelectorAll(".types");
        allTypesOnPage.forEach((type) => {
            changeTypeColor(type)
        })
        //changing the background colors of the card
        if (Pokemon.pokeType2 === ''){
            document.querySelector(".infoCardContainer").style.background = "linear-gradient(180deg,"+ window.getComputedStyle(allTypesOnPage[0]).backgroundColor +", white)";
        }else{
            document.querySelector(".infoCardContainer").style.background = "linear-gradient(180deg,"+ window.getComputedStyle(allTypesOnPage[0]).backgroundColor +", "+ window.getComputedStyle(allTypesOnPage[1]).backgroundColor +")";
        }
    }

    const toggleTypeAdvWeak = () =>{
        setTypeAdvToggle(!typeAdvToggle);
    }

    useEffect(() => {
        typeAdvWeak();
    }, [Pokemon, typeAdvToggle])


    return(
        <div className="infoCardContainer">
            <p className="pokeCardName">{Pokemon.pokeName}</p>
            <p className="pokeCardId">#{Pokemon.pokeID}</p>
                
            <div className="pokeCardMainTypes">
                <p className = "types">{Pokemon.pokeType}</p>
                {(Pokemon.pokeType2 === '') ?<span></span>:
                    <p className = "types">{Pokemon.pokeType2}</p>}
                
            </div>
                
            {(Pokemon.pokeImageAnim === "n/a") ? <img src={Pokemon.pokeImage} className="infoImage" alt="woooo"></img>
                    : <img src={Pokemon.pokeImageAnim} className="infoImage" alt="woooo"></img> }
            
            <div className="pokeCardTypesComp">
                {(typeAdvToggle === true) ? 
                    <div id="infoStatsAdv">
                        <h2>Advantages </h2>
                        <div className="typesContainer">
                            {Pokemon.pokeTypeCompare.adv.map((type, index) =>
                                <p key={index} className = "types">{type}</p>
                            )}
                        </div>
                        <div >
                            <span id="carousel" className="material-symbols-outlined" onClick={()=> toggleTypeAdvWeak()}> radio_button_checked </span>
                            <span id="carouselNot" className="material-symbols-outlined" onClick={()=> toggleTypeAdvWeak()}> circle </span>
                        </div>
                    </div> 
                    : 
                    <div id="infoStatsAdv">
                        <h2>Weaknesses </h2>
                        <div className="typesContainer">
                            {Pokemon.pokeTypeCompare.weak.map((type, index) =>
                                <p key={index} className = "types">{type}</p>    
                            )}
                        </div>
                        <div>
                            <span id="carouselNot" className="material-symbols-outlined carousel" onClick={()=> toggleTypeAdvWeak()}> circle </span>
                            <span id="carousel" className="material-symbols-outlined carousel" onClick={()=> toggleTypeAdvWeak()}> radio_button_checked </span>
                        </div>
                    </div>
                }
            </div>
            <div id = "infoAbility">
                <div>
                <h2>Abilities</h2>
                <div className="abilityTitle">
                    <button type="button" className="abilityButton" onClick={()=>setFocusedAbility(Pokemon.pokeAbilityEffect)}>{Pokemon.pokeAbility}</button>
                    {(Pokemon.pokeAbility2 === '') ?<span></span>:
                        <button type="button" className="abilityButton" onClick={()=>setFocusedAbility(Pokemon.pokeAbilityEffect2)}>{Pokemon.pokeAbility2}</button>}
                </div>
                <div id="abilityDescription">
                    <p>{focusedAbility}</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard;