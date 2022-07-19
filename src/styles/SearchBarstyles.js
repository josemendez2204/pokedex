import styled from "styled-components"

export const SearchContainer = styled.div` 
position: relative;
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

export const SearchIcon = styled.button`
background: none ;
border:none;
`

export const SearchInput = styled.input`
border: none;
margin-left: 6px;
background:none ;
font-size: 15px;
width: 100%;
outline:none;
`;

export const Loader = styled.div`
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
export const FilterDiv = styled.div`
z-index: 1;
top:30px;
position: absolute;
display:flex;
background-color:rgba(255, 255, 255, 0.9);
height: auto;
width: 240px;
margin-top: 10px;
border-radius: 25px;
margin-top: 10px;
flex-direction: column;
justify-content: start ;

`
export const Li= styled.ul ` 
cursor: pointer
`  

;