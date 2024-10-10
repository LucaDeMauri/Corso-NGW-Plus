import "./PopUsa.css"
import { useEffect, useState } from 'react';

export default function PopUsa () {

    const[usaData, setUsaData] = useState([]);
    const[isLoading, setIsLoading] = useState(true);


    useEffect(() =>{
        fetch('https://datausa.io/api/data?drilldowns-Nation&measures=Population') 
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUsaData(data.data);
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
        <div className="Usa">
           <table>
               <thead>
                   <tr>
                       <th>Country</th>
                       <th>Population</th>
                   </tr>
               </thead>
               <tbody>
                       {usaData.map((el) => (
                           <tr jey={el.Year}>
                               <td>{el.Year}</td>
                               <td>{el.Population}</td>
                           </tr>
                       ))}
               </tbody>
           </table>
        </div>
    )
}