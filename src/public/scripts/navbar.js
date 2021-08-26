let displayName = document.getElementById('userName');
let user = JSON.parse(localStorage.getItem('loggedUser'));

displayName.innerText = `Hi ${user.name}`;

let navLocation = document.getElementById("navLocation");
navLocation.innerHTML = `<p>${localStorage.getItem("location")}</p><p>${localStorage.getItem("location")}</p>`


let headingLocation = document.getElementById("headingLocation");
if (headingLocation) {
	headingLocation.innerText = `${localStorage.getItem("location")}`;
}