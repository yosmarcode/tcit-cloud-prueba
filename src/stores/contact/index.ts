import { createSlice } from "@reduxjs/toolkit";

export interface Contact {
    id: number;
    name: string;
    description: string;
}

const contactStore = createSlice({
    name: 'contact-store',
    initialState: {
        dataContacts: [] as Contact[]
    },
    reducers: {
        setDataContactStore: (state, action) => {
            state.dataContacts = action.payload
        }
    }
})

export const { setDataContactStore } = contactStore.actions
export default contactStore.reducer