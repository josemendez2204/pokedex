import React, { Fragment } from 'react'
import PokemonBox from './components/PokemonBox'
import Searchbar from './components/Searchbar'
import GlobalStyles from './globalStyle'
function App() {
  return (
    <Fragment>
      <GlobalStyles/>
      <Searchbar/>
      <PokemonBox/>
    </Fragment>
    
  )
}

export default App