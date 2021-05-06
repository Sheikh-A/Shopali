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
        <button className="blackButtonDog" onClick={() => setBreed("husky")}>SF Huskies</button>
        <button className="blackButtonDog" onClick={() => setBreed("pug")}>AMS Pugs</button>
        <button className="blackButtonDog" onClick={() => setBreed("mix")}>HKG Mix</button>
      </div>
      <div className="petentry">
        {pets.map((pet, index) => {
          return <PetCard key={index} imgUrl={pet} breed={breed} />;
        })}
      </div>
    </div>
  );
}
