import { postApi, getApi } from './index';

const login = (data) => {
    return postApi('http://localhost:5000/api/v1/auth/login', data,
    );
}

const signUp = (data) => {
    return postApi('http://localhost:5000/api/v1/auth/register', data);
}

const logout = () => {
    return getApi('http://localhost:5000/api/v1/auth/logout');
}

export { login, signUp, logout };