import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import {login, signUp, logout} from '../apis/auth'
import { AuthContext } from '../context/auth';

export const useAuth = () => {
    const {setAuth} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    
    const loginHandler = async (data) => {
        setLoading(true);
        try {
            const response = await login(data);
            if(response.status===400) {
                console.log(response.response.data.error);
                throw new Error(response.data.error);
            }
            else {
                await setAuth(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                setLoading(false);
                toast.success("Login successful");
            }
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const signUpHandler = async (data) => {
        setLoading(true);
        try {
            const response = await signUp(data);
            if(response.error) {
                throw new Error(response.error);
            }
            else {
                setLoading(false);
                toast.success("User registered successfully, check your email to verify your account");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const logoutHandler = async () => {
        setLoading(true);
        try {
            console.log("Logout successful");
            await logout();
            localStorage.removeItem("user");
            setAuth(null);
            setLoading(false);
            toast.success("Logout successful");
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    return {loginHandler, signUpHandler, loading, logoutHandler};
}