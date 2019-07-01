import * as fire from 'firebase';

const config = {
	apiKey: "AIzaSyCKwbSlngcKhZz5heEWBcYApuFKlMfOYyY",
    authDomain: "cricbuzz-5d296.firebaseapp.com",
    databaseURL: "https://cricbuzz-5d296.firebaseio.com",
    projectId: "cricbuzz-5d296",
    storageBucket: "cricbuzz-5d296.appspot.com",
    messagingSenderId: "347903445023",
    appId: "1:347903445023:web:9614fefcc71ed244"
};
fire.initializeApp(config);
export default fire;
