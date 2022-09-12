import React from 'react';
import styles from "../../Components/AppWithRedux/AppWithRedux.module.css";
import {ErrorSnackbar} from "../../Components/ErrorSnackbar/ErrorSnackbar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../Login/Login";
import Grid from "@mui/material/Grid";
import AppWithRedux from "../../Components/AppWithRedux/AppWithRedux";
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../State/hooks";
import {logoutTC} from "../../State/auth-reducer";


const Initialized = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const onClickLogIn = () => {
        navigate('login')
    }
    const onClickLogOut = () => {
        dispatch(logoutTC());
    }
    return (
        <div className={styles.App}>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>

                    {
                        isLoggedIn
                            ? <Button color="inherit" onClick={onClickLogOut}>Logout</Button>
                            : <Button color="inherit" onClick={onClickLogIn}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<AppWithRedux/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path="*" element={<Navigate to={'404'}/>}/>
                    <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
                <Grid container style={{padding: '20px'}}>
                </Grid>
                <Grid container spacing={3}>
                </Grid>

            </Container>
        </div>
    );
};

export default Initialized;