import { Box, Container, FormControl, Modal, Typography } from "@mui/material";
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { actionGetReadme, actionGetRepositories } from "../modules/actions";
import { getReadmeSelector, getRepoSelector } from "../selector";
import { SearchBar, SearchIcon, SearchField } from "../components/SearchField";
import { Base64 } from "js-base64";
import { ProjectHeader, TotalCount } from "../components/Results";
import { Border, ModalStyle } from "../components/Modal";

const CustomContainer = styled.div<{ displayState: boolean }>`
  margin: 0 auto;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-out;
  height: ${(props: any) => props.displayState ? "40vh" : "100vh"};
  background-color:#557A95;
`;

const ProjectContainer = styled.div<{ projectState: boolean }>`
  display: ${(props: any) => props.projectState ? "block" : "none"};
  text-align: center;
  transition: all 0.3s ease-out;
`;

const Empty = styled(Box)`
  font-size: 25px;
`;

export const Main: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [repository, setRepoName] = useState('');
  const [displayState, setDisplayState] = useState(false);
  const [projectState, setProjectState] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [decode, setEncode] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const list = useSelector(getRepoSelector);
  const readme = useSelector(getReadmeSelector);

  useEffect(() => {
    const decodeString = Base64.atob(readme);
    setEncode(decodeString);
  }, [readme])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setDisplayState(true);
      onClickSearch();
    } else {
      setProjectState(false);
      setDisplayState(false);
    }
  }

  const onClickSearch = () => {
    setDisplayState(true);
    setProjectState(true);
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
            <h1>Retrieve Public Repositories <br /> using GitHub API</h1>
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
      <ProjectContainer projectState={projectState} className='projectsContainer'>
        <ProjectHeader>
          <h2>Showing public repositories of {username}</h2>
          <i>Clicking the projects below will show the Readme of each repository.</i>
        </ProjectHeader>
        <Container>
          <TotalCount>{list.length} repositories found</TotalCount>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4}>
            {list && list.length > 0 ?
              (list.map((repo: any, index: number) => {
                return (
                  <Box gridColumn="span 4" key={index} className='project-item'>
                    <FolderOpenOutlinedIcon onClick={() => onClickProject(repo.name)} className="muiIcon" />
                    <h2>{repo.name}</h2>
                  </Box>
                )
              })
              ) : (
                <Empty gridColumn="span 12">
                  Nothing here...
                </Empty>
              )
            };
          </Box>
        </Container>
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
          <Border />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {decode}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}