import { config } from '../config'

export default {

    /**
     * get live matches
     */
    liveScore: () => {
        return fetch(config.baseApiUrl+"cricket?apikey="+config.baseApiKey)
            .then((res) => {
                return res.json();
            })
            .catch((err) => {return {message: 'internal server error'}} );
    },

    /**
     * get current and future matches
     */
    futureSeries: () => {
        return fetch(config.baseApiUrl+"matches?apikey="+config.baseApiKey)
            .then((res) => {
                return res.json();
            })
            .catch((err) => {return {message: 'internal server error'}});
    },

    /**
     * get matches by day wise
     */
    matchByDay: () => {
        return fetch(config.baseApiUrl+"matchCalendar?apikey="+config.baseApiKey)
        .then((res) => {
            return res.json();
        })
        .catch((err) => {return {message: 'internal server error'}});
    },

    /**
     * @params {json} playerName
     * get player details by name
     */
    getPlayerByName: (playerName) => {
        return fetch(config.baseApiUrl+"playerFinder?apikey="+config.baseApiKey+"&name="+playerName)
        .then((res) => {
            return res.json();
        })
        .catch((err) => {return {message: 'internal server error'}});
    },

    /**
     * @params {json} player id
     * get player details by id
     */
    getPlayerById: (playerId) => {
        return fetch(config.baseApiUrl+"playerStats?apikey="+config.baseApiKey+"&pid="+playerId)
        .then((res) => {
            return res.json();
        })
        .catch((err) => {return {message: 'internal server error'}});
    },

    /**
     * @params {json} match id
     * get match details
     */
    getScore: (matchId) => {
        return fetch(config.baseApiUrl+"fantasySummary?apikey="+config.baseApiKey+"&unique_id="+matchId)
        .then((res) => {
            return res.json();
        })
        .catch((err) => {return {message: 'internal server error'}});
    }
}