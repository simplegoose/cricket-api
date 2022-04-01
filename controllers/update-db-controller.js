const axios = require('axios');
require('dotenv').config();
const Match = require('../models/matches-model');
const Players = require('../models/players-model');
const Squads = require('../models/squad-model');
const Tables = require('../models/tables-model');
const Venues = require('../models/venues-model');

const {
    API_URL,
    API_HOST,
    API_KEY
} = process.env;

exports.refreshDb = async (req, res) => {
    //Delete all player in the db incase there are changes
    await Players.deleteMany({});

    /**
     * Set timeout function to allow code to run
     * asychrounously and enable all requests to be made
     * due to api limitation.
     * 
     * The methods are wrapped in promises to catch
     * errors.
     */

    let getMatchesPromise = new Promise( (resolve, reject) => {
        getMatches();
        resolve(true);
    });

    let getSquadsPromise = new Promise( (resolve, reject) => {
        setTimeout(() => {
            getSquads();  
        }, 5000);
        resolve(true);
    });

    let getVenuesPromise = new Promise( (resolve, reject) => {
        setTimeout(() => {
            getVenues();
        }, 10000);
        resolve(true);
    });

    let getPointsTablePromise = new Promise( (resolve, reject) => {
        setTimeout(() => {
            getPointsTable();
        }, 15000);
        resolve(true);
    });

    let getPlayersPromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
    
            //Get squads
            let squads = await Squads.find({});
            let squadIds = squads[0]?.squadAnnouncedList.map( item => item.squadId);

            if(squadIds.length > 0) {
                squadIds.forEach( (item, index) => {
                    if(index > 0) {
                        setTimeout(() => {
                            getPlayers(item);
                        }, 5000 * index);
                    }
                })
                resolve(true);
            } else {
                reject(new Error('Error'));
            }
        }, 20000);
    });

    Promise.all([getMatchesPromise, getSquadsPromise, getVenuesPromise, getPointsTablePromise, getPlayersPromise])
    .then( values => {
        
        setTimeout(() => {
            res.send({
                message: 'Database update success.'
            });
        }, squads.length * 5000);
    })
    .catch(e => console.log(e))
}

function getMatches() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': API_HOST,
            'X-RapidAPI-Key': API_KEY
        }
    };

    /**
     * Axios request made to origin api's once
     * and the data from those api's cloned to local
     * db.
     */
    axios
    .request({ 
        ...options, 
        url: `${API_URL}/series/get-matches`, 
        params: { 
            seriesId: '4061' 
        }
    })
    .then(async function (response) {
        //Init object for saving data
        const matches = new Match({
            adWrapper: response.data.adWrapper
        });

        //Check for existing data
        const existing = await Match.find({});

        try {
            if(existing.length > 0) {
                await Match.updateOne({ _id: existing[0]._id}, {
                    adWrapper: response.data.adWrapper
                });

                return;
            }

            await matches.save();

        } catch (error) {
            console.log(error);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function getSquads() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': API_HOST,
            'X-RapidAPI-Key': API_KEY
        }
    };

    /**
     * Axios request made to origin api's once
     * and the data from those api's cloned to local
     * db.
     */
    axios
    .request({ 
        ...options, 
        url: `${API_URL}/series/get-squads`, 
        params: { 
            seriesId: '4061' 
        }
    })
    .then(async function (response) {
        //Init object for saving data
        const squads = new Squads({
            squadAnnouncedList: response.data.squadAnnouncedList,
            appIndex: {
                seoTitle: response.data.appIndex.seoTitle,
                webUrl: response.data.appIndex.webUrl,
            }
        });

        //Check for existing data
        const existing = await Squads.find({});

        try {
            if(existing.length > 0) {
                Squads.updateOne({ _id: existing[0]._id}, {
                    squadAnnouncedList: response.data.squadAnnouncedList,
                    appIndex: {
                        seoTitle: response.data.appIndex.seoTitle,
                        webUrl: response.data.appIndex.webUrl,
                    }
                });
                
                return;
            }
            await squads.save();

        } catch (error) {
            console.log(error);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function getVenues() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': API_HOST,
            'X-RapidAPI-Key': API_KEY
        }
    };

    /**
     * Axios request made to origin api's once
     * and the data from those api's cloned to local
     * db.
     */
    axios
    .request({ 
        ...options, 
        url: `${API_URL}/series/get-venues`, 
        params: { 
            seriesId: '4061' 
        }
    })
    .then(async function (response) {
        //Init object for saving data
        const venues = new Venues({
            venue: response.data.venue,
            appIndex: {
                seoTitle: response.data.appIndex.seoTitle,
                webUrl: response.data.appIndex.webUrl
            }
        });

        //Check for existing data
        const existing = await Venues.find({});

        try {
            if (existing.length > 0) {
                Venues.updateOne({ _id: existing[0]._id}, {
                    venue: response.data.venue,
                    appIndex: {
                        seoTitle: response.data.appIndex.seoTitle,
                        webUrl: response.data.appIndex.webUrl
                    }
                });
                
                return;
            }
            await venues.save();

        } catch (error) {
            console.log(error);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function getPointsTable() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': API_HOST,
            'X-RapidAPI-Key': API_KEY
        }
    };

    /**
     * Axios request made to origin api's once
     * and the data from those api's cloned to local
     * db.
     */
    axios
    .request({ 
        ...options, 
        url: `${API_URL}/series/get-points-table`, 
        params: { 
            seriesId: '4061' 
        }
    })
    .then(async function (response) {
        //Init object for saving data
        const tables = new Tables({
            pointsTable: response.data.pointsTable,
            appIndex: {
                seoTitle: response.data.appIndex.seoTitle,
                webUrl: response.data.appIndex.webUrl
            }
        });

        //Check for existing data
        const existing = await Tables.find({});

        try {
            if(existing.length > 0) {
                Tables.updateOne({ _id: existing[0]._id}, {
                    pointsTable: response.data.pointsTable,
                    appIndex: {
                        seoTitle: response.data.appIndex.seoTitle,
                        webUrl: response.data.appIndex.webUrl
                    }
                });

                return;
            }
            await tables.save();

        } catch (error) {
            console.log(error);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function getPlayers(params) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': API_HOST,
            'X-RapidAPI-Key': API_KEY
        }
    };

    /**
     * Axios request made to origin api's once
     * and the data from those api's cloned to local
     * db.
     * 
     * Set timeout function due to the limitation of
     * the api requests per second.
     */
    axios
    .request({ 
        ...options, 
        url: `${API_URL}/series/get-players`, 
        params: { 
            seriesId: '4061',
            squadId: params
        }
    })
    .then(async function (response) {
        //Init object for saving data
        const players = new Players({
            squadId: params,
            players: response.data.player
        });

        try {
            await players.save();

        } catch (error) {
            console.log(error);
        }
    }).catch(function (error) {
        console.log(error);
    });
}