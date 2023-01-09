import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ImageSourcePropType } from 'react-native'

// Define a type for the slice state
interface GoldsState {
    value: number
    gps: number
    click: number
    AD: number
    AP: number
    inventoryCount: number
    AH: number
    crit: number
    inventory: {
        id: number
        image: ImageSourcePropType
    }[]
}

interface Inventory {
    id: number
    image: ImageSourcePropType
}

// Define the initial state using that type
const initialState: GoldsState = {
    value: 1000,
    gps: 1000,
    click: 1,
    AD: 0,
    AP: 0,
    inventoryCount: 0,
    AH: 0,
    crit: 0,
    inventory: []
}

export const goldsSlice = createSlice({
    name: 'value',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addGps: (state, action: PayloadAction<number>) => {
            state.gps += Math.round(action.payload * 100) / 100
        },
        increment: (state) => {
            state.value += 1
        },
        incrementAD: (state) => {
            state.AD += 1
        },
        incrementAP: (state) => {
            state.AP += 1
        },
        incrementInv: (state) => {
            state.inventoryCount += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementClick: (state) => {
            state.click += 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        incrementByGps: (state, action: PayloadAction<number>) => {
            state.value += action.payload
            state.value = Math.round(state.value * 100) / 100
        },
        incrementByAH: (state, action: PayloadAction<number>) => {
            state.AH += action.payload
        },
        incrementByCrit: (state, action: PayloadAction<number>) => {
            state.crit += action.payload
        },
        incrementByAD: (state, action: PayloadAction<number>) => {
            state.AD += action.payload
        },
        incrementByAP: (state, action: PayloadAction<number>) => {
            state.AP += action.payload
        },
        addInventory: (state, action: PayloadAction<Inventory>) => {
            state.inventory.push({ ...action.payload })
        },
        removeInventory: (state) => {
            while (state.inventory.length > 0) state.inventory.pop()
        },
        decrementByAmount: (state, action: PayloadAction<number>) => {
            state.value -= action.payload
            state.value = Math.round(state.value * 100) / 100
        }
    },
})

export const { addGps, increment, incrementAD, incrementAP, incrementInv, decrement, incrementClick, incrementByAmount, incrementByGps, incrementByAH, incrementByCrit, incrementByAD, incrementByAP, addInventory, removeInventory, decrementByAmount } = goldsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.golds.value

export default goldsSlice.reducer