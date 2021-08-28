/*-------------------------------------------Login Pop Function-----------------------------------------*/

async function enterInputLocation() {

	const locationPopUp = document.getElementById('locationPopUp');
	locationPopUp.style.display = "block";

}


function enterLocationPopup() {
	let location = document.getElementById('popUp');
	location.style.display = 'flex';

	let locationPage = document.getElementById('locationPopUp');

	location.append(locationPage);
}

let main_div = document.getElementById("appendLocation");

var timerId;

async function searchAddress() {
	let search = document.getElementById('inputLocation').value;

	if (search.length <= 2) {
		return false;
	}

	let res = await fetch(`https://discover.search.hereapi.com/v1/discover?at=52.5228,13.4124&q=${search}&apiKey=5hRUFGifPc_rP5CiJoq6c-7ZZyF3Ku7DG-cVwnGuobE`);
	let data = await res.json();

	return data.items;
}

function throttleFunction() {

	if (timerId) {
		return false;
	}
	timerId = setTimeout(() => {
		main();
		timerId = undefined;
	}, 1000);

}

function appendLocations(d) {
	main_div.innerHTML = null;
	d.forEach(({ address }) => {

		const div = document.createElement("div");
		div.classList.add("searchLocationResult");

		div.addEventListener('mouseover', () => {
			div.style.backgroundColor = "rgb(255, 211, 68)";
		});

		div.addEventListener('mouseout', () => {
			div.style.backgroundColor = "white";
		});


		let img = document.createElement("img");
		img.src = "/images/location.svg";

		let div2 = document.createElement('div');

		let city = document.createElement("p");
		city.classList.add("searchResultCity");
		city.innerText = address.label;

		let state = document.createElement("span");
		state.classList.add("searchResultState");

		state.innerText = address.state;

		let country = document.createElement("span");
		country.classList.add("searchResultCountry")
		country.innerText = address.countryName;

		div.addEventListener('click', () => {
			let locationInput = document.getElementById('locationInput');
			locationInput.value = address.label;
			locationInput.style.fontWeight = `bold`;
			closePopUp();
		});

		div2.append(city, state, country);

		div.append(img, div2);
		main_div.append(div);

	})
}

async function main() {
	let detail = await searchAddress();
	console.log(detail);
	if (detail.length != 0) {
		appendLocations(detail);
	} else {
		main_div.innerHTML = null;

		let div = document.createElement("div");
		div.innerText = "No results found!! Try again";

		main_div.append(div);
	}

}
