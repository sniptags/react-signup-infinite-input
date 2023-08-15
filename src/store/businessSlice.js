import { createSlice } from "@reduxjs/toolkit";
const businessSlice = createSlice({
    name: "businessData",
    initialState: {
        name:"",
        email:"",
        phone:"",
        operationCity: {
            totalCities: 1,
            showAddButton: false,
            showRemoveButton: false,
            selectedCities: [],
        },
        category: {
            totalCategories: 1,
            showAddButton: false,
            showRemoveButton: false,
            selectedCategories: [],
        },
        service: {
            totalServices: 1,
            showAddButton: false,
            showRemoveButton: false,
            selectedServices: [],
        },
    },
    reducers: {
        SET_NAME(state,action){
            state.name=action.payload
        },
        SET_EMAIL(state,action){
            state.email=action.payload
        },
        SET_PHONE(state,action){
            state.phone=action.payload
        },
        ADD_ANOTHER_CITY(state) {
            state.operationCity.totalCities++;
            state.operationCity.showRemoveButton = true;
            state.operationCity.showAddButton = false;
        },

        REMOVE_LAST_CITY(state) {
            state.operationCity.selectedCities.length ===
                state.operationCity.totalCities &&
                state.operationCity.selectedCities.pop();

            state.operationCity.totalCities--;

            state.operationCity.showAddButton =
                state.operationCity.totalCities === 1 || state.operationCity.selectedCities.length ===
                state.operationCity.totalCities
                    ? true
                    : state.operationCity.showAddButton;
            state.operationCity.showRemoveButton =
                state.operationCity.totalCities > 1 ? true : false;
        },

        SET_SELECTED_CITY(state, action) {
            const index = action.payload.position
            if(index < state.operationCity.selectedCities.length){
                state.operationCity.selectedCities[index]=action.payload.value
            }
            else{
                state.operationCity.selectedCities.push(action.payload.value);
                state.operationCity.showAddButton = true;
            }
        },

        ADD_ANOTHER_CATEGORY(state) {
            state.category.totalCategories++;
            state.category.showRemoveButton = true;
            state.category.showAddButton = false;
        },

        REMOVE_LAST_CATEGORY(state) {
            state.category.selectedCategories.length ===
                state.category.totalCategories &&
                state.category.selectedCategories.pop();

            state.category.totalCategories--;

            state.category.showAddButton =
                state.category.totalCategories === 1
                    ? true
                    : state.category.showAddButton;
            state.category.showRemoveButton =
                state.category.totalCategories > 1 ? true : false;
        },

        SET_SELECTED_CATEGORY(state, action) {
            
            const index = action.payload.position
            if(index < state.category.selectedCategories.length){
                state.category.selectedCategories[index]=action.payload.value
            }
            else{
                state.category.selectedCategories.push(action.payload.value);
                state.category.showAddButton = true;
            }
        },

        SET_SELECTED_SERVICE(state, action) {
            const index = action.payload.position
            if(index < state.service.selectedServices.length){
                state.service.selectedServices[index]=action.payload.value
            }else{
                state.service.selectedServices.push(action.payload.value);
                state.service.showAddButton = true;
            }
            
        },

        ADD_ANOTHER_SERVICE(state) {
            state.service.totalServices++;
            state.service.showRemoveButton = true;
            state.service.showAddButton = false;
        },

        REMOVE_LAST_SERVICE(state) {
            state.service.selectedServices.length ===
                state.service.totalServices &&
                state.service.selectedServices.pop();

            state.service.totalServices--;

            state.service.showAddButton =
                state.service.totalServices === 1
                    ? true
                    : state.service.totalServices;
            state.service.showRemoveButton =
                state.service.totalServices > 1 ? true : false;
        },
    },
});
export const {
    SET_NAME,
    SET_PHONE,
    SET_EMAIL,
    ADD_ANOTHER_CITY,
    REMOVE_LAST_CITY,
    SET_SELECTED_CITY,
    ADD_ANOTHER_CATEGORY,
    REMOVE_LAST_CATEGORY,
    SET_SELECTED_CATEGORY,
    ADD_ANOTHER_SERVICE,
    REMOVE_LAST_SERVICE,
    SET_SELECTED_SERVICE,
} = businessSlice.actions;

export default businessSlice.reducer;
