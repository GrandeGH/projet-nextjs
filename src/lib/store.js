import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../counterSlice'
// import gameReducer from '../slices/gameSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        // games: gameReducer,
    }
  }) 