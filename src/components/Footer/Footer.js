import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <section className='section footer bg-dark text-white mt-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <h5>Ticket Information</h5>
                            <hr />
                            <p style={{ textAlign: "justify" }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, tempora aliquam. Possimus qui nemo magni, neque iusto labore, odit natus at modi perferendis explicabo amet sapiente tempore ratione ea itaque.</p>
                        </div>
                        <div className='col-md-4'>
                            <h5>Quick Links</h5>
                            <hr />
                            <div><Link to="/" style={{textDecoration: "none"}}>Home</Link></div>
                            <div><Link to="/services" style={{textDecoration: "none"}}>Services</Link></div>
                            <div><Link to="/blog" style={{textDecoration: "none"}}>Blog</Link></div>
                            <div><Link to="/contact" style={{textDecoration: "none"}}>Contact</Link></div>
                        </div>
                        <div className='col-md-4'>
                            <h5>Contact Information</h5>
                            <hr />
                            <div><p className='text-white mb-1'>#9, Latolankatu, Joensuu</p></div>
                            <div><p className='text-white mb-1'>+358 400000000</p></div>
                            <div><p className='text-white mb-1'>email@domain.com</p></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;