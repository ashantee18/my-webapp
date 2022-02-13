import { Box, Container, FormControl, IconButton, Modal, Typography } from "@mui/material";
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { actionGetReadme, actionGetRepositories } from "../modules/actions";
import { getReadmeSelector, getRepoSelector } from "../selector";
import SearchField from "../components/SearchField";
import { Base64 } from "js-base64";

const CustomContainer = styled.div<{ displayState: boolean }>`
  margin: 0 auto;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-out;
  height: ${(props: any) => props.displayState ? "40vh" : "100vh"};
  transition: all 0.3s ease-out;
  background-color:#557A95;
`;
const ProjectContainer = styled.div`
  margin-top: 40px;
  text-align: center;
  cursor: pointer;
`;
const SearchBar = styled.div`
  text-align: center;
  width: 60%;
  margin: 0 auto;
  display:grid;
`;

const SearchIcon = styled(IconButton)`
  color:#fff!important;
`;

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  maxHeight: '80%',
};


export const Main: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [repository, setRepoName] = useState('');
  const [displayState, setDisplayState] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [decode, setEncode] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const list = useSelector(getRepoSelector);
  const readme = useSelector(getReadmeSelector);

  const element = document.getElementById("modal-modal-description");

  useEffect(() => {
    const decodeString = Base64.atob(readme);
    setEncode(decodeString);
  },[readme])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setDisplayState(true);
      onClickSearch();
    } else {
      setDisplayState(false);
    }
  }

  const onClickSearch = () => {
    setDisplayState(true);
    dispatch(actionGetRepositories(username));
  }

  const onClickProject = (repo: string) => {
    handleOpen();
    dispatch(actionGetReadme({ user: username, repo: repo }));
    setRepoName(repo);
  }

  const closeModal = () => {
    handleClose();
    setEncode('');
  }

  return (
    <>
      <CustomContainer displayState={displayState}>
        <Container maxWidth="md">
          <SearchBar>
            <h1>LOREM IPSUM</h1>
            <FormControl>
              <SearchField
                label="Username"
                required
                variant="outlined"
                id="validation-outlined-input"
                onKeyDown={handleKeyDown}
                onChange={event => setUsername(event.target.value)}
                InputProps={{
                  endAdornment:
                    <SearchIcon aria-label="search" onClick={onClickSearch}>
                      <SearchOutlinedIcon />
                    </SearchIcon>
                }}
              />
            </FormControl>
          </SearchBar>
        </Container>
      </CustomContainer>
      <ProjectContainer className='projectsContainer'>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4}>
          {list.length > 0 &&
            list && list.map((repo: any, index: number) => (
              <Box gridColumn="span 4" key={index}>
                <FolderOpenOutlinedIcon onClick={() => onClickProject(repo.name)} className="muiIcon" />
                <h2>{repo.name}</h2>
              </Box>
            ))
          }
        </Box>
      </ProjectContainer>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Readme of {repository} by {username}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {decode}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}