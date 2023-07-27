import axios from "axios";
const user_url = `http://localhost:5000/api/user`;
const subject_url = `http://localhost:5000/api/subject`;

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

export const user_update = async (payload) => {
    try {
        let options = {
            method: 'PUT',
            url: `${user_url}/update/${payload.user._id}`,
            data: payload
        };
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const get_subjects = async (payload) => {
    try {
        let options = {
            method: 'POST',
            url: `${subject_url}/get_subjects`,
            data: payload
        };
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const low_attendance = async (payload) => {
    try {
        let options = {
            method: 'POST',
            url: `${user_url}/low`,
            data: payload
        };
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const create_subject = async (payload) => {
    try {
        let options = {
            method: 'POST',
            url: `${subject_url}/create`,
            data: payload
        };
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}
