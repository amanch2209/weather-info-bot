import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const Portal = ()=>{
    const [apiKey, setAPIKey] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetchAPIKey();
        fetchUsers();
    },[]);

    const fetchAPIKey = ()=>{
        axios.get(`https://weather-info-bot-production.up.railway.app/admin/apiKey`)
        .then((response)=>{
            setAPIKey(response.data);
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

    const updateAPIKey = ()=>{
        const newAPI = prompt('ENTER NEW API KEY');
        if(newAPI){
            axios.post(`https://weather-info-bot-production.up.railway.app/admin/apiKey`,{key:newAPI})
            .then((response)=>{
                fetchAPIKey();
            })
            .catch((error)=>{
                console.log(error.message);
            })
        }
    }

    const deleteUser = (ID)=>{
        axios.delete(`https://weather-info-bot-production.up.railway.app/user/${ID}`)
        .then((response)=>{
            fetchUsers();
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

    const fetchUsers = ()=>{
        axios.get(`https://weather-info-bot-production.up.railway.app/user`)
        .then((response)=>{
            setUsers(response.data);
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

    return (
        <Container>
            <Typography variant='h3' gutterButtom>Welcome To Admin Portal</Typography>
            <Paper elevation={3} style={{padding:'20px'}}>
                <Typography variant='h5' gutterButtom>Current Users :</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>API Key</TableCell>
                                <TableCell>Action 1</TableCell>
                                <TableCell>Action 2</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user)=>(
                                <TableRow key={user.ID}>
                                    <TableCell>{user.ID}</TableCell>
                                    <TableCell>{user.userName}</TableCell>
                                    <TableCell>{user.apiKey}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" onClick={() => deleteUser(user.ID)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}

export default Portal;