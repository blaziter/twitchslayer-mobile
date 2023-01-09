import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import items from '../../assets/items.json'

interface ItemState {
    items: {
        id: number
        name: string
        price: number
        type: string
        image: string
        dmg: number
        AH: number
        crit: number
        purchased: boolean
        count: number
    }[]
}

const initialState: ItemState = items;

export const itemsSlice = createSlice({
    name: 'items',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.name === action.payload)
            if (item) {
                item.count += 1
                item.purchased = true
            }
        },
        remove: (state) => {
            state.items.map(item => {
                const myitem = state.items.find(myItem => myItem.name == item.name)
                if (myitem) {
                    myitem.count = 0
                    myitem.purchased = false
                }
            })
        }
    },
})

export const { add, remove } = itemsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.golds.value

export default itemsSlice.reducer