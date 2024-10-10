import "./user.css";
import { useState, useEffect } from "react";

export default function User() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bornDate, setBornDate] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserData(data);

        // Converti la data di nascita in un formato leggibile
        const data_nascita = new Date(data.results[0].dob.date);
        setBornDate(data_nascita.toLocaleDateString()); // Solo la data
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="user">
      <figure>
        <img src={userData.results[0].picture.large} alt="random-user" />
        <figcaption>
          {" "}
          <h2>
            {userData.results[0].name.first} {userData.results[0].name.last}
          </h2>
        </figcaption>
      </figure>
      <hr />
      <div className="gender">
        <h4>Sesso:</h4> <p>{userData.results[0].gender}</p>
      </div>

      <div className="location">
        <h4>Abitazione:</h4>{" "}
        <p>
          {userData.results[0].location.country},{" "}
          {userData.results[0].location.city}, {userData.results[0].location.street.name}{" "}
          {userData.results[0].location.street.number}
        </p>
      </div>

      <div className="born">
        <h4>Data di nascita:</h4>{" "}
        <p>
          {bornDate} (Età: {userData.results[0].dob.age})
        </p>
      </div>

      <div className="email">
        <h4>Email:</h4>{" "}
        <p>
        <a href={`mailto:${userData.results[0].email}`}>
          {userData.results[0].email}
        </a>
        </p>
      </div>

      <div className="cell">
        <h4>Numero di telefono:</h4>{" "}
        <p>
          <a href={`tel:${userData.results[0].cell}`}>
            {userData.results[0].cell}
          </a>
        </p>
      </div>

      <div className="registered">
        <p>
          joined on: {new Date(userData.results[0].registered.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
