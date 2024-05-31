import {createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
    items: []
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    }})
export const selectPizza = (state: RootState) => state.pizza.items

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer