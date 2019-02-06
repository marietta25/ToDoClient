import axios from 'axios';

export default axios.create({
    baseURL: 'https://todoserver20190202105108.azurewebsites.net/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    
});