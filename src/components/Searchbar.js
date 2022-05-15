import React, { useState, Fragment } from 'react'
import styled from "styled-components"
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import PokemonBox from './PokemonBox';

const SearchContainer= styled.div`
width: 230px;
height: 25px;
background: white ;
border: 2px solid black;
border-radius: 50px;
position: relative;
display:flex;
align-items:center;

&:hover {
  box-shadow: 5px 10px #888888;
}
`;

const SearchIcon= styled.button`
background: none ;
border:none;
`

const SearchInput= styled.input`
border: none;
margin-left: 6px;
background:none ;
font-size: 15px;
width: 100%;
outline:none;
`;

function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [jsonResponse, setJsonResponse] = useState("");
  const [dinamic, setDinamic]= useState(true);
  const url= `https://pokeapi.co/api/v2/pokemon/${inputValue}`

  const keyPress= (event) => {
    if(event.key === 'Enter'){
    if (inputValue === "") {
     return false
    }
    const apiFetch= async () => {
    const response= await fetch (url);
    if (response.status >= 200 && response.status <= 299) {
    const responseJSON= await response.json();
    setJsonResponse (responseJSON) 
    } else {
    setJsonResponse (false)
    }
    
  }
  apiFetch()
  console.log(jsonResponse)
  setDinamic (false)
  }
  }
  return (
    <Fragment>
    <SearchContainer>
      <SearchIcon>
        {inputValue.length <= 0 ? (
          <AiOutlineSearch size={20} />
        ) : (
          <AiOutlineCloseCircle onClick={() => setInputValue("") } size={20} />
        )}
      </SearchIcon>

      <SearchInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={keyPress}
      />
    </SearchContainer>
    <div> {dinamic ? null : (<PokemonBox jsonResponse= {jsonResponse}   />)} </div>
    </Fragment>
  );
}

export default Searchbar