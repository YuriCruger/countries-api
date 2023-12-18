import { createSlice } from "@reduxjs/toolkit";
import { dataType } from '../../types/dataType'

interface DataState {
    region: string;
    country: string;
    currentCountry: dataType | null;
}

export const dataSlice = createSlice({
    name: 'countries',
    initialState: {
        region: 'Filter by Region',
        country: '',
        currentCountry: null,
    } as DataState,
    reducers: {
        setRegion: (state, action) => {
            state.region = action.payload
        },

        setInputValue: (state, action) => {
            state.country = action.payload.toLowerCase();
        },

        setCurrentCountry: (state, action) => {
            state.currentCountry = action.payload;
        }
    }
})

export default dataSlice.reducer;
export const { setRegion, setInputValue, setCurrentCountry } = dataSlice.actions;