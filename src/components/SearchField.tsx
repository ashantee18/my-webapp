import styled from 'styled-components';
import { IconButton, TextField } from "@mui/material";

export const SearchField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#FFFFFF',
  },
  '& label': {
    color: '#FFFFFF',
  },
  '& .MuiOutlinedInput-input':{
    color:'#FFFFFF'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#7395AE',
    },
    '&:hover fieldset': {
      borderColor: '#7395AE',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7395AE',
      borderLeftWidth: 6,
    },
  },
});

export const SearchBar = styled.div`
  text-align: center;
  width: 60%;
  margin: 0 auto;
  display:grid;
`;

export const SearchIcon = styled(IconButton)`
  color:#fff!important;
`;