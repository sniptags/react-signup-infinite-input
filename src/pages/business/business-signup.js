import React from "react";
import SignUp from "../../components/business/signup-form";
import { useSelector } from "react-redux";
const BusinessSignUp = () => {
    const cities=useSelector(state=>state.city.cities)
    const categories=useSelector(state=>state.category.categories)
    const services=useSelector(state=>state.service.services)
    const data ={cities,categories,services}
    return <SignUp page="signup" formFieldData={data}/>;
};
export default BusinessSignUp;
