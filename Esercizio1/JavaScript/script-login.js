document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let  email = document.getElementById("email").value;
    let  password = document.getElementById("password").value;

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

    passwordHashata = CryptoJS.SHA256(password).toString();

    let users = JSON.parse(localStorage.getItem('users')) || [];


    try{
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === passwordHashata) {
            document.getElementById("message").style.color = "green";
            document.getElementById("message").innerText = users[i].nome + " " + users[i].cognome;
            document.getElementById("benvenuto").innerText = "Benvenuto";
            window.location.href = "./esercizio1.html";
            return;
        }
        else{
            document.getElementById("message").style.color = "red";
            document.getElementById("message").innerText = "password o email errate";
        }
    }
    }
    catch(err){
        console.log(err);
    }

})

document.getElementById("mostra").addEventListener("click", function() {
    let password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }


})