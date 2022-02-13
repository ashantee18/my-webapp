import { Box, Container, FormControl, Grid, Modal, Typography } from "@mui/material";
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { actionGetReadme, actionGetRepositories } from "../modules/actions";
import { getReadmeSelector, getRepoSelector } from "../selector";
import { SearchBar, SearchIcon, SearchField } from "../components/SearchField";
import { Base64 } from "js-base64";
import { ProjectHeader, ProjectName, TotalCount } from "../components/Results";
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

const Empty = styled(Grid)`
  font-size: 25px;
`;
const Italic = styled(Typography)`
  font-style: italic;
  padding: 15px 0;
`;
const Header = styled(Typography)`
  color: #fff;
  padding: 15px 0;
`;
const Pre = styled.pre`
  white-space: break-spaces;
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
            <Header variant='h5'>Retrieve Public Repositories <br /> using GitHub API</Header>
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
          <Typography variant='h6'>Showing public repositories of {username}</Typography>
          <Italic>Clicking the projects below will show the Readme of each repository.</Italic>
        </ProjectHeader>
          <Container>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={12} sm={12} md={12}>
                <TotalCount>{list.length} repositories found</TotalCount>
              </Grid>
              {list && list.length > 0 ?
                (list.map((repo: any, index: number) => {
                  return (
                    <>
                    <Grid item xs={2} sm={4} md={4} key={index} className='project-item'>
                      <FolderOpenOutlinedIcon onClick={() => onClickProject(repo.name)} className="muiIcon" />
                      <ProjectName variant="h6">{repo.name}</ProjectName>
                    </Grid>
                    </>
                  )
                })
                ) : (
                  <Empty item xs={12} sm={12} md={12} >
                    Nothing here...
                  </Empty>
                )
              };

            </Grid>
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
            <Pre>{decode}</Pre>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}