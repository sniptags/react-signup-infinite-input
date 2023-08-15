import FormSelectInput from "../UI/form-select-input";
import FormTextInput from "../UI/form-text-input";
import Button from "../UI/button";
import Card from "../UI/card";
import { useState } from "react";
import {
    SET_NAME,
    SET_EMAIL,
    SET_PHONE,
    SET_SELECTED_CITY,
    ADD_ANOTHER_CITY,
    REMOVE_LAST_CITY,
    SET_SELECTED_CATEGORY,
    REMOVE_LAST_CATEGORY,
    ADD_ANOTHER_CATEGORY,
    SET_SELECTED_SERVICE,
    REMOVE_LAST_SERVICE,
    ADD_ANOTHER_SERVICE,
} from "../../store/businessSlice";
import { useDispatch, useSelector } from "react-redux";
//import axios from "axios";

// Signup form component
const SignUp = ({ formFieldData }) => {
    const dispatch = useDispatch();
    const { cities, categories, services } = formFieldData;
    const [pageNumber, setPageNumber] = useState(1); // signup pages state
    const businessState = useSelector((state) => state.businessData);
    // error state
    const errorState = {
        formIsValid:true,
        email: {
            status: false,
            message: "",
        },
        name: {
            status: false,
            message: "",
        },
        phone: {
            status: false,
            message: "",
        },
    };

    const [error, setError] = useState(errorState);
    // Check if the user with same email exists
    // useEffect(() => {
    //     const timeOut = setTimeout(async () => {
    //         try {
    //             if (error.email.status) return;
    //             const response = await axios.get(
    //                 `http://yourAPIEndPoint?email=${businessState.email}`
    //             );
    //             if (response.status === 200) {
    //                 if (!response.data.matchFound)
    //                     setNewError(
    //                         "email",
    //                         true,
    //                         "Email is already associated with an account.Please log in"
    //                     );
    //             } else {
    //                 throw new Error();
    //             }
    //         } catch (err) {
    //             throw new Error({ message: "Error connecting to the server" });
    //         }
    //     }, 6000);
    //     return () => clearTimeout(timeOut);
    // }, [businessState.email, error.email.status]);

    // Setting a new error state
    const setNewError = (field, errorStatus, errorMessage) => {
        setError((prevState) => ({
            ...prevState,
            formIsValid:!errorStatus,
            [field]: {
                status: errorStatus,
                message: errorMessage,
            },
        }));
    };

    // Input Handlers
    const inputNameHandler = (event) => {
        dispatch(SET_NAME(event.target.value));
        if (event.target.value === "") {
            setNewError("name", true, "Name is required");
        }
        else if(error.name.status){
            setNewError("name", false, "");
        }
             
    };

    const inputEmailHandler = (event) => {
        dispatch(SET_EMAIL(event.target.value))
        if (event.target.value === "") {
            setNewError("email", true, "Email is required");
            
        }
        else if(error.email.status){
            setNewError("email", false, "")
        }
            
    };
    const inputPhoneHandler = (event) => {
        dispatch(SET_PHONE(event.target.value));
        if (event.target.value === "") {
            setNewError("phone", true, "Phone Number is required");
        }
        else if(error.phone.status) {
            setNewError("phone", false, "");
        }
            
    };

    // Item select handlers
    const selectCityHandler = (i, event) => {
        if (event.target.value === "") return;
        dispatch(SET_SELECTED_CITY({ position: i, value: event.target.value }));
        if(businessState.operationCity.selectedCities.includes(event.target.value)){
            setNewError(`city_${i}`, true, "This city is already selected");
        }    
        else if(error[`city_${i}`]?.status){
            setNewError(`city_${i}`, false, "")
        }
             
    };

    const selectCategoryHandler = (i, event) => {
        if (event.target.value === "") return;
        dispatch(SET_SELECTED_CATEGORY({ position: i, value: event.target.value }));
        if(businessState.category.selectedCategories.includes(event.target.value)){
            setNewError(`category_${i}`, true, "This category is already selected");
        }
        else if(error[`category_${i}`]?.status){
            setNewError(`category_${i}`, false, "")
        }
    };

    const selectServiceHandler = (i, event) => {
        if (event.target.value === "") return;
        dispatch(
            SET_SELECTED_SERVICE({ position: i, value: event.target.value })
        );
        if(businessState.service.selectedServices.includes(event.target.value)){
            setNewError(`service_${i}`, true, "This service is already selected");
        }
        else if(error[`service_${i}`]?.status){
            setNewError(`service_${i}`, false, "")
        }  
    };

    // signup/next button handler
    const signUpHandler = () => {
        let validated=true
        if (pageNumber === 1) {
            if(businessState.email === "") {
                setNewError("email", true, "Email is required")
                validated=false;
            }
            if(businessState.name === ""){
                setNewError("name", true, "Name is required")
                validated=false; 
            }
            if(businessState.phone === ""){
                setNewError("phone", true, "Phone is required")
                validated=false;
            } 
        }
        if(pageNumber===2){
            if(businessState.operationCity.selectedCities.length===0){
                setNewError("city_0", true, "Please select atleast 1 city") 
                validated=false; 
            } 
            if(businessState.operationCity.totalCities !== businessState.operationCity.selectedCities.length){
                setNewError(`city_${businessState.operationCity.totalCities-1}`, true, "Please select city") 
                 validated=false;
            }
        }
        if(pageNumber===3){
            if(businessState.category.selectedCategories.length===0){
                setNewError("category_0", true, "Please select atleast 1 category") 
                validated=false; 
            } 
            if(businessState.category.totalCategories !== businessState.category.selectedCategories.length){
                setNewError(`category_${businessState.category.totalCategories-1}`, true, "Please select category") 
                 validated=false;
            }
        }
        if(pageNumber===4){
            if(businessState.service.selectedServices.length===0){
                setNewError("service_0", true, "Please select atleast 1 category") 
                validated=false; 
            } 
            if(businessState.service.totalServices !== businessState.service.selectedServices.length){
                setNewError(`service_${businessState.service.totalServices-1}`, true, "Please select service") 
                 validated=false;
            }
            // post request here
            if(error.formIsValid && validated){
                
            }
        }
        if (pageNumber !== 4 && error.formIsValid && validated) {
            setPageNumber((prevState) => {
                return prevState + 1;
            });
        }
    };

      // back button handler
    const backPageHandler = () => {
        setPageNumber((prevState) => prevState - 1);
    };

    // add new item handler
    const addNewItemHandler = (item) => {
        switch (item) {
            case "city":
                dispatch(ADD_ANOTHER_CITY());
                break;
            case "category":
                dispatch(ADD_ANOTHER_CATEGORY());
                break;
            case "service":
                dispatch(ADD_ANOTHER_SERVICE());
                break;
            default:
        }
    };

    // remove item handler
    const removeLastItemHandler = (item) => {
        switch (item) {
            case "city":
                const lastCityIndex = businessState.operationCity.totalCities-1
                error[`city_${lastCityIndex}`]?.status && setNewError(`city_${lastCityIndex}`, false, "")
                dispatch(REMOVE_LAST_CITY());
                break;
            case "category":
                const lastCategoryIndex = businessState.category.totalCategories-1
                error[`category_${lastCategoryIndex}`]?.status && setNewError(`category_${lastCategoryIndex}`, false, "")
                dispatch(REMOVE_LAST_CATEGORY());
                break;
            case "service":
                const lastServiceIndex = businessState.service.totalServices-1
                error[`service_${lastServiceIndex}`]?.status && setNewError(`service_${lastServiceIndex}`, false, "")
                dispatch(REMOVE_LAST_SERVICE());
                break;
            default:
        }
    };

    // adding multiple city input fields
    if (pageNumber === 2) {
        var cityInputFields = [];
        for (let i = 0; i < businessState.operationCity.totalCities; i++) {
            cityInputFields.push(
                <FormSelectInput
                    id={`city_${i + 1}`}
                    key={`CITY_KEY_${i}`}
                    name="city"
                    classes={error[`city_${i}`]?.status && "is-invalid"}
                    formData={cities}
                    onChange={selectCityHandler.bind(null, i)}
                    selected={businessState.operationCity.selectedCities[i]}
                    errorMessage={error[`city_${i}`]?.status ? error[`city_${i}`].message :""}
                />
            );
        }
    }

    //adding multiple categories
    if (pageNumber === 3) {
        var categoryInputFields = [];
        for (let i = 0; i < businessState.category.totalCategories; i++) {
            categoryInputFields.push(
                <FormSelectInput
                    id={`category_${i + 1}`}
                    key={`CATEGORY_KEY_${i}`}
                    name="category"
                    classes={error[`category_${i}`]?.status && "is-invalid"}
                    formData={categories}
                    onChange={selectCategoryHandler.bind(null, i)}
                    selected={businessState.category.selectedCategories[i]}
                    errorMessage={error[`category_${i}`]?.status ? error[`category_${i}`].message :""}
                />
            );
        }
    }

    // Service input fields
    if (pageNumber === 4) {
        const filteredServices = services.filter((item) =>
            businessState.category.selectedCategories.includes(item.category)
        );
        var serviceInputFields = [];
        for (let i = 0; i < businessState.service.totalServices; i++) {
            serviceInputFields.push(
                <FormSelectInput
                    id="service"
                    classes={error[`service_${i}`]?.status && "is-invalid"}
                    key={`Service_KEY${i}`}
                    name="service"
                    formData={filteredServices}
                    onChange={selectServiceHandler.bind(null, i)}
                    selected={businessState.service.selectedServices[i]}
                    errorMessage={error[`service_${i}`]?.status ? error[`service_${i}`].message :""}
                />
            );
        }
    }

    return (
        <Card>
            <form>
                <h3>Register New Account</h3>

                {pageNumber === 1 && (
                    <p>
                        Create an account by entering the information below.
                    </p>
                )}

                {pageNumber === 1 && (
                    <FormTextInput
                        type="text"
                        value={businessState.name}
                        classes={error.name.status && "is-invalid"}
                        id="businessName"
                        placeholder="Business/Individual Name"
                        onChange={inputNameHandler}
                        errorMessage={error.name.message}
                    />
                )}
                {pageNumber === 1 && (
                    <FormTextInput
                        type="email"
                        value={businessState.email}
                        classes={error.email.status && "is-invalid"}
                        placeholder="Email"
                        id="businessEmail"
                        onChange={inputEmailHandler}
                        onBlur={event=>{ !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value) && setNewError("email", true, "Please enter a valid email")}
                        }
                        errorMessage={error.email.message}
                    />
                )}
                {pageNumber === 1 && (
                    <FormTextInput
                        type="tel"
                        id="phoneNumber"
                        classes={error.phone.status && "is-invalid"}
                        value={businessState.phone}
                        placeholder="Contact Number"
                        onChange={inputPhoneHandler}
                        onBlur={(event)=>{
                            !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i.test(event.target.value) && setNewError("phone", true, "Please enter a valid phone number")
                        }}
                        errorMessage={error.phone.message}
                    />
                )}

                {pageNumber === 2 && (
                    <p>
                        Please select your cities of operations.You can choose
                        multiple cities by clicking on Add another City button
                    </p>
                )}
                {pageNumber === 2 && cityInputFields}
                {pageNumber === 2 &&
                    businessState.operationCity.showAddButton && (
                        <Button
                            type="button"
                            classes="btn-light btn-small"
                            onClick={addNewItemHandler.bind(null, "city")}
                            text="Add Another City"
                        />
                    )}
                {pageNumber === 2 &&
                    businessState.operationCity.showRemoveButton && (
                        <Button
                            type="button"
                            classes="btn-light btn-small"
                            onClick={removeLastItemHandler.bind(null, "city")}
                            text="Remove City"
                        />
                    )}

                {pageNumber === 3 && (
                    <p>
                        Please select the categories your business operates in.
                    </p>
                )}

                {pageNumber === 3 && categoryInputFields}

                {pageNumber === 3 && businessState.category.showAddButton && (
                    <Button
                        type="button"
                        classes="btn-light btn-small"
                        onClick={addNewItemHandler.bind(null, "category")}
                        text="Add Another Category"
                    />
                )}

                {pageNumber === 3 &&
                    businessState.category.showRemoveButton && (
                        <Button
                            type="button"
                            classes="btn-light btn-small"
                            onClick={removeLastItemHandler.bind(
                                null,
                                "category"
                            )}
                            text="Remove Category"
                        />
                    )}

                {pageNumber === 4 && (
                    <p>
                        Please select the services you provide to your clients.
                    </p>
                )}

                {pageNumber === 4 && serviceInputFields}

                {pageNumber === 4 && businessState.service.showAddButton && (
                    <Button
                        type="button"
                        classes="btn-light btn-small"
                        onClick={addNewItemHandler.bind(null, "service")}
                        text="Add Another Service"
                    />
                )}

                {pageNumber === 4 && businessState.service.showRemoveButton && (
                    <Button
                        type="button"
                        classes="btn-light btn-small"
                        onClick={removeLastItemHandler.bind(null, "service")}
                        text="Remove Service"
                    />
                )}
                <div>
                    {pageNumber !== 1 && (
                        <Button
                            text="< Back"
                            type="button"
                            classes="btn-outline"
                            onClick={backPageHandler}
                        />
                    )}
                    <Button
                        text={pageNumber === 4 ? "Register" : "Next >"}
                        type="button"
                        classes="right"
                        onClick={signUpHandler}
                    />
                </div>
            </form>
        </Card>
    );
};
export default SignUp;
