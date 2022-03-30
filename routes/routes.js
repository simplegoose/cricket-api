const express = require("express");
const { getMatch } = require("../controllers/matches-controller");
const { getPlayers } = require("../controllers/players-controller");
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

module.exports = router;