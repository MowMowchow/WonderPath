import * as firebase from 'firebase';
import 'firebase/auth';

const fapp = firebase.initializeApp({
	apiKey: 'AIzaSyA9PUuRLktQLtQh8R0-mNJ_aiY61qcdK5Q',
	authDomain: 'wonderpath-7d415.firebaseapp.com',
	databaseURL: 'https://wonderpath-7d415.firebaseio.com',
	projectId: 'wonderpath-7d415',
	storageBucket: 'wonderpath-7d415.appspot.com',
	messagingSenderId: '82045957531',
	appId: '1:82045957531:web:376c370fbf894189345d3e',
	measurementId: 'G-T151H7V0MB'
});

export default fapp;
