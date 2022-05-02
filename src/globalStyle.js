import { createGlobalStyle } from "styled-components";


const GlobalStyles= createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Alef&family=Marck+Script&display=swap');

* {
    margin-top: 4px; 
}

body{
    background-color: rgba(97, 160, 212, 0.8);
    display: flex;
    justify-content: center;
    font-family: 'Alef', sans-serif;
}
`; 

export default GlobalStyles