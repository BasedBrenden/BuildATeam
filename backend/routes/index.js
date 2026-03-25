var express = require('express');
var mongoDB = 'mongodb+srv://bthomas:bthomas@cluster0.nkamwxm.mongodb.net/?retryWrites=true&w=majority'
var mongoose = require('mongoose');
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const UserData = require('../models/documentSchema')
var router = express.Router();


/* GET home page. */

router.get('/', async(req,res, next) =>{
  
  res.json({hello: "world"})
})


router.post('/getTeam', async(req,res, next) =>{
  const username = req.body.userId
  const currentTeam = await UserData.find({Username: username}, (err, data)=>{
    if(err) {return console.error(err)}
  }).clone();
  res.json(currentTeam)
})

router.post('/saveTeam', async(req,res, next) =>{
  UserData.findOneAndUpdate({Username: req.body.Username}, {$push:{ Teams: req.body.Team}}, (err, data)=>{
    if(err) {return console.error(err)}
  })
  res.json(currentTeams)
})



/* Post user sign-up/account creation*/
router.post("/sign-up", (req,res,next)=>{
  const user = new UserData({
    Username: req.body.username1,
    trainerName: req.body.trainerName,
    trainerID: req.body.trainerID,
    Team1: [],
    Team2: [],
    Team3: [],
    Settings: [],
  }).save(err=>{
    if(err){
      return next(err);
    }})
  res.send("please?")
})



/* Post a new pokemon into the roster*/

router.post('/addPoke', (req,res, next)=>{
  const newPokemonInfo ={
    pokeID: req.body.pokeID,
    pokeImage: req.body.pokeImage,
    pokeImageAnim: req.body.pokeImageAnim,
    pokeName: req.body.pokeName,
    pokeAbility: req.body.pokeAbility,
    pokeAbilityEffect: req.body.pokeAbilityEffect,
    pokeAbility2: req.body.pokeAbility2, 
    pokeAbilityEffect2: req.body.pokeAbilityEffect2,
    pokeType: req.body.pokeType,
    pokeType2: req.body.pokeType2,
    pokeTypeCompare:{
        adv: req.body.pokeTypeCompare.adv,
        weak: req.body.pokeTypeCompare.weak
    }
  }

  if(req.body.team == "Team 1"){
    UserData.findOneAndUpdate({Username: req.body.Username}, {$push:{ Team1: newPokemonInfo}}, {new:true}, (err, data)=>{
      if(err) {res.status(500).send("Error updating document");
    } else if (!data) {
      res.status(404).send("Document not found");
    } else {
      res.send("Document updated successfully");
    }
      
    })
  }else if(req.body.team == "Team 2"){
    UserData.findOneAndUpdate({Username: req.body.Username}, {$push:{Team2: newPokemonInfo}}, {new:true}, (err, data)=>{
      if(err) {res.status(500).send("Error updating document");
    } else if (!data) {
      res.status(404).send("Document not found");
    } else {
      res.send("Document updated successfully");
    }
      
    })
  }else{
    UserData.findOneAndUpdate({Username: req.body.Username}, {$push:{Team3: newPokemonInfo}}, {new:true} , (err, data)=>{
      if(err) {res.status(500).send("Error updating document");
    } else if (!data) {
      res.status(404).send("Document not found");
    } else {
      res.send("  cgfgd");
    }
      
    })
  }
  
  
})

/* Post: delete specific pokemon from team
*/

router.post('/deletePoke', (req,res)=>{
	
	if(req.body.team == "Team 1"){
    UserData.findOneAndUpdate({Username: req.body.Username}, {$pull:{ Team1: {pokeID:req.body.id}}}, {new:true}, (err, data)=>{
      if(err) {res.status(500).send("Error updating document");
    } else if (!data) {
      res.status(404).send("Document not found");
    } else {
      res.send("Document updated successfully");
    }
      
    })
  }else if(req.body.team == "Team 2"){
    UserData.findOneAndUpdate({Username: req.body.Username}, {$pull:{ Team2: {pokeID:req.body.id}}}, {new:true}, (err, data)=>{
      if(err) {res.status(500).send("Error updating document");
    } else if (!data) {
      res.status(404).send("Document not found");
    } else {
      res.send("Document updated successfully");
    }
      
    })
  }else{
		UserData.findOneAndUpdate({Username: req.body.Username}, {$pull:{ Team3: {pokeID:req.body.id}}}, {new:true}, (err, data)=>{
      if(err) {res.status(500).send("Error updating document");
    } else if (!data) {
      res.status(404).send("Document not found");
    } else {
      res.send("Document updated successfully");
    }
      
    })
	}
})

module.exports = router;
