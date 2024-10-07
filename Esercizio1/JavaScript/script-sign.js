
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let nome = document.getElementById("nome").value;
    let cognome = document.getElementById("cognome").value;

    let messageDiv = document.getElementById("message");

    // Controlla se l'email è vuota
    if (!email) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Per favore, inserisci un'email.";
        return;
    }
    if (!password) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Per favore, inserisci una password.";
        return;
    }
    if (!nome) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Per favore, inserisci il tuo nome.";
        return;
    }
    if (!cognome) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Per favore, inserisci il tuo cognome.";
        return;
    }
    

     // Hash della password usando SHA-256, per dare all'esercizio una parvenza di professionalità
     const passwordHashata = CryptoJS.SHA256(password).toString();//CryprtoJS restituisce un oggetto wordarray
                                                                  // utilizzando il metodo .toString, invece, lo converto in un valore esadecimale

    //da notare che toString() restituisce un valore esadecimale solo nel caso di wordarray, nel resto dei casi restituisce una stringa normale

     const user = {
         nome: nome,
         cognome: cognome,
         email: email,
         password: passwordHashata,  
     };

     // tramite questa riga di codice non faccio altro che convertire la stringa json in un array di oggetti js
     let users = JSON.parse(localStorage.getItem('users')) || [];/*l'operatore logico OR mi serve perché la prima volta users
                                                                    non è ancora creato e il localstorage di default è un json vuoto*/

     // a questo punto aggiungo il nuovo utente all'array users, che non è altro che un array di utenti e quindi di oggetti
     users.push(user);

     // infine salvo l'array di oggetti users nel localstorage convertendolo in json
     localStorage.setItem('users', JSON.stringify(users));

     //una cosa da notare è che ogni volta reinserisco completamente l'oggetto users nel localstorge, invece di aggiungere semplicemente un altro user

     
     document.getElementById("message").style.color = "green";
     document.getElementById("message").innerText = "Registrazione avvenuta con successo";
     
   
     document.getElementById("signupForm").reset();

});

document.getElementById("mostra").addEventListener("click", function() {
    let password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
})