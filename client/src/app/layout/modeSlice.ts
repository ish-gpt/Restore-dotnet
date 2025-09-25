import { createSlice } from "@reduxjs/toolkit";

const getModeFromLocalStorage = () => {
    const mode = localStorage.getItem('mode');
    return mode ? mode : 'light';
}

export const mode = createSlice({
    name: 'mode',
    initialState: {
        mode: getModeFromLocalStorage(),
    },
    reducers: {
        setMode: (state) => {
            localStorage.setItem('mode', state.mode === 'light' ? 'dark' : 'light');
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
});

export const { setMode } = mode.actions;