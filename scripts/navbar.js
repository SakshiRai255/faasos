let displayName = document.getElementById('userName');
let user = JSON.parse(localStorage.getItem('loggedUser'));

displayName.innerText = `Hi ${user.name}`;
