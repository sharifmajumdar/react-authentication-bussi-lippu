import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Data from '../../data/Data.json';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';

const Order = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    //const [isProceedCheckout, setIsProceedCheckout] = useState(false);
    const navigate = useNavigate();

    //This section handle the placing of order and free the cart 
    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        processOrder();
        const confirmMessage = 'Order Placed!';
        setCart([]);
        return confirmMessage;
    }

    const handleProceedCheckout = (e) => {
        navigate('/shipment', { state: { handlePlaceOrder: handlePlaceOrder() } });
    }

    //Revome the unnecessay item and update the cart 
    const removePass = (passKey) => {
        const newCart = cart.filter(ps => ps.key !== passKey);
        setCart(newCart);
        removeFromDatabaseCart(passKey);
    };

    //Fetch item from local storage by using object keys and set it to the cart
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const passKeys = Object.keys(savedCart);

        const cartPasses = passKeys.map(key => {
            const pass = Data.find(ps => ps.key === Number(key));
            return pass;
        });
        setCart(cartPasses);
    }, []);

    return (
        <div className='row'>
            <div className="col-lg-8 col-xs-12">
                {
                    cart.map(ps => <ReviewItem 
                        key = {ps.key}
                        pass = {ps}
                        removePass = {removePass}></ReviewItem>)
                }
                { orderPlaced && <h1 style={{marginLeft: "250px", color: "green"}}>Order has been placed!!!</h1> }
                { cart.length < 1 && orderPlaced === false? <h1 style={{marginLeft: "250px", color: "red"}}>No item selected yet! Please choose an item</h1>:null}
            </div>
            <div className='col-lg-4 col-xs-12'>
                <div>
                    <Cart cart = {cart}>
                        {
                            cart.length >=1 && orderPlaced === false?
                                <button type="button" onClick={handleProceedCheckout} className='btn btn-info place-button'>
                                    <FontAwesomeIcon icon={faHandPointer} /> Proceed Checkout
                                </button>:null
                        }
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Order;