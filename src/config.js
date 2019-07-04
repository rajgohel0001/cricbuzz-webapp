import * as fire from 'firebase';

const baseUrl = "https://cricapi.com/api/"
// const apiKey = "35xllyx5K7bMzc5qcuas7W6Uzml2"
const apiKey = "KxFEC7542kcdZoSrfyOH452AoL42"

export const config = {
    baseApiUrl: baseUrl,
    baseApiKey: apiKey,
    apiKey: "AIzaSyCKwbSlngcKhZz5heEWBcYApuFKlMfOYyY",
    authDomain: "cricbuzz-5d296.firebaseapp.com",
    databaseURL: "https://cricbuzz-5d296.firebaseio.com",
    projectId: "cricbuzz-5d296",
    storageBucket: "cricbuzz-5d296.appspot.com",
    messagingSenderId: "347903445023",
    appId: "1:347903445023:web:9614fefcc71ed244"
}

fire.initializeApp(config);
export default fire;