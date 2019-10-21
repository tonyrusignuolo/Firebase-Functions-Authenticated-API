auth.onAuthStateChanged(user => {
	if (user) {
		console.log("Signed In");
		// console.log(user);
		auth.currentUser.getIdToken().then(token => {
			console.log(token);
		});
	}
	else {
		console.log("Logged Out");
	}
});

let signupForm = document.querySelector("#signup");
signupForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let email = signupForm['email'].value;
	let password = signupForm['password'].value;
	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		console.log(cred);
	});
	signupForm.reset();
});

let signinForm = document.querySelector("#signin");
signinForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let email = signinForm['email'].value;
	let password = signinForm['password'].value;
	auth.signInWithEmailAndPassword(email, password).then(cred => {
		console.log(cred);
	});
	signinForm.reset();
});

let logout = document.querySelector("#logout");
logout.addEventListener('click', (e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		console.log('user logged out');
	});
});