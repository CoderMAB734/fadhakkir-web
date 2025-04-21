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

async function getDocument(musjid) {
	const docRef = doc(db, "newcastle-musjid-times", `newcastle-musjid-times-${musjid}`);
	const docSnap = await getDoc(docRef);
	return docSnap.data();
}

/////////////////
//pop-up details//
/////////////////

let description_index = [Math.floor(Math.random()), Math.floor(Math.random() * 4), Math.floor(Math.random()), Math.floor(Math.random()), Math.floor(Math.random()), Math.floor(Math.random() * 2), Math.floor(Math.random()), Math.floor(Math.random()), Math.floor(Math.random()), Math.floor(Math.random())];
let index = 0;
let total_des = 0;

/*
steps to add new time:
1: add the time below

steps to add new musjid
1: add it below
2: add class with same name to the musjid-box-big as the first class
3: increase the total musjids by 1
*/

let musjid_time;
let musjid_time_to;
let musjid_times;
let musjid_loaded;

const set_musjid_times = async function() {
	musjid_times = {
		//sehri end//fajr//sunrise//zawaal//duhr//asr//sunset//maghrib//isha//midnight//sunday-dhuhr//jumua//
		greeves_str: ['', (await getDocument('greeves_str')).fajr, '', '', (await getDocument('greeves_str')).duhr, (await getDocument('greeves_str')).asr, '', `${musjid_maghrib_time}`, (await getDocument('greeves_str')).isha, '', (await getDocument('greeves_str')).duhr_sun, (await getDocument('greeves_str')).juma],
		victoria_rd: ['', (await getDocument('victoria_rd')).fajr, '', '', (await getDocument('victoria_rd')).duhr, (await getDocument('victoria_rd')).asr, '', `${musjid_maghrib_time}`, (await getDocument('victoria_rd')).isha, '', (await getDocument('victoria_rd')).duhr_sun, (await getDocument('victoria_rd')).juma],
		darul_uloom: ['', (await getDocument('darul_uloom')).fajr, '', '', (await getDocument('darul_uloom')).duhr, (await getDocument('darul_uloom')).asr, '', `${musjid_maghrib_time}`, (await getDocument('darul_uloom')).isha, '', (await getDocument('darul_uloom')).duhr_sun, (await getDocument('darul_uloom')).juma],
		nmc: ['', (await getDocument('nmc')).fajr, '', '', (await getDocument('nmc')).duhr, (await getDocument('nmc')).asr, '', `${musjid_maghrib_time}`, (await getDocument('nmc')).isha, '', (await getDocument('nmc')).duhr_sun, (await getDocument('nmc')).juma],
		town: ['', (await getDocument('town')).fajr, '', '', (await getDocument('town')).duhr, (await getDocument('town')).asr, '', `${musjid_maghrib_time}`, (await getDocument('town')).isha, '', (await getDocument('town')).duhr_sun, (await getDocument('town')).juma],
		centre_street: ['', (await getDocument('centre_street')).fajr, '', '', (await getDocument('centre_street')).duhr, (await getDocument('centre_street')).asr, '', `${musjid_maghrib_time}`, (await getDocument('centre_street')).isha, '', (await getDocument('centre_street')).duhr_sun, (await getDocument('centre_street')).juma],
		fernwood: ['', (await getDocument('fernwood')).fajr, '', '', (await getDocument('fernwood')).duhr, (await getDocument('fernwood')).asr, '', `${musjid_maghrib_time}`, (await getDocument('fernwood')).isha, '', (await getDocument('fernwood')).duhr_sun, (await getDocument('fernwood')).juma],
		musjid_as_siddique: ['', (await getDocument('musjid_as_siddique')).fajr, '', '', (await getDocument('musjid_as_siddique')).duhr, (await getDocument('musjid_as_siddique')).asr, '', `${musjid_maghrib_time}`, (await getDocument('musjid_as_siddique')).isha, '', (await getDocument('musjid_as_siddique')).duhr_sun, (await getDocument('musjid_as_siddique')).juma],
		hilldrop: ['', (await getDocument('hilldrop')).fajr, '', '', (await getDocument('hilldrop')).duhr, (await getDocument('hilldrop')).asr, '', `${musjid_maghrib_time}`, (await getDocument('hilldrop')).isha, '', (await getDocument('hilldrop')).duhr_sun, (await getDocument('hilldrop')).juma],
	}

	//changing musjid_loaded
	musjid_loaded = true;
}
set_musjid_times()

document.querySelectorAll(".description-arrow").forEach((el) => {
	el.addEventListener("click", (e) => {

		if (el.classList.contains('description-arrow-left')) {
			if (description_index[index] > 0) {
				description_index[index] -= 1
				document.querySelectorAll('.detail-box')[index].querySelectorAll('.detail')[description_index[index]].scrollIntoView({ behavior: "smooth", block: "center" });
			}
		} if (el.classList.contains('description-arrow-right')) {
			if (description_index[index] < total_des - 1) {
				description_index[index] += 1
				document.querySelectorAll('.detail-box')[index].querySelectorAll('.detail')[description_index[index]].scrollIntoView({ behavior: "smooth", block: "center" });
			}
		}

		//checking if one of the arrows should be dim
		if (description_index[index] === 0) {
			document.querySelector('.description-arrow-left').style.opacity = '0.4';
		} else {
			document.querySelector('.description-arrow-left').style.opacity = '1';
		}

		if (description_index[index] === total_des - 1) {
			document.querySelector('.description-arrow-right').style.opacity = '0.4';
		} else {
			document.querySelector('.description-arrow-right').style.opacity = '1';
		}
	})
})

for (let i = 0; i < 10; i++) {
	document.querySelectorAll('.prayer-times .box')[i].addEventListener('click', () => {
		//hiding musjid section
		document.querySelector('.pop-up-musjids').classList.add('hidden-3');
		//changing description
		document.querySelectorAll('.detail-box').forEach((el) => {
			el.style.display = 'none';
		})

		index = i;
		total_des = document.querySelectorAll('.detail-box')[i].children.length;

		document.querySelectorAll('.detail-box')[i].style.display = 'flex';
		document.querySelectorAll('.detail-box')[i].querySelectorAll('.detail')[description_index[i]].scrollIntoView();

		//checking if one of the arrows should be dim
		if (description_index[index] === 0) {
			document.querySelector('.description-arrow-left').style.opacity = '0.4';
		} else {
			document.querySelector('.description-arrow-left').style.opacity = '1';
		}

		if (description_index[index] === total_des - 1) {
			document.querySelector('.description-arrow-right').style.opacity = '0.4';
		} else {
			document.querySelector('.description-arrow-right').style.opacity = '1';
		}

		//opening description and musjid times
		document.querySelector('.name').textContent = document.querySelectorAll('.prayer-times .box')[i].querySelector('.prayer-name-js').textContent;

		document.querySelector('.name').scrollIntoView()

		//showing pop-up
		if (!(document.querySelector('.pop-up-box').classList.contains('hidden-4'))) {
			document.querySelector('.pop-up-box').style.setProperty('--animation-startvar' ,`calc(${document.querySelectorAll('.prayer-times .box')[i].offsetTop - document.querySelector('.prayer-times').scrollTop}px + 58vw - 10dvh + var(--animation-height))`)/*in android and ios plus 50px or 48px*/
			document.querySelector('.pop-up-box').classList.add('show-pop-up-details');
		}
	})
}

const init_popup = function() {
	for (let i = 0; i < 10; i++) {
		document.querySelectorAll('.prayer-times .box')[i].addEventListener('click', async () => {
			if (i === 1 || i === 4 || i === 5 || i === 8 || i === 7 || i === 10) {
				//loading screen and showing
				if (!musjid_loaded) { await set_musjid_times() }

				document.querySelector('.musjids-loader').style.display = 'none';
				document.querySelector('.pop-up-musjids').classList.remove('hidden-3');

				for (let i2 = 0; i2 < 9; i2++) {
					//checking if a special duhr time should be used
					if (new Date().getDay() === 5 && i === 4) { //friday
						musjid_time = musjid_times[document.querySelectorAll('.musjid-box-big')[i2].classList[0]][11];
						musjid_time_to = musjid_times[document.querySelectorAll('.musjid-box-big')[i2].classList[0]][i];
					} else {
						if (
							new Date().getDay() === 0 ||
							((new Date().getDate() + '/' + new Date().getMonth()) === '1/0' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '21/2' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '18/3' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '21/3' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '27/3' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '28/3' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '1/4' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '16/5' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '9/7' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '24/8' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '16/11' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '25/11' ||
								(new Date().getDate() + '/' + new Date().getMonth()) === '26/11')
							&& i === 4
						) { //sunday and public holiday
							musjid_time = musjid_times[document.querySelectorAll('.musjid-box-big')[i2].classList[0]][10];
							musjid_time_to = musjid_times[document.querySelectorAll('.musjid-box-big')[i2].classList[0]][i];
						} else { //all other days //not special time
							musjid_time = musjid_times[document.querySelectorAll('.musjid-box-big')[i2].classList[0]][i];
							musjid_time_to = musjid_times[document.querySelectorAll('.musjid-box-big')[i2].classList[0]][i];
						}
					}

					if (musjid_time.toString() === '') {
						document.querySelectorAll('.musjid-box-big')[i2].classList.add('hidden-3');
					} else {
						document.querySelectorAll('.musjid-box-big')[i2].classList.remove('hidden-3');

						document.querySelectorAll('.musjid-box-big .prayer-time')[i2].textContent = musjid_time;
						get_time_to(musjid_time.split(":"), musjid_time_to.split(":"), document.querySelectorAll('.musjid-box')[i2].querySelector('.prayer-time-to'));
					}
				}
			} else {
				//hiding musjid section
				document.querySelector('.pop-up-musjids').classList.add('hidden-3');
			}
		})
	}
}
init_popup()

//hiding pop-up
document.querySelector('.pop-up-close').addEventListener('click', (el) => {
	document.querySelector('.pop-up-box').classList.remove('show-pop-up-details');
})