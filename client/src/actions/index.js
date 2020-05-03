import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    GET_STREAM,
    GET_STREAMS,
    EDIT_STREAM,
    DELETE_STREAM,
} from "./types";
import jsonServer from "../apis/jsonServer";
import history from "../history";

export const signIn = (id) => {
    return {
        type: SIGN_IN,
        payload: id,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const createStream = (formValues) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await jsonServer.post("/streams", {
        ...formValues,
        userId,
    });
    dispatch({
        type: CREATE_STREAM,
        payload: response.data,
    });
    history.push("/"); //programmatically navigate to Main Page to indicate that the stream has been successfully created and no errors emerged (hence, this code is invoked here instead in onSubmit within StreamCreate component)
};

export const getStream = (id) => async (dispatch) => {
    const response = await jsonServer.get(`/streams/${id}`);
    dispatch({
        type: GET_STREAM,
        payload: response.data,
    });
};

export const getStreams = () => async (dispatch) => {
    const response = await jsonServer.get("/streams");
    dispatch({
        type: GET_STREAMS,
        payload: response.data,
    });
};

export const editStream = (id, formValues) => async (dispatch) => {
    const response = await jsonServer.patch(`/streams/${id}`, formValues); //pacth updates some properties , put replaces the entire object with the new object
    dispatch({
        type: EDIT_STREAM,
        payload: response.data,
    });
    history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
    await jsonServer.delete(`/streams/${id}`);
    dispatch({
        type: DELETE_STREAM,
        payload: id,
    });
    history.push("/");
};
