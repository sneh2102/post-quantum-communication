import { postApi,getApi } from "./index";

export const sendMessage = (id, message) => {
    console.log(message);
    return postApi(`http://localhost:5000/api/v1/message/send-message/${id}`, {message: message}
    );
}

export const getMessages = (id) => {
    return getApi(`http://localhost:5000/api/v1/message/get-messages/${id}`);
}