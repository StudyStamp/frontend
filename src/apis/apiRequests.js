import axios from "axios";
const user_url = `http://localhost:5000/api/user`;

//POST REQEUSTS
export const user_login = async (payload) => {
    try {
        let options = {
            method: 'POST',
            url: `${user_url}/login`,
            data: payload
        };
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}