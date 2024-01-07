import {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Container,
    Button,
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

export const Portal = ()=>{
    const [data,setData] = useState([]);

    useEffect(()=>{
        fetchUsers();
    }, []);

    const fetchUsers = ()=>{
        axios.get(`https://weather-info-bot-production.up.railway.app/user`)
        .then((response)=>{
            setData(response.data);
        })
        .catch((error)=>{
            console.log(error.message);
        })
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

    const updateApiKey = ()=>{
        const newAPI = prompt('Enter New API Key');
        if(newAPI){
            axios.post(`https://weather-info-bot-production.up.railway.app/admin/apiKey`,{key:newAPI})
            .then((response)=>{
                fetchUsers();
            })
            .catch((error)=>{
                console.log(error.message);
            })
        }
    }

    return(
        <Container>
            <Typography variant='h2'>Welcome To Admin Portal</Typography>
            <Paper elevation={4} style={{padding:'20px'}}>
                <Typography variant='h4'>Current Users :</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>User Name</TableCell>
                                <TableCell>API Key</TableCell>
                                <TableCell>Action 1</TableCell>
                                <TableCell>Action 2</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(item=>(
                                <TableRow key={item.ID}>
                                    <TableCell>{item.ID}</TableCell>
                                    <TableCell>{item.userName}</TableCell>
                                    <TableCell>{item.apiKey}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" onClick={() => deleteUser(item.ID)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={updateApiKey} style={{ marginTop: '10px' }}>
                                            Update API KEY
                                        </Button>
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

