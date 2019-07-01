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
            .then((data) => {
                return data;
            })
            .catch((err) => console.log(err));
    },

    /**
     * get current and future matches
     */
    futureSeries: () => {
        return fetch(config.baseApiUrl+"matches?apikey="+config.baseApiKey)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;
            })
            .catch((err) => console.log(err));
    },

    /**
     * get matches by day wise
     */
    matchByDay: () => {
        return fetch(config.baseApiUrl+"matchCalendar?apikey="+config.baseApiKey)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));
    },

    /**
     * @params {req: player name}
     * get player details by name
     */
    getPlayerByName: (playerName) => {
        return fetch(config.baseApiUrl+"playerFinder?apikey="+config.baseApiKey+"&name="+playerName)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));
    },

    /**
     * @params {req: player id}
     * get player details by id
     */
    getPlayerById: (playerId) => {
        return fetch(config.baseApiUrl+"playerStats?apikey="+config.baseApiKey+"&pid="+playerId)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));
    },

    /**
     * @params {req: match id}
     * get match details
     */
    getScore: (matchId) => {
        return fetch(config.baseApiUrl+"fantasySummary?apikey="+config.baseApiKey+"&unique_id="+matchId)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));
    }
}