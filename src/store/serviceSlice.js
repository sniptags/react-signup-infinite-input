import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const serviceSlice = createSlice({
    name: 'service',
    initialState:{services:[]},
    reducers: {
        setServices(state,action) {
          state.services=action.payload
        }
    }
})


export const {setServices}=serviceSlice.actions
export const fetchServices=()=>{
  return async (dispatch)=>{
    try{
      const response = await axios.get("https://signup-form-snippet-default-rtdb.firebaseio.com/services.json");
      let services=[]
      for(const prop in response.data){
        services.push(response.data[prop])
      }
      dispatch(setServices(services))
    }catch(err){
      throw new Error({ message:err.message }, { status: err.status })
    }
  }
}
export default serviceSlice.reducer