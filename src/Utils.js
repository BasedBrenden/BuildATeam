const typeCompare=( pokeTypes) =>{

    let typeCompareArr = [[],[]];
    let types = new Map([
        ["FIRE", {
            "adv": ["GRASS", "ICE", "BUG", "STEEL"],
            "weak": ["WATER", "GROUND", "ROCK"]
        }],
        ["FLYING", {
            "adv": ["GRASS", "FIGHTING", "BUG"],
            "weak": ["ROCK", "ICE", "ELECTRIC"]
        }],
        ["STEEL", {
            "adv": ["ICE", "FAIRY", "ROCK"],
            "weak": ["FIRE", "FIGHTING", "GROUND"]
        }],
        ["WATER", {
            "adv": ["FIRE", "GROUND", "ROCK"],
            "weak": ["GRASS", "ELECTRIC"]
        }],
        ["GRASS", {
            "adv": ["WATER", "GROUND", "ROCK"],
            "weak": ["FIRE", "ICE", "POISON", "FLYING", "BUG"]
        }],
        ["DARK", {
            "adv": ["PSYCHIC", "GHOST"],
            "weak": ["POISON", "BUG", "FAIRY"]
        }],
        ["ELECTRIC", {
            "adv": ["WATER", "FLYING"],
            "weak": ["GROUND"]
        }],
        ["BUG", {
            "adv": ["GRASS", "PSYCHIC", "DARK"],
            "weak": ["FIRE", "ROCK", "FLYING"]
        }],
        ["PSYCHIC", {
            "adv": ["FIGHTING", "POISON"],
            "weak": ["BUG", "GHOST", "DARK"]
        }],
        ["ROCK", {
            "adv": ["FIRE", "ICE", "FLYING", "BUG"],
            "weak": ["WATER", "GRASS", "FIGHTING", "GROUND", "STEEL"]
        }],
        ["GROUND", {
            "adv": ["ELECTRIC", "FIRE", "POISON", "ROCK", "STEEL"],
            "weak": ["WATER", "GRASS", "ICE"]
        }],
        ["FAIRY", {
            "adv": ["FIGHTING", "DRAGON", "DARK"],
            "weak": ["STEEL", "POISON"]
        }],
        ["FIGHTING", {
            "adv": ["NORMAL", "ICE", "ROCK", "DARK", "STEEL"],
            "weak": ["FLYING", "PSYCHIC", "FAIRY"]
        }],
        ["GHOST", {
            "adv": ["PSYCHIC", "GHOST"],
            "weak": ["GHOST", "DARK"]
        }],
        ["ICE", {
            "adv": ["GRASS", "GROUND", "FLYING", "DRAGON"],
            "weak": ["FIRE", "FIGHTING", "ROCK", "STEEL"]
        }],
        ["NORMAL", {
            "adv": ["None"],
            "weak": ["FIGHTING"]
        }],
        ["POISON", {
            "adv": ["GRASS", "FAIRY"],
            "weak": ["GROUND", "PSYCHIC"]
        }],
        ["DRAGON", {
            "adv": ["DRAGON"],
            "weak": ["ICE", "DRAGON", "FAIRY"]
        }]
    ]);
    
    pokeTypes.forEach( (pokeType) =>{
        console.log(pokeType, types.has(pokeType))
        if (types.has(pokeType)){
        // push the corresponding dictIndex into the array
            typeCompareArr[0].push(...types.get(pokeType).adv)
            typeCompareArr[1].push(...types.get(pokeType).weak)
        }
    })
        //get rid of duplicates
    typeCompareArr[0] = [...new Set(typeCompareArr[0])]
    typeCompareArr[1] = [...new Set(typeCompareArr[1])]
    typeCompareArr[0] = typeCompareArr[0].filter(e => e !== 'None')

    return typeCompareArr
}


const changeTypeColor = (item) =>{
    if (item){
        let currClasses = item.classList;
        if (currClasses["1"]){
            item.classList.remove(currClasses["1"])
        }
        item.classList.add(item.innerHTML)
    }
}

const updateSearch = async (setFocusedPokemon) =>{
    const inputSearch = document.querySelector('#input').value
    const updateError = document.querySelector('.errorMessage');

    try{
      const test2 = await fetch('https://pokeapi.co/api/v2/pokemon/' + inputSearch.toLowerCase());
      const newTest2 = await test2.json();
      updateError.innerHTML = ' '

      let foundAbilities = [newTest2.abilities[0].ability.name]
      
      let effect = await fetch(newTest2.abilities[0].ability.url)
        .then((response)=>{
         return response.json();
        }).then((data)=>{
            return data.effect_entries[1].short_effect;
        })
    
      foundAbilities.push(effect)
      if(newTest2.abilities.length > 1){
        foundAbilities.push(newTest2.abilities[1].ability.name)
        effect = await fetch(newTest2.abilities[1].ability.url)
        .then((response)=>{
         return response.json();
        }).then((data)=>{
            return data.effect_entries[1].short_effect;
        })
        foundAbilities.push(effect)
      }else{
        foundAbilities.push('')
      }

      let foundTypes = [newTest2.types[0].type.name.toUpperCase()];
      if(newTest2.types.length > 1){
        foundTypes.push(newTest2.types[1].type.name.toUpperCase())
      }else{
        foundTypes.push("")
      }

      const typeCompareTemp = typeCompare(foundTypes);
      let anim = "n/a"
      if(newTest2.sprites.versions['generation-v']['black-white'].animated.front_default){
        anim = newTest2.sprites.versions["generation-v"]["black-white"].animated.front_default
        console.log(anim)
    }

      const converted = {
        pokeName: newTest2.name.toUpperCase(),
        pokeImage: newTest2.sprites.front_default,
        pokeImageAnim: anim,
        pokeID: newTest2.id,
        pokeAbility: foundAbilities[0].toUpperCase(), 
        pokeAbilityEffect: foundAbilities[1],
        pokeAbility2: foundAbilities[2].toUpperCase(), 
        pokeAbilityEffect2: foundAbilities[3],
        pokeType: foundTypes[0],
        pokeType2: foundTypes[1],
        pokeTypeCompare: {
            adv: typeCompareTemp[0],
            weak: typeCompareTemp[1],
        }
      }
      setFocusedPokemon(converted)
      let searchUpdate = document.querySelector('#input')
      searchUpdate.value = ''
    }
    catch(error){
        console.log(error)
      updateError.innerHTML = 'Enter a valid pokemon name'
    }
  }


export {typeCompare, updateSearch, changeTypeColor};