import {useState, useEffect} from 'react';
import axios from 'axios';

export const Portal = ()=>{
    const [data,setData] = useState([]);

    useEffect(()=>{
        axios.get(`https://weather-info-bot-production.up.railway.app/user`)
        .then((response)=>{
            setData(response.data);
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }, []);

    return(
        <div>
            <h2>Welcome To Admin Portal</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>API Key</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item=>(
                        <tr key={item.ID}>
                            <td>{item.ID}</td>
                            <td>{item.userName}</td>
                            <td>{item.apiKey}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

