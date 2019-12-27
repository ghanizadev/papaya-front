import axios from 'axios';

export const findAllProducts = (token) =>
    axios.get(`${process.env.REACT_APP_DATABASE}/api/v1/product`,
    {
        headers: {'Authorization': `Bearer ${token}`}
    }
    )