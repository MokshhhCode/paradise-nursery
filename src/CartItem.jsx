import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart, selectCartItems, selectCartTotal } from './CartSlice.jsx';

export default function CartItem({ onContinueShopping }) {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (!items.length) return <main className="cart-page page-wrap"><p className="eyebrow">Your basket</p><h1>Your cart is taking a little breather.</h1><div className="empty-cart"><div className="empty-icon">♧</div><p>It’s looking a bit leafy-free in here. Find a plant that feels like you.</p><button className="button button-dark" onClick={onContinueShopping}>Continue shopping <span aria-hidden="true">→</span></button></div></main>;

  return <main className="cart-page page-wrap"><div className="cart-title-row"><div><p className="eyebrow">Your basket</p><h1>A little green is on its way.</h1></div><button className="text-button" onClick={onContinueShopping}>← Continue shopping</button></div>
    <div className="cart-layout"><section className="cart-list" aria-label="Items in your cart">{items.map((item) => <article className="cart-row" key={item.id}>
      <img src={'https://images.unsplash.com/' + item.image + '?auto=format&fit=crop&w=300&q=80'} alt="" />
      <div className="cart-product"><h2>{item.name}</h2><p>{item.category}</p><button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button></div>
      <div className="quantity-control" aria-label={'Quantity for ' + item.name}><button aria-label="Decrease quantity" disabled={item.quantity === 1} onClick={() => dispatch(decreaseQuantity(item.id))}>−</button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => dispatch(increaseQuantity(item.id))}>＋</button></div>
      <strong className="line-total">{'$' + (item.price * item.quantity).toFixed(2)}</strong>
    </article>)}</section>
    <aside className="order-summary"><p className="eyebrow">A quick recap</p><h2>Order summary</h2><div className="summary-line"><span>Plants ({items.reduce((sum, item) => sum + item.quantity, 0)})</span><span>{'$' + total.toFixed(2)}</span></div><div className="summary-line muted"><span>Shipping</span><span>Calculated at checkout</span></div><div className="summary-total"><span>Subtotal</span><strong>{'$' + total.toFixed(2)}</strong></div><button className="button button-dark checkout-button" onClick={() => window.alert('Checkout is coming soon. Your plants are safely in your cart!')}>Checkout <span aria-hidden="true">→</span></button><p className="secure-note">A little joy, delivered with care.</p></aside></div>
  </main>;
}
