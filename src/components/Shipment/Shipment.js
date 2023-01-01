import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { BusContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const navigate = useNavigate();
    const [loggedInUser] = useContext(BusContext);
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = () => {
        //alert(location.state?.emptyCart);
        alert("Shipment placed!");
        navigate("/");
    };
    return (
        <form className='ship-form col-md-4 col-md-offset-4' onSubmit={handleSubmit(onSubmit)}>
            <h1>Shipment Information</h1>
            <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="Your name" />
            {errors.name && <span className='error'>Name is required</span>}

            <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="Your email" />
            {errors.email && <span className='error'>Email is required</span>}

            <input {...register("address", { required: true })} placeholder="Your address" />
            {errors.address && <span className='error'>Address is required</span>}

            <input {...register("phone", { required: true })} placeholder="Your phone number" />
            {errors.phone && <span className='error'>Phone number is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;