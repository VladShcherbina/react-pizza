import {createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store'

type Sort = {
    name: string;
    sortProperty: "rating" | "price" | "title";
}

interface FilterSliceState {
    categoryId: number;
    currentPage: number;
    sort: Sort
}

const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'Популярности',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
        }
    }
})
export const selectFilterCategoryId = (state: RootState) => state.filter.categoryId
export const selectFilter = (state: RootState) => state.filter.sort
export const selectFilterSort = (state: RootState) => state.filter.sort.sortProperty
export const selectFilterCurrent = (state: RootState) => state.filter.currentPage


export const {setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer