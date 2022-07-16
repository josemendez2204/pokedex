import React, { useState, Fragment, useEffect } from 'react'
import styled from "styled-components"
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import PokemonBox from './PokemonBox';
import { motion } from "framer-motion";
import Axios from 'axios';

//the styled components
const SearchContainer = styled.div` 
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

const SearchIcon = styled.button`
background: none ;
border:none;
`

const SearchInput = styled.input`
border: none;
margin-left: 6px;
background:none ;
font-size: 15px;
width: 100%;
outline:none;
`;

const Loader = styled.div`
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
const FilterDiv = styled.div`
display:flex;
background-color:rgba(255, 255, 255, 0.5);
height: auto;
width: 240px;
margin-top: 10px;
border-radius: 25px;
margin-top: 10px;
flex-direction: column;
justify-content: start ;

`
const Li= styled.ul ` 
list-style-image: url (/pnwing.com.png)
`  

;



function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [jsonResponse, setJsonResponse] = useState("");
  const [dinamic, setDinamic] = useState(true);
  const [loader, setLoader] = useState(false);
  const [arrayOfNames, setArrayOfNames] = useState([])
  const [openclose, setOpenclose]= useState (true)

  const removeCaseSensitive = inputValue;
  const remover = removeCaseSensitive.toLowerCase(); //this const store whatever we write in the input and trsnform it to lower case
  const url = `https://pokeapi.co/api/v2/pokemon/${remover}`;

  // event that trigger the API call and the dynamism
  const keyPress = (event) => {
    if (event.key === 'Enter') {
      if (inputValue === "") {
        return false
      } 
      const apiFetch = async () => {
        try {
          setLoader(true)
          const response = await Axios.get(url);
          console.log(response.status)
          setLoader(false)
          setJsonResponse(response.data)
          setInputValue ("")
        } catch (error) {
          setLoader(false)
          setJsonResponse(false)
          console.log("something happened...")
        }
       
      }
      apiFetch()
      console.log(jsonResponse)
      setDinamic(false)
    }
  }
 
  const autocompletedExecution = async () => {
    try {
      setLoader(true)
      const response = await Axios.get(url);
      console.log(response.status)
      setLoader(false)
      setJsonResponse(response.data)
      setInputValue ("")
    } catch (error) {
      setLoader(false)
      setJsonResponse(false)
      console.log("something happened...")
    }
  
  }
 

  const arrayOfNamesObj= async () => {
    try {
      const { data } = await Axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );

      if (!data) return;

      const results = data.results;

      const arrayId = results.map((val, index) => ({
        id: index++,
        name: val.name
      }));

      setArrayOfNames(arrayId);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
  arrayOfNamesObj()
  },[])

  console.log(arrayOfNames)
  const filtering = async (e) => {
    setInputValue(e.target.value)
  }

  return (
    <Fragment>
      <SearchContainer>
        <SearchIcon>
          {inputValue.length <= 0 ? (
            <AiOutlineSearch size={20} />
          ) : (
            <AiOutlineCloseCircle onClick={() => setInputValue("")} size={20} />  //this ternary is the loupe and x icon
          )}
        </SearchIcon>

        <SearchInput
          value={remover}
          onChange={filtering}
          onKeyPress={keyPress}
        />

      </SearchContainer>
      {(inputValue <= 0) ? openclose : openclose && <FilterDiv>{
      arrayOfNames
          .filter((l) => l.name.startsWith(remover)).slice(0, 6)
          .map((arrayOfNames) => (
            <Li onClick={ () => {
              setInputValue(arrayOfNames.name)
              setOpenclose(!openclose)
            }} key={arrayOfNames.id}>{arrayOfNames.name}</Li>
          ))}</FilterDiv> }
      {loader ? <Loader /> : dinamic || <motion.div
        initial={{ scale: 0.1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 1 }}> <div><PokemonBox jsonResponse={jsonResponse} /></div> </motion.div>}
    </Fragment>
  );
}
//here is where we render the response of the api into the searchContainer component ^^^
export default Searchbar