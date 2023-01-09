import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
const DATA = {
    "skins": [
        { name: 'Twitch', image: 'twitch0', price: 0, use: true, buy: true },
        { name: 'Kingpin Twitch', image: 'twitch1', price: 1000, use: false, buy: false },
        { name: 'Whistler Village Twitch', image: 'twitch2', price: 100000, use: false, buy: false },
        { name: 'Medieval Twitch', image: 'twitch3', price: 10000000, use: false, buy: false },
        { name: 'Crime City Twitch', image: 'twitch4', price: 1000000000, use: false, buy: false },
        { name: 'Vandal Twitch', image: 'twitch5', price: 10000000000, use: false, buy: false },
        { name: 'Pickpocket Twitch', image: 'twitch6', price: 1000000000000, use: false, buy: false },
        { name: 'SSW Twitch', image: 'twitch7', price: 10000000000000, use: false, buy: false },
        { name: 'Omega Squad Twitch', image: 'twitch8', price: 100000000000000, use: false, buy: false },
        { name: 'Ice King Twitch', image: 'twitch9', price: 1000000000000000, use: false, buy: false },
        { name: 'Twitch Shadowfoot', image: 'twitch10', price: 10000000000000000, use: false, buy: false },
        { name: 'Dragonslayer Twitch', image: 'twitch11', price: 100000000000000000, use: false, buy: false },
        { name: 'High Noon Twitch', image: 'twitch12', price: 1000000000000000000, use: false, buy: false },
    ]
}

interface SkinState {
    skins: {
        name: string
        image: string
        price: number
        use: boolean
        buy: boolean
    }[]
}

const initialState: SkinState = DATA;

export const itemsSlice = createSlice({
    name: 'items',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            const item = state.skins.find(item => item.name === action.payload)
            if (item) {
                item.buy = true
            }
        },
        useSkin: (state, action: PayloadAction<string>) => {
            state.skins.map(item => {
                const myitem = state.skins.find(myItem => myItem.name == item.name)
                if (myitem) {
                    myitem.use = false
                }
            })
            const item = state.skins.find(item => item.name === action.payload)
            if (item) {
                item.use = true
            }
        }
    },
})

export const { add, useSkin } = itemsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.golds.value

export default itemsSlice.reducer