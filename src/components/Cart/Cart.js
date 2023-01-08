import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    let passTitle = [""];
    let numberOfPasses = 0;
    let msg = "";
    let msg2 = "";

    cart.map(pass => 
        numberOfPasses >= 4? msg = "You can not select more than 4 passess!!!" :
        passTitle.includes(pass.title)? msg2 = "Same pass can not added twice!!!" : 
            (numberOfPasses += 1,
            total = total + Number(pass.price),
            passTitle = passTitle + numberOfPasses + (". ") + pass.title + (" "))
        )

    return (
        <div>
            <h3>Cart Summary</h3>
            <hr />
            <small><b>Course Selected: </b>{numberOfPasses}</small><br />
            <small><b>Total Price: </b> EUR{total}</small><br />
            <small><b>Course List:</b> {passTitle}</small> <br /><br />
            <div>
                {
                    props.children
                }              
            </div> <br />
            <span>{msg}</span><br />
            <span>{msg2}</span>
        </div>
    );
};

export default Cart;