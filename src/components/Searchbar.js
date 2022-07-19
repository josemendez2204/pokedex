import React, { useState, Fragment, useEffect, useRef } from 'react'
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import PokemonBox from './PokemonBox';
import { motion } from "framer-motion";
import Axios from 'axios';
import {SearchContainer, SearchIcon, SearchInput, Loader, FilterDiv, Li} from '../styles/SearchBarstyles';




function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [jsonResponse, setJsonResponse] = useState("");
  const [dinamic, setDinamic] = useState(true);
  const [loader, setLoader] = useState(false);
  const [arrayOfNames, setArrayOfNames] = useState([]);
  const [showOptions, setShowOptions]= useState (false)

  const removeCaseSensitive = inputValue;
  const remover = removeCaseSensitive.toLowerCase(); //this const store whatever we write in the input and trsnform it to lower case
  const url = `https://pokeapi.co/api/v2/pokemon/${remover}`;
  const input1 = useRef(null)

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

  
  const handleClick1 = () => {
    input1.current.focus();
  }; 

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
  const handleOnchange = async (e) => {
    setInputValue(e.target.value)
    setShowOptions(true)
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
          onChange={handleOnchange}
          onKeyPress={keyPress}
          ref={input1}
        />
       {
        (inputValue.length > 0 && showOptions) 
          && <FilterDiv>
            {arrayOfNames
            .filter((l) => l.name.startsWith(remover)).slice(0, 6)
            .map((arrayOfNames) => (
              <Li 
                onClick={ () =>{
                  setInputValue(arrayOfNames.name)
                  setShowOptions(false)
                  handleClick1()
                  }}
                key={arrayOfNames.id}
                
              >
                {arrayOfNames.name}
              </Li>
            ))}
            </FilterDiv> 

      }
      </SearchContainer>
      {loader ? <Loader /> : dinamic || <motion.div
        initial={{ scale: 0.1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 1 }}> <div><PokemonBox jsonResponse={jsonResponse} /></div> </motion.div>}
    </Fragment>
  );
}
//here is where we render the response of the api into the searchContainer component ^^^
export default Searchbar