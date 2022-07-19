import React from 'react'
import { Pokemonbox, Notfound } from '../styles/PokemonBox'



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

