import { styled, TextField } from "@mui/material";

const SearchField = styled(TextField)({
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

export default SearchField;