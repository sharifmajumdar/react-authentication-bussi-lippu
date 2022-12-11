import React from 'react';
import { Link } from 'react-router-dom';
import IMG from "../../images/bus3.jpg";
import { useState, useEffect } from 'react';
import Data from '../../data/Data.json';

const Home = () => {
    const [passes, setPasses] = useState([]);
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
                                <div className="col-sm-3" key={pass.key}>
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
                        {/*                         <div class="col-sm-3">
                            <div class="card border-primary bg-light">
                                <div class="card-body">
                                    <h1 class="card-title">One Day Pass</h1>
                                    <p class="card-text" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eligendi repellat voluptates eveniet, nam inventore deserunt culpa iste rem. Quisquam commodi nobis accusantium autem, itaque eveniet saepe nisi non inventore.</p>
                                    <Link class="nav-item nav-link" to="/order" className='btn btn-primary shadow'>Buy Now</Link>
                                </div>
                                <div class="card-footer">
                                    <h3>€20/Day</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="card border-primary bg-light">
                                <div class="card-body">
                                    <h1 class="card-title">Monthly Pass</h1>
                                    <p class="card-text" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eligendi repellat voluptates eveniet, nam inventore deserunt culpa iste rem. Quisquam commodi nobis accusantium autem, itaque eveniet saepe nisi non inventore.</p>
                                    <Link class="nav-item nav-link" to="/order" className='btn btn-primary shadow'>Buy Now</Link>
                                </div>
                                <div class="card-footer">
                                    <h3>€50/Month</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="card border-primary bg-light">
                                <div class="card-body">
                                    <h1 class="card-title">Annual Pass</h1>
                                    <p class="card-text" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eligendi repellat voluptates eveniet, nam inventore deserunt culpa iste rem. Quisquam commodi nobis accusantium autem, itaque eveniet saepe nisi non inventore.</p>
                                    <Link class="nav-item nav-link" to="/order" className='btn btn-primary shadow'>Buy Now</Link>
                                </div>
                                <div class="card-footer">
                                    <h3>€500/Year</h3>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="section mt-5">
                <div className="card bg-dark text-white">
                    <img className="card-img" src={IMG} alt="Card" />
                    <div className="card-img-overlay">
                        <h5 className="card-title">City services</h5>
                        <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur eveniet odit dolor voluptatibus, sint laboriosam eius, ut ducimus sequi iure ad aperiam ipsum vel delectus. Nulla consectetur ducimus tempora veniam!</p>
                        <p className="card-text">Last updated 3 mins ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;