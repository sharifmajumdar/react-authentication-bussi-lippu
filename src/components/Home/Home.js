import { Link } from 'react-router-dom';
import IMG from "../../images/bus3.jpg";
import { useState, useEffect } from 'react';
import Data from '../../data/Data.json';

const Home = () => {
    const [passes, setPasses] = useState([]);

    // Here fake data have been read using useEffect and set them into setPasses function to update the state
    useEffect(() => {
        setPasses(Data);
    }, [passes]);
    return (
        <div>
            <div className='section mt-5'>
                <div className='container'>
                    <div className="row">
                        {
                            passes && passes.map(pass =>
                                <div className="col-lg-3 col-md-4 col-xs-12" key={pass.key}>
                                    <div className="card border-primary bg-light">
                                        <div className="card-body">
                                            <h1 className="card-title"><span>{pass.title}</span></h1>
{                                            <p className="card-text" style={{ textAlign: "justify" }}><span>{pass.type}</span></p>}
                                            <button className='btn btn-info'>
                                                <Link style={{ textDecoration: "none", color: "white" }} to={`/services`}>Click here for details</Link>
                                            </button>
                                        </div>
                                        <div className="card-footer">
                                            <h3>€<span>{pass.price}</span></h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="section mt-5">
                <div className="col-12 card bg-dark text-white">
                    <img className="card-img" src={IMG} alt="Card" />
                    <div className="card-img-overlay">
                        <h5 className="card-title">City services</h5>
                        <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur eveniet odit dolor voluptatibus, sint laboriosam eius, ut ducimus sequi iure ad aperiam ipsum vel delectus!</p>
                        <p className="card-text">Last updated 3 mins ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;