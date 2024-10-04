# Corso-NGW-Plus
ESERCIZIO-WEEKEND
La traccia era quella di creare un form di registrazione che stampasse i dati inseriti esattamente sotto il pulsante di submit,
ma, in più, ho voluto inserire anche un form di Login.

Con questa aggiunta è sorto il problema della memorizzazione dei dati di rigistrazione e, a questo scopo, non avendo ancora affrontato nel corso alcun inguaggio o tecnologia server-side, ho deciso di tener traccia dei dati tramite il localstorage del browser.

Infatti con questa tecnica è possibile salvare i dati e creare una sorta di DB utilizzando solo tecnologia Client-side.

L'esercizio è stato testato solo su chrome.

<h3>TEST</h3>
<hr>

per verificare il funzionamento del codice basterà:
- aprire i developer tool
- cliccare le due parentesi angolate affianco a Network
- cercare application e poi Local Storage
- qui dentro una volta registrati dovrebbre comparire l'array di elementi users, se non appare vuol dire che non ha funzionato

<h3>ESITO FINALE</h3>
<hr>

se tutto va bene dopo il Login dovrebbe apparire la scritta Benvenuto e sotto nome e cognome