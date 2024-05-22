import { createSlice } from "@reduxjs/toolkit";

export const globaleStateSlice = createSlice({
  name: "state",
  initialState: {
    studentsList: [],
  },
  reducers: {
    studentsList: (state, action) => {
      return { ...state, studentsList: action.payload };
    },
  },
});

export const { studentsList } = globaleStateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

export default globaleStateSlice.reducer;
