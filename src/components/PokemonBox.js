import React from 'react'
import styled from "styled-components"

const Pokemonbox= styled.div`
margin-top: 60px;
width: 240px ;
height: 370px ;
background: white ;
display:flex;
flex-direction: column;
align-items:center;
align-content:center;
border-radius: 10px;
border-style: solid;
`;

const Notfound= styled.div `
margin-top: 60px;
width: 240px ;
background-color: white ;
border-radius: 10px;
border-style: solid;
`;

export default function PokemonBox(props) {
  
  if(props.jsonResponse) {
    return (
      <Pokemonbox>
      <div><img src={props.jsonResponse.sprites.front_default} alt="pokemon" width="150" height="150"/></div> 
       <h2>{props.jsonResponse.name}</h2>
       <h5>Weight</h5>
       {props.jsonResponse.weight}
      <br/>
      <br/>
      <h5>Height</h5>
      {props.jsonResponse.height}
      </Pokemonbox>) } 
  else {
    return (
  <Notfound><h4>Something happened, pokemon not found...</h4></Notfound>
      ) }
}

