import { useEffect, useState } from 'react';

import './App.css';
import Card from './Components/Card/Card';
import Counter from './Components/Counter/Counter';
import Card_Deck from './Components/Card-Deck/Card_Deck';
import Info_Container from './Components/Info-Container/Info_Container';
import Info from './Components/Info/Info';
import Game from './Components/Sasso-Carta-Forbici/Game';
import PopUsa from './Components/PopUsa/PopUsa';
import University from './Components/University/University';
import User from './Components/random-user/user';


function App() {
  const [data, setData] = useState(null);
  const [eur, setEur]  = useState(0);
  const [gbp, setGbp]  = useState(0);
  const [usd, setUsd] = useState(0);
  const [eurcode, setEurcode]  = useState(0);
  const [gbpcode, setGbpcode]  = useState(0);
  const [usdcode, setUsdcode] = useState(0);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);



  // Funzione per recuperare i dati dal server
  useEffect(() =>{
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json') 
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUsd(data.bpi.USD.rate.substring(6, 0));
      setEur(data.bpi.EUR.rate.substring(6, 0));
      setGbp(data.bpi.GBP.rate.substring(6, 0));

      setUsdcode(data.bpi.USD.code);
      setEurcode(data.bpi.EUR.code);
      setGbpcode(data.bpi.GBP.code);

      const updateTime = new Date(data.time.updated);
      setTime(updateTime.toLocaleString());

    })
    .catch((error) => {
    console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
}, []);

  

if(isLoading){
  return <div>caricamento...</div>
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

        <Info_Container updateDate={time}>
            <Info 
              symbol={"$ "}
              rate={usd}
              code={usdcode}
            />
            <Info
              symbol={"£ "}
              rate={gbp}
              code={gbpcode}
            />
           <Info
              symbol={"€ "}
              rate={eur}
              code={eurcode}
            />
        </Info_Container>

      </div>

      <div className="Sasso-Carta-Forbici">
        <Game />
      </div>

      <div className="User">
        <User />
        </div>

        <div className="UniversityTable">
      <University />
      </div>
    </>
  );
}

export default App;
