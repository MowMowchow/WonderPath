import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

const fapp = firebase.initializeApp({
	apiKey: 'AIzaSyDKLHPlzvh5J-4sJgnvRmYi7OXryBAyK6w',
	authDomain: 'wonderpath-7d415.firebaseapp.com',
	databaseURL: 'https://wonderpath-7d415.firebaseio.com',
	projectId: 'wonderpath-7d415',
	storageBucket: 'wonderpath-7d415.appspot.com',
	messagingSenderId: '82045957531',
	appId: '1:82045957531:web:376c370fbf894189345d3e',
	measurementId: 'G-T151H7V0MB'
});

const storage = firebase.storage();

export {storage, fapp as default};
