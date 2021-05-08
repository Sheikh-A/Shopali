import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import axios from "axios";

export default function PetGrid() {
  const [pets, setPets] = useState([]);
  const [breed, setBreed] = useState("husky"); //use on useEffect

  useEffect(() => {
    axios
      .get(`https://dog.ceo/api/breed/${breed}/images/random/8`)
      .then((response) => {
        setPets(response.data.message);
      })
      .catch((error) => {
        console.log("no dogs", error);
      });
  }, [breed]);
  return (
    <div className="petcontainer">
      <div>
        <button className="blackButtonDog" onClick={() => setBreed("husky")}>Huskies</button>
        <button className="blackButtonDog" onClick={() => setBreed("pug")}>Pugs</button>
        <button className="blackButtonDog" onClick={() => setBreed("mix")}>Mix</button>
        <button className="blackButtonDog" onClick={() => setBreed("pitbull")}>Pitbull</button>
        <button className="blackButtonDog" onClick={() => setBreed("labrador")}>Labrador</button>
        <button className="blackButtonDog" onClick={() => setBreed("lhasa")}>Lhasa</button>
      </div>
      <div className="petentry">
        {pets.map((pet, index) => {
          return <PetCard key={index} imgUrl={pet} breed={breed} />;
        })}
      </div>
    </div>
  );
}
