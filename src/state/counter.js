import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    setTo: (_, { payload }) => payload
  }
})