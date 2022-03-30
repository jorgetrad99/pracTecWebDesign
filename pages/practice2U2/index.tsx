import { Box, Button, TextField, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import Router from 'next/router'

const Practice2U2 = () => {
    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState('');

    const users = [
        {
            user: 'user1',
            password: '1234'
        },
        {
            user: 'user2',
            password: '1234'
        }
    ]

    const authenticateUser = () => {
        if(user && password) {
            const authenticatedUser = users.find((element) => element.user == user);

            if(authenticatedUser){
                if(authenticatedUser.user == user && authenticatedUser.password == password){
                    return true;
                }
            }
        }
        return false;
    }

    return (
        <Fragment>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h5">Access to the System</Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="User"
                            /* value={user} */
                            onChange={ (e) => setUser(e.target.value) }
                            style={{ 
                                minWidth: '17rem'
                             }}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={ (e) => setPassword(e.target.value) }
                            style={{ 
                                minWidth: '17rem'
                             }}
                        />
                        <div>
                            <Button 
                                variant="outlined" 
                                onClick={ () => {
                                    
                                }}
                                sx={{margin: '5px'}}
                            >
                                Register
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={ () => {
                                    if(authenticateUser()) {
                                        Router.push(`/practice2U2/${user}`);
                                    } else {
                                        alert("Verify the information you just typed");
                                    }
                                }}
                                sx={{margin: '5px'}}
                            >
                                Login
                            </Button>
                        </div>
                        
                    </div>
                    
                </div>
            </Box>    
        </Fragment>
    );
}

export default Practice2U2;