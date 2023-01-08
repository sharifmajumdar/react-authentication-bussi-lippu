import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BusContext } from '../../App';
import './Contact.css';

const Contact = () => {
    const navigate = useNavigate();
    const [loggedInUser] = useContext(BusContext); // Getting data from context API
    // I have applied react useForm hook to handle the contact form with validation 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        alert("Message sent!");
        navigate("/", { replace: true });
    };
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-xs-12'>
                    <form className='ship-form col-md-4 col-md-offset-4' onSubmit={handleSubmit(onSubmit)}>
                        <h1>Contact Information</h1>
                        <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="Your name" />
                        {errors.name && <span className='error'>Name is required</span>}

                        <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="Your email" />
                        {errors.email && <span className='error'>Email is required</span>} <br />

                        <textarea {...register("message", { required: true })} placeholder="Your message" rows="7" cols="39"></textarea>
                        {errors.message && <span className='error'>Message is required</span>}

                        <input type="submit" /> <br />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;