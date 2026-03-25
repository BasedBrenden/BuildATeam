const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
    pokeID: {type: Number},
    pokeImage: {type: String},
    pokeImageAnim: {type: String},
    pokeName: {type: String},
    pokeAbility: {type: String},
    pokeAbilityEffect: {type: String},
    pokeAbility2: {type: String},
    pokeAbilityEffect2: {type: String},
    pokeType: {type: String},
    pokeType2: {type: String},
    pokeTypeCompare: {
        adv: [{type:String}],
        weak: [{type:String}]
    }
})


const UserSettingsSchema = new Schema({
    DarkMode: {type: Boolean}
})


const UserSchema = new Schema({
    Username: {type: String},
    trainerName: {type: String},
    trainerID: {type: String},
    Team1: [PokemonSchema],
    Team2: [PokemonSchema],
    Team3: [PokemonSchema],
    Settings: [UserSettingsSchema]
})

const userSchema = mongoose.model("User",UserSchema);

module.exports =userSchema;