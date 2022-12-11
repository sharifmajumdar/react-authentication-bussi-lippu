import React from 'react';

const ReviewItem = (props) => {
    const {title, price, key} = props.pass;
    const reviewStyle ={
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        paddingTop: '5px',
        marginLeft: '250px',
    }
    return (
        <div style={reviewStyle}>
            <h4 style={{color: 'blue'}}>Course Title: {title}</h4> 
            <h6>Regular Price: {price}</h6>
            <button className='btn btn-primary'
                onClick={() => props.removePass(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;