const { configureStore, createSlice } = require("@reduxjs/toolkit");

const initialAuth = {
    auth: JSON.parse(localStorage.getItem("study_stamp")) ? true : false,
    user: JSON.parse(localStorage.getItem("study_stamp")) ? JSON.parse(localStorage.getItem("study_stamp")) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuth,
    reducers: {
        login(state, actions){
            state.auth = true;
            state.user = actions.payload 
            console.log(actions.payload);
            localStorage.setItem('study_stamp', JSON.stringify(actions.payload));
        },
        logout(state, actions){
            state.auth = false;
            state.user = null;
            localStorage.removeItem('study_stamp');
        },
        updateUser(state, actions){
            state.user = actions.payload;
            localStorage.setItem('study_stamp', JSON.stringify(actions.payload));
        }
    }
})

export const authActions = authSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})

export default store;