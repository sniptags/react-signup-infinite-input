import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const citySlice = createSlice({
    name: 'city',
    initialState:{cities:[]},
    reducers: {
        setCities(state,action) {
          state.cities=action.payload
        }
    }
})


export const {setCities}=citySlice.actions
export const fetchCities=()=>{
  return async (dispatch)=>{
    try{
      // get data from Firebase
      const cityResponse = await axios.get("https://signup-form-snippet-default-rtdb.firebaseio.com/cities.json");
      // convert firebase data into array
      let cities=[]
      for(const prop in cityResponse.data){
        cities.push(cityResponse.data[prop])
      }
      dispatch(setCities(cities))
    }catch(err){
      console.log("error fetch",err)
      throw new Error({ message:err.message }, { status: err.status })
    }
  }
}
export default citySlice.reducer