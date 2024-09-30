import React, { useEffect, useState } from 'react';
import './style.css';

//Det här är childkomponenten tar emot informarmation i ett objekt och läser information. Sedan med hjälp av en arrow funktion skickar, returnerar och manipulerar den  parametern som den tar emot, och returnerar den varje gång funktionen kallas på.
export const MovieDetails = ({ movie }) => {
  return (
    <div>
      <div>Title: {movie.title}</div>
      <div>Episode id: {movie.episode_id}</div>
      <div>Director: {movie.director}</div>
      <div>Producer: {movie.producer}</div>
      <div>Release date: {movie.release_date}</div>
      <div>Opening Crawl: {movie.opening_crawl}</div>
    
    </div>
  );
};
//App är parent komponenten som styr alla andra komponenter
export default function App() {
  const [loader, setLoader] = useState(true);
  const [films, setFilms] = useState([]);
  const [title, setTitle] = useState('');
  const [foundArray, setFoundArray] = useState([]);
  const [findStatus, setFindStatus] = useState('Sök på en film');

  useEffect(() => { //Använder mig av react hooken för att hämta data från API:et. 
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFilms(data.results);
        setLoader(false);
      })
      .catch((err) => {
        console.error(err); //Om något går fel skrivs det "error" i consolen.
      });
  }, []);
//Händelsehanterare för inputfältet
  const searchHandler = (event) => {
    setTitle(event.target.value);
  };

//Händelsehanterare för knapp.
//När knappen klickas på filtreras datan för filmer och om titeln man skriver in är titeln på någon av filmerna från API:et då ska filmen och information skickas ut som reslutat.
  const searchClickHandler = () => {
    let result = films.filter((item) => {
      if (item.title.toLowerCase() === title.toLowerCase()) {
        return item;
      }
    });
//Om resultaten för filmen inte mathcar datan i arrayen skickas det ut ett felmeddelande.
    if (result.length === 0) {
      setFindStatus("Filmen finns gick inte att hitta, prova en gång till.");
      setFoundArray([]);
    } else {
      setFoundArray(result);
      setFindStatus(null);
    }   //Om filmen matchar resultatet i arrayen returneras filmen från filmarrayern.
  };


  //Väntar på att att API:et laddas. När den laddas står det "loading" när den har slutat laddas körs koden nedan.
  return loader ? (
    <div>Loading</div>
  ) : (
    //Lägger till onChange event och sätter värdet till title.
              //Lägger till onClick event till knappen. När knappen klickas på körs eventet.
    <div>
      <h1>Filmer</h1>
      <input type="" value={title} onChange={searchHandler} />
      <button disabled={films?.length === 0} onClick={searchClickHandler}>
        Visa film
      </button>
     
      {foundArray.length > 0 ? ( //Om arrayerns längd är större än 0, körs mapfunktionen nedan.

        //Använder mig av map metoden för att hitta och "ropa på" varje element i arrayern som sedan returnerar filmen och  information om filmen.
        foundArray.map((item) => {
          return <MovieDetails movie={item} />; 
        //Här används callback funktionen som tar emot parametrar i från objektet i MovieDetails för att sedan visa detaler för varje film.
        })
      ) : (
        <div>{findStatus}</div>//Om filmen inte går att hitta anropas setFindSatus funktionen och meddelande skickas ut.
      )}
    </div>
  );
}
