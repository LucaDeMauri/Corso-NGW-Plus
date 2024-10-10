import "./University.css"
import { useEffect, useState } from 'react';

export default function University () {

    const[universityData, setUniversityData] = useState([]);
    const[isLoading, setIsLoading] = useState(true);


    useEffect(() =>{
        fetch('http://universities.hipolabs.com/search?country=United+States') 
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUniversityData(data);
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
        <div className="University">
           <table>
               <thead>
                   <tr>
                       <th>Country</th>
                       <th>domanins</th>
                       <th>name</th>
                       <th>web_pages</th>
                   </tr>
               </thead>
               <tbody>
                       {universityData.map((el, index) => (
                           <tr key={index}>
                               <td>{el.country}</td>
                               <td>{el.domains[0]}</td>
                               <td>{el.name}</td>
                               <td>{<a href={el.web_pages[0]} target="_blank">{el.web_pages[0]}</a>}</td>
                           </tr>
                       ))}
               </tbody>
           </table>
        </div>
    )
}