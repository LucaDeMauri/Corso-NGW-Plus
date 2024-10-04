# Corso-NGW-Plus
<h2>ESERCIZIO WEEKEND</h2>
<hr>
La traccia richiedeva di creare un form di registrazione che stampasse i dati inseriti esattamente sotto il pulsante di submit. Tuttavia, ho deciso di aggiungere anche un form di Login.

Con questa aggiunta è sorto il problema della memorizzazione dei dati di registrazione. Non avendo ancora affrontato nel corso alcun linguaggio o tecnologia server-side, ho deciso di tenere traccia dei dati tramite il Local Storage del browser.

Infatti, con questa tecnica è possibile salvare i dati e creare una sorta di database utilizzando solo tecnologia client-side.

L'esercizio è stato testato solo su Chrome.

<h3>TEST</h3> <hr> Per verificare il funzionamento del codice, è sufficiente:
- Aprire i Developer Tools
- Cliccare sull'icona con due parentesi angolari affianco a Network
- Cercare la sezione Application e poi Local Storage
- Una volta registrati, qui dentro dovrebbe comparire dentro file:// l'array di elementi "users". Se non appare, significa che non ha funzionato.

<h3>ESITO FINALE</h3>
 <hr> 
 Se tutto funziona correttamente, dopo il Login dovrebbe apparire la scritta "Benvenuto" seguita da nome e cognome.