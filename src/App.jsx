import { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import { selectCartCount } from './CartSlice.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const cartCount = useSelector(selectCartCount);
  const go = (destination) => { setPage(destination); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  if (page === 'home') return <main className="landing">
    <div className="landing-photo" />
    <div className="landing-top"><a href="#home" className="brand" onClick={(event) => { event.preventDefault(); go('home'); }}><span className="brand-icon">✳</span><span>paradise<span className="brand-light">nursery</span></span></a><button className="button button-light" onClick={() => go('plants')}>Shop plants <span aria-hidden="true">→</span></button></div>
    <section className="hero-copy" id="home"><p className="eyebrow">A breath of fresh air</p><h1>Make room<br />for <em>something</em><br /><em>growing.</em></h1><p className="hero-description">Thoughtful houseplants for slower mornings, brighter corners, and a home that feels more like you.</p><button className="button button-light hero-cta" onClick={() => go('plants')}>Get Started <span aria-hidden="true">→</span></button></section>
    <div className="hero-caption"><span>01 — Living well, naturally</span><span>Grown for the way you live</span></div>
    <div className="landing-about"><AboutUs /><button className="button button-dark" onClick={() => go('plants')}>Meet your new plant <span aria-hidden="true">→</span></button></div>
  </main>;

  return <div className="app-shell"><header className="site-header"><a href="#home" className="brand" onClick={(event) => { event.preventDefault(); go('home'); }}><span className="brand-icon">✳</span><span>paradise<span className="brand-light">nursery</span></span></a><nav aria-label="Main navigation"><button className={page === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => go('home')}>Home</button><button className={page === 'plants' ? 'nav-link active' : 'nav-link'} onClick={() => go('plants')}>Plants</button><button className={page === 'cart' ? 'nav-link active' : 'nav-link'} onClick={() => go('cart')}>Cart <span className="cart-badge">{cartCount}</span></button></nav><button className="button button-dark header-cta" onClick={() => go('plants')}>Find a plant <span aria-hidden="true">→</span></button></header>
    {page === 'plants' ? <ProductList /> : <CartItem onContinueShopping={() => go('plants')} />}
    <footer className="site-footer"><span>✳ paradise nursery</span><span>Grow a little greener.</span><span>Made for plant people, new and old.</span></footer>
  </div>;
}
