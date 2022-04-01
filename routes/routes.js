const express = require("express");
const { userloginController, checkIfLoggedIn } = require("../controllers/login-controller");
const { getMatch } = require("../controllers/matches-controller");
const { getPlayers, getPlayersWithId } = require("../controllers/players-controller");
const { signUpController } = require("../controllers/sign-up-controller");
const { getSquads } = require("../controllers/squads-controller");
const { getTables } = require("../controllers/tables-controller");
const { refreshDb } = require("../controllers/update-db-controller");
const { getVenues } = require("../controllers/venues-controller");
const router = express.Router();

router
.route('/api/get-matches')
.get(getMatch);

router
.route('/api/update-db')
.post(refreshDb);

router
.route('/api/get-squads')
.get(getSquads)

router
.route('/api/get-standings')
.get(getTables)

router
.route('/api/get-venues')
.get(getVenues)

router
.route('/api/get-players')
.get(getPlayers)

router
.route('/api/get-players:id')
.get(getPlayersWithId)

router
.route('/api/sign-up')
.post(signUpController);

router
.route('/api/sign-in')
.post(checkIfLoggedIn, userloginController);

module.exports = router;