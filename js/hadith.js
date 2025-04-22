import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getFirestore, doc, getDoc, collection } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

const firebaseConfig = {
	apiKey: "AIzaSyDeg3FLGl_R80FSqA03zJPcQ5IDwEgE62I",
	authDomain: "fadhakkir-33633.firebaseapp.com",
	projectId: "fadhakkir-33633",
	storageBucket: "fadhakkir-33633.firebasestorage.app",
	messagingSenderId: "831080653475",
	appId: "1:831080653475:web:5ecb014468b76e05c61516",
	measurementId: "G-5TNBQLLTT1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDocument(group, name) {
	const docRef = doc(db, group, name);
	const docSnap = await getDoc(docRef);
	return docSnap.data();
}

document.querySelectorAll('.recommended').forEach(function(el) {
    el.addEventListener('click', async function() {
        document.querySelector('.description-arabic').textContent = (await getDocument("dhikr-hadiths", el.querySelector('.recommended-name').textContent)).arabic;
		document.querySelector('.description-translation').textContent = (await getDocument("dhikr-hadiths", el.querySelector('.recommended-name').textContent)).translation;
		document.querySelector('.description-reference').textContent = (await getDocument("dhikr-hadiths", el.querySelector('.recommended-name').textContent)).reference;
    })
})