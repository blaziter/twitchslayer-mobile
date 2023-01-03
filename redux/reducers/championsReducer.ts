import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import champions from '../../assets/champions.json'

// Define a type for the slice state
interface ChampionsState {
    champions: {
        id: number,
        name: string,
        price: number,
        count: number,
        type: string,
        image: string,
        gps: number,
        baseGps: number
    }[]
}

// Define the initial state using that type
const initialState: ChampionsState = champions;

export const championsSlice = createSlice({
    name: 'value',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            const champion = state.champions.find(champion => champion.name === action.payload)
            if (champion) {
                champion.count += 1
                champion.gps += champion.baseGps
                champion.price = Math.round(champion.price * 120) / 100
            }
        }
    },
})

export const { add } = championsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.golds.value

export default championsSlice.reducer