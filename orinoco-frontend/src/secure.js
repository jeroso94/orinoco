

// FONCTION GLOBALE - Gestion de la saisie utilisateur
export default function userInputsChecking() {
    const inputFullName = document.getElementsByClassName('fullName');
    const inputEmail = document.getElementById('email');
    const inputAddress = document.getElementById('address');
    const inputCity = document.getElementById('city');

    const logEmail = document.getElementById('logEmail');
    const logFirstName = document.getElementById('logFirstName');
    const logLastName = document.getElementById('logLastName');
    const logAddress = document.getElementById('logAddress');
    const logCity = document.getElementById('logCity');
    
    console.log(inputFullName);
    
    inputEmail.addEventListener('input', function(e) {
        const catchedValue = e.target.value;
        logEmail.textContent = catchedValue;
        if (!isValidEmail(catchedValue)) logEmail.textContent = "invalide :'(";
    })

    for (const element of inputFullName) {
        console.log(element);
        element.addEventListener('input', function(e) {	
            let catchedValue = e.target.value;
            
            if (element.name == 'firstName') {
                logFirstName.textContent = catchedValue;
                if (!isValidFullName(catchedValue)) logFirstName.textContent = "invalide :'(";
            }
            if (element.name == 'lastName') {
                logLastName.textContent = catchedValue;
                if (!isValidFullName(catchedValue)) logLastName.textContent = "invalide :'(";
            }
        });	
    }

    inputAddress.addEventListener('input', function(e) {
        const catchedValue = e.target.value;
        logAddress.textContent = catchedValue;
        if (!isValidAddress(catchedValue)) logAddress.textContent = "invalide :'(";
    })

    inputCity.addEventListener('input', function(e) {
        const catchedValue = e.target.value;
        logCity.textContent = catchedValue;
        if (!isValidCity(catchedValue)) logCity.textContent = "invalide :'(";
        if (logCity.textContent == "invalide :'(" || logAddress.textContent == "invalide :'(" || logLastName.textContent == "invalide :'(" || logFirstName.textContent == "invalide :'(" || logEmail.textContent == "invalide :'("){            
            document.getElementById('toValidateOrder').disabled = true ;
        } else {
            document.getElementById('toValidateOrder').disabled = false;
        }  
    })

    // RegEx pour Prénom, Nom
    function isValidFullName(value) {	
	    return /^[\w][\D][^²&"#\(\)\[\|\]^@°\{\}\+\=\/.*µ¤$£€%§!:;,?¨\^]{0,128}$/gi.test(value);
    }	

    // RegEx pour Email
    function isValidEmail(value) {	
        // Thanks to https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        return /\S+@\S+\.\S+/gi.test(value);
    }

    // RegEx pour Adresse
    function isValidAddress(value) {	
        return /(^[0-9]{0,3})([\s\-][a-z]{3,6})*\s([a-z]{3,10})\s([a-z0-9\-\s\'][^²&"#\(\)\[\|\]^@°\{\}\+\=\/.*µ¤$£€%§!:;,?¨\^]{0,128})/gi.test(value);
    }

    // RegEx pour Ville
    function isValidCity(value) {	
        return /^[\w][\D][^²&"#\(\)\[\|\]^@°\{\}\+\=\/.*µ¤$£€%§!:;,?¨\^]{0,128}$/gi.test(value);
    }
}
