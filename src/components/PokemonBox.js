import React, { useState } from 'react'
import styled from "styled-components"

const Pokemonbox= styled.div`
margin-top: 60px;
width: 240px ;
height: 300px ;
background: white ;
display:flex;
align-items:center;
align-content:center;
border-radius: 10px;
`;

export default function PokemonBox() {
  return (
    <Pokemonbox></Pokemonbox>
  )
}
