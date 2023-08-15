import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const categorySlice = createSlice({
    name: 'category',
    initialState:{categories:[]},
    reducers: {
        setCategories(state,action) {
          state.categories=action.payload
        }
    }
})


export const {setCategories}=categorySlice.actions
export const fetchCategories=()=>{
  return async (dispatch)=>{
    try{
      // get data from firebase
      const response = await axios.get("https://signup-form-snippet-default-rtdb.firebaseio.com/categories.json");
      // convert firebase data into array
      let categories=[]
      for(const prop in response.data){
        categories.push(response.data[prop])
      }
      dispatch(setCategories(categories))
    }catch(err){
      throw new Error({ message:err.message }, { status: err.status })
    }
  }
}
export default categorySlice.reducer