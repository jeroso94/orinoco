
const inputFullName = document.getElementsByClassName('fullName');

const logFirstName = document.getElementById('logFirstName');
const logLastName = document.getElementById('logLastName');
//const logAddress = document.getElementById('logAddress');
//const logEmail = document.getElementById('logEmail');

console.log(inputFullName);

for (const element of inputFullName) {
    console.log(element);
    element.addEventListener('input', function(e) {	
        let value = e.target.value;
        
        if (!isValid(value)) value = "invalide :'(";           
        if (element.name == 'firstName') logFirstName.textContent = value;
        if (element.name == 'lastName') logLastName.textContent = value;
        console.log(value);
        console.log(isValid(value));
    });	
}

/* RegEx pour Prénom, Nom */	
function isValid(value) {	
	return /^[\w][\D][^²&"#\(\)\[\|\]^@°\{\}\+\=\/.*µ¤$£€%§!:;,?¨\^]{0,128}$/gi.test(value);
}	
