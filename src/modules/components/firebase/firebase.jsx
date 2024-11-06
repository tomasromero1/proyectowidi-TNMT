import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
