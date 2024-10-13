const express = require('express')
const router = express.Router()
const teamsController = require('../controllers/team')
const { teamValidationRules, validate } = require('../middleware/validate');
const auth = require('../middleware/authenticate');


router.get('/', teamsController.getAllTeams);

router.get('/:id', teamsController.getSingleTeam);

router.post('/', auth.isAuthenticated, teamValidationRules(), validate, teamsController.createTeam)

router.put('/:id', auth.isAuthenticated, teamValidationRules(), validate, teamsController.updateTeam)

router.delete('/:id', auth.isAuthenticated, teamsController.deleteTeam)

module.exports = router