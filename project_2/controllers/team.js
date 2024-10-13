const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTeams = async (req,res) => {
    //#swagger.tags = ['Teams']
    try {
        const result = await mongodb.getDatabase().db().collection('team').find().toArray(); // Converter o cursor em um array
        console.log("Teams from DB:", result); // Exibir os usuários no console

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result); 
    } catch (err) {
        console.error("Error retrieving users:", err); 
        res.status(400).json({ message: err.message });
    }
}

const getSingleTeam = async (req,res) => {
    //#swagger.tags = ['Teams']
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid team if to find a team')
    }
    const userId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDatabase().db().collection('team').findOne({ _id: userId });
        
        if (!result) {
            return res.status(404).json({ message: "Team not found" }); 
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result); 
    } catch (err) {
        console.error("Error retrieving team:", err); 
        res.status(400).json({ message: err.message }); 
    }
}

const createTeam = async(req,res) => {
    //#swagger.tags = ['Teams']
    const team = {
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
        founded: req.body.founded,
        stadium: req.body.stadium,
        league: req.body.league,
        
        }
    
    const response = await mongodb.getDatabase().db().collection('team').insertOne(team);
    if(response.acknowledged > 0 ) {
        res.status(201).send();
        } else{ 
            res.status(500).json(response.error || 'Some Error occurred while updating the team');
        }
}

const updateTeam = async(req, res) => {
    //#swagger.tags = ['Teams']
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid team if to update a team')
    }
    const teamId = new ObjectId(req.params.id)
    const team = {
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
        founded: req.body.founded,
        stadium: req.body.stadium,
        league: req.body.league,
    };

    const response = await mongodb.getDatabase().db().collection('team').replaceOne({_id: teamId}, team);
    if(response.modifiedCount > 0 ) {
        res.status(200).send();
        } else{ 
            res.status(500).json(response.error || 'Some Error occurred while updating the team');
        }
}


const deleteTeam = async(req, res) => {
    //#swagger.tags = ['Teams']
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact if to delete a team')
    }
    const teamId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('team').deleteOne({_id: teamId}, true);
    if(response.deletedCount > 0 ) {
        res.status(204).send();
        } else{ 
            res.status(500).json(response.error || 'Some Error occurred while updating the user');
        }
}



module.exports = {

    getAllTeams,
    getSingleTeam,
    createTeam,
    updateTeam,
    deleteTeam
}