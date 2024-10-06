const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req,res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db().collection('users').find()
    result.toArray((err, users) => {
        if (err) {
            res.status(400).json({message:err})
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users);
    })
}

const getSingle = async (req,res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId})
    result.toArray((err, user) => {
        if (err) {
            res.status(400).json({message:err})
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(user);
    })
}

const createUser = async(req,res) => {
    //#swagger.tags = ['Users']
    const user = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        registration_date: req.body.registration_date,
        is_active: req.body.is_active,
        hobbies: req.body.hobbies,
        location: {
            city: req.body.location.city,
           country: req.body.location.country
        }
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if(response.acknowledged > 0 ) {
        res.status(201).send();
        } else{ 
            res.status(500).json(response.error || 'Some Error occurred while updating the user');
        }
}

const updateUser = async(req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id)
    const user = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        registration_date: req.body.registration_date,
        is_active: req.body.is_active,
        hobbies: req.body.hobbies,
        location: {
            city: req.body.location.city,
           country: req.body.location.country
        }
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if(response.modifiedCount > 0 ) {
        res.status(200).send();
        } else{ 
            res.status(500).json(response.error || 'Some Error occurred while updating the user');
        }
}


const deleteUser = async(req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId}, true);
    if(response.deletedCount > 0 ) {
        res.status(204).send();
        } else{ 
            res.status(500).json(response.error || 'Some Error occurred while updating the user');
        }
}



module.exports = {

    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}