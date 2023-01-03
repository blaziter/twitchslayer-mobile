import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface GoldsState {
    value: number
    gps: number
}

// Define the initial state using that type
const initialState: GoldsState = {
    value: 0,
    gps: 0
}

export const goldsSlice = createSlice({
    name: 'value',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        addGps: (state, action: PayloadAction<number>) => {
            state.gps += action.payload
        },
        decrement: (state) => {
            state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        decrementByAmount: (state, action: PayloadAction<number>) => {
            state.value -= action.payload
            state.value = Math.round(state.value * 100) / 100
        }
    },
})

export const { increment, addGps, decrement, incrementByAmount, decrementByAmount } = goldsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.golds.value

export default goldsSlice.reducer