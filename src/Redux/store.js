import { ConfigureStore } from "redux";

const store = ConfigureStore({
  reducer : {
    Cart : CartReducer,
  }
});

export default store