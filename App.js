const myForm = document.getElementById('myForm');
const ulList = document.getElementById('ulList');
const sortBtn = document.getElementById('sortBtn');
const resetBtn = document.getElementById('resetBtn');
const alertList = document.getElementsByClassName('alert');
const showHidePassword = document.getElementById('showHidePassword');
const showHideRePassword = document.getElementById('showHideRePassword');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');

const list = [];
let editableItem = null;

sortBtn.addEventListener('click', sort);
resetBtn.addEventListener('click', () => {
	myForm.reset();
});
myForm.addEventListener('submit', send);
myForm.addEventListener('input', () => {
	document.getElementById('errorMesage').innerHTML = '';
});
showHidePassword.addEventListener('click', function () {
	showHide(password, showHidePassword);
})
showHideRePassword.addEventListener('click', function () {
	showHide(rePassword, showHideRePassword);
})

function send(e) {
	const validation = validate();
	if (validation) return;
	const item = {
		name: name.value,
		email: email.value,
		password: password.value
	};
	if (editableItem == null) {
		list.push(item);
	} else {
		list.splice(editableItem, 1, item);
		editableItem = null;
	}
	showList();
	myForm.reset();
}

function showList() {
	let ele = '';
	list.forEach((item, index) => {
		ele += `
		<li>
		  <div>
		    <div>Name: ${item.name}</div>
		    <div>Email: ${item.email}</div>
		  </div>
			<div class='buttons'>
			  <span><button class='del-btn' onclick='deleteItem(${index})'>Delete</button></span>
			  <span><button class='edit-btn' onclick='editItem(${index})'>Edit</button></span>
			</div>
		</li>
		`;
	})
	ulList.innerHTML = ele;
}

function deleteItem(index) {
	list.splice(index, 1);
	showList()
}

function editItem(index) {
	name.value = list[index].name;
	email.value = list[index].email;
	password.value = list[index].password;
	rePassword.value = list[index].password;
	editableItem = index;
}

function sort() {
	list.sort(function (a, b) {
		let x = a.name.toLowerCase();
		let y = b.name.toLowerCase();
		if (x < y) { return -1; }
		if (x > y) { return 1; }
		return 0;
	});
	showList();
}


function validate() {
	if (name.value == "") {
		document.getElementById('errorMesage').innerHTML = "Name is reuired";
		name.focus();
		return true;
	}
	if (name.value.length < 3) {
		document.getElementById('errorMesage').innerHTML = "Name is short";
		name.focus();
		return true;
	}
	if (email.value == "") {
		document.getElementById('errorMesage').innerHTML = "Email is reuired";
		email.focus();
		return true;
	}
	const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!emailPattern.test(email.value)) {
		document.getElementById('errorMesage').innerHTML = "Email is invalid";
		email.focus();
		return true;
	}
	if (password.value == "") {
		document.getElementById('errorMesage').innerHTML = "Password is reuired";
		password.focus();
		return true;
	}
	if (rePassword.value == "") {
		document.getElementById('errorMesage').innerHTML = "Comfirm Password is reuired";
		rePassword.focus();
		return true;
	}
	if (password.value !== password.value) {
		document.getElementById('errorMesage').innerHTML = "Comfirm Password not match";
		password.focus();
		return true;
	}
	const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	if (!passwordPattern.test(password.value)) {
		document.getElementById('errorMesage').innerHTML = "Password is weak";
		password.focus();
		return true;
	}
	return false;
}


function showHide(element, showHidePassword) {
	if (element.type === 'password') {
		element.type = 'text';
		showHidePassword.innerHTML = 'Hide';
	} else {
		element.type = 'password';
		showHidePassword.innerHTML = 'Show';
	}
}


