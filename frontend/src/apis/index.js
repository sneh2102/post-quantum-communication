import axios from 'axios';

const getApi = (url) => {
    return axios.get(url,
        {
            withCredentials:true,
        }
    );
    };

const postApi = (url, data) => {
    return axios.post(url, data,
        {
            withCredentials:true,
        }
    );
    };

export { getApi, postApi };