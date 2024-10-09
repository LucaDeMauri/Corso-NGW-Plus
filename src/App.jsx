import { useEffect, useState } from 'react';

import './App.css';
import Component from './Component';
import Card from './Components/Card/Card';
import Counter from './Components/Counter/Counter';
import Card_Deck from './Components/Card-Deck/Card_Deck';
import Info_Container from './Components/Info-Container/Info_Container';
import Info from './Components/Info/Info';
import Game from './Components/Sasso-Carta-Forbici/Game';

function App() {
  const [data, setData] = useState(null); /*data: è la variabile di stato corrente.
                                            setData: è la funzione che aggiorna il valore di state.
                                            useState: è il valore iniziale dello stato.*/

  // Funzione per recuperare i dati dal server
  async function fetchDataBitcoin(API) {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setData(data); // Imposto i dati nello stato
    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  }

  // useEffect serve (da quello che ho capito) a effettuare le funzioni
  useEffect(() => { //(() => { funzione da eseguire })

    fetchDataBitcoin('https://api.coindesk.com/v1/bpi/currentprice.json');

    
  }, []); // []); non ho capito a che serve, ma se c'è vuol dire che la funzione verrà eseguita una sola volta


  if (!data || !data.bpi) {//per qualche motivo senza questo controllo non mi funziona, è come se l'async non andasse
    return <div>Caricamento...</div>;
  }


  return (
    <>

    
      <Card_Deck>
        <Card title={"titolo1"} description={"descrizione1"} />
        <Card title={"titolo2"} description={"descrizione2"} />
        <Card title={"titolo3"} description={"descrizione3"} />
        <Card title={"titolo4"} description={"descrizione4"} />
      </Card_Deck>

      <div className="middle-page">
        <Counter />

        <Info_Container updateDate={data.time.updated}>
            
            <Info /* visto che prima tramite useeffect ho chiamato la funzione fetchDataBitcoin
                    che ha preso i dati dal server e li ha impostati sullo stato data, ora data
                    è la risposta della fetch, perciò basta navigarla come con javascript normale */
              symbol={"$ "}
              rate={data.bpi.USD.rate.substring(6, 0)}
              code={data.bpi.USD.code}
            />

            <Info
              symbol={"£ "}
              rate={data.bpi.GBP.rate.substring(6, 0)}
              code={data.bpi.GBP.code}
            />

           <Info
              symbol={"€ "}
              rate={data.bpi.EUR.rate.substring(6, 0)}
              code={data.bpi.EUR.code}
            />
          
        </Info_Container>
      </div>
      <div className="Sasso-Carta-Forbici">
        <Game />
      </div>
    </>
  );
}

export default App;
