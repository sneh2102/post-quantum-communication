import {getApi} from './index'
export const getConversations = () => {
    return getApi('http://localhost:5000/api/v1/user/getUser');
}