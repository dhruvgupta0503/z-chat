import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Stack, Avatar, IconButton } from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';

import { VisuallyHiddenInput } from '../components/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { usernameValidator } from '../utils/validators';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = () => {
        setIsLogin(prev => !prev);
    };

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useStrongPassword();
    const avatar = useFileHandler("single");

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // Handle signup logic
    };

    return (
        <div
            style={{
                backgroundImage: "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h5">{isLogin ? "Login" : "Sign Up"}</Typography>
                    <form onSubmit={isLogin ? handleLogin : handleSignup}>
                        {!isLogin && (
                            <>
                                <Stack position="relative" width="10rem" margin="auto">
                                    <Avatar
                                        sx={{
                                            width: '10rem',
                                            height: '10rem',
                                            objectFit: 'contain',
                                        }}
                                        src={avatar.preview}
                                    />
                                    {avatar.error && (
                                        <Typography color="error " variant="caption">
                                            {avatar.error}
                                        </Typography>
                                    )}
                                    <IconButton
                                        sx={{
                                            position: "absolute",
                                            bottom: "0",
                                            right: "0",
                                            color: "white",
                                            bgcolor: "rgba(0,0,0,0.5)",
                                            ":hover": {
                                                bgcolor: "rgba(0,0,0,0.7)",
                                            }
                                        }}
                                        component="label"
                                    >
                                        <CameraAltIcon />
                                        <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                                    </IconButton>
                                </Stack>
                                <TextField
                                    required
                                    fullWidth
                                    label="Name"
                                    margin="normal"
                                    variant="outlined"
                                    value={name.value}
                                    onChange={name.changeHandler}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Bio"
                                    margin="normal"
                                    variant="outlined"
                                    value={bio.value}
                                    onChange={bio.changeHandler}
                                />
                            </>
                        )}
                        <TextField
                            required
                            fullWidth
                            label="Username"
                            margin="normal"
                            variant="outlined"
                            value={username.value}
                            onChange={username.changeHandler}
                        />
                        {username.error && (
                            <Typography color="error " variant="caption">
                                {username.error}
                            </Typography>
                        )}
                        <TextField
                            required
                            fullWidth
                            type="password"
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            value={password.value}
                            onChange={password.changeHandler}
                        />
                        {password.error && (
                            <Typography color="error " variant="caption">
                                {password.error}
                            </Typography>
                        )}
                        <Button
                            sx={{ marginTop: '1rem' }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            {isLogin ? "Login" : "Sign Up"}
                        </Button>
                        <Typography textAlign="center" m="1rem">
                            {isLogin
                                ? "Don't have an account? "
                                : "Already have an account? "}
                            <Button color="primary" onClick={toggleLogin}>
                                {isLogin ? "Sign Up" : "Login"}
                            </Button>
                        </Typography>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default Login;
