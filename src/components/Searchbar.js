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

const Loader= styled.div `
  margin-top: 60px;
  margin-left:60px ;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid black;
  border-bottom: 16px solid black;
  width: 90px;
  height: 90px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;



function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [jsonResponse, setJsonResponse] = useState("");
  const [dinamic, setDinamic]= useState(true);
  const [loader, setLoader]= useState (false);
  const removeCaseSensitive = inputValue;
  const remover= removeCaseSensitive.toLowerCase();
  const url= `https://pokeapi.co/api/v2/pokemon/${remover}`

  const keyPress= (event) => {
    if(event.key === 'Enter'){
    if (inputValue === "") {
     return false
    }
    const apiFetch= async () => {
    setLoader (true)
    const response= await fetch (url);
    if (response.status >= 200 && response.status <= 299) {
    const responseJSON= await response.json();
    setLoader (false)
    setJsonResponse (responseJSON) 
     } else {
    setLoader (false)
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
        value={remover}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={keyPress}
      />
    </SearchContainer>
    {loader ? <Loader/> : dinamic || (<div><PokemonBox jsonResponse= {jsonResponse}   /></div>)}
    </Fragment>
  );
}
export default Searchbar