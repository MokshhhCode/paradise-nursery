import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from './CartSlice.jsx';

const products = [
  { id: 'monstera', name: 'Monstera Deliciosa', price: 28, category: 'Statement makers', note: 'Iconic leaves, easygoing nature', image: 'photo-1614594975525-e45190c55d0b' },
  { id: 'fiddle', name: 'Fiddle Leaf Fig', price: 42, category: 'Statement makers', note: 'A sculptural favorite for bright rooms', image: 'photo-1501004318641-b39e6451bec6' },
  { id: 'rubber', name: 'Ruby Rubber Plant', price: 34, category: 'Statement makers', note: 'Glossy leaves with a rosy glow', image: 'photo-1485955900006-10f4d324d411' },
  { id: 'snake', name: 'Snake Plant', price: 24, category: 'Easy-care greens', note: 'Nearly unbothered, always elegant', image: 'photo-1593691509543-c55fb32e5cee' },
  { id: 'zz', name: 'ZZ Plant', price: 26, category: 'Easy-care greens', note: 'Shiny foliage that loves to take it slow', image: 'photo-1509423350716-97f9360b4e09' },
  { id: 'pothos', name: 'Golden Pothos', price: 18, category: 'Easy-care greens', note: 'A trailing classic for any shelf', image: 'photo-1497250681960-ef046c08a56e' },
  { id: 'calathea', name: 'Calathea Orbifolia', price: 32, category: 'Color & texture', note: 'Silvery stripes with a soft finish', image: 'photo-1597055181300-ae9c9b9d3f1f' },
  { id: 'peperomia', name: 'Peperomia Hope', price: 22, category: 'Color & texture', note: 'Sweet round leaves, compact and cheerful', image: 'photo-1494438639946-1ebd1d20bf85' },
  { id: 'prayer', name: 'Prayer Plant', price: 27, category: 'Color & texture', note: 'Painterly leaves that move with the day', image: 'photo-1509423350716-97f9360b4e09' },
  { id: 'fern', name: 'Bird’s Nest Fern', price: 25, category: 'Easy-care greens', note: 'Fresh, ruffled fronds for a quiet corner', image: 'photo-1463320726281-696a485928c7' },
  { id: 'bird', name: 'Bird of Paradise', price: 58, category: 'Statement makers', note: 'Bring a little holiday feeling indoors', image: 'photo-1501004318641-b39e6451bec6' },
  { id: 'pilea', name: 'Chinese Money Plant', price: 21, category: 'Color & texture', note: 'Playful round leaves, easy to share', image: 'photo-1459156212016-c812468e2115' },
  { id: 'alocasia', name: 'Alocasia Polly', price: 36, category: 'Statement makers', note: 'Dramatic arrow leaves with silvery veins', image: 'photo-1509423350716-97f9360b4e09' },
  { id: 'dracaena', name: 'Dracaena Marginata', price: 31, category: 'Statement makers', note: 'Sculptural shape with a relaxed footprint', image: 'photo-1485955900006-10f4d324d411' },
  { id: 'castiron', name: 'Cast Iron Plant', price: 29, category: 'Easy-care greens', note: 'A sturdy beauty for low-light corners', image: 'photo-1463320726281-696a485928c7' },
  { id: 'heartleaf', name: 'Heartleaf Philodendron', price: 19, category: 'Easy-care greens', note: 'A forgiving trailing plant with heart', image: 'photo-1497250681960-ef046c08a56e' },
  { id: 'polkadot', name: 'Polka Dot Begonia', price: 33, category: 'Color & texture', note: 'Playful spotted leaves with ruby undersides', image: 'photo-1494438639946-1ebd1d20bf85' },
  { id: 'croton', name: 'Petra Croton', price: 30, category: 'Color & texture', note: 'A bright burst of orange, gold, and green', image: 'photo-1459156212016-c812468e2115' },
];
const categories = ['All plants', 'Statement makers', 'Easy-care greens', 'Color & texture'];

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState('All plants');
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const visible = activeCategory === 'All plants' ? products : products.filter((plant) => plant.category === activeCategory);

  return <main className="shop-page page-wrap">
    <div className="shop-heading"><div><p className="eyebrow">Find your new favorite</p><h1>Plants for your happy place.</h1></div><p>Good things grow here. Choose a leafy friend to bring a little more green into your everyday.</p></div>
    <div className="category-tabs" role="tablist" aria-label="Plant categories">{categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
    <div className="product-grid">{visible.map((plant) => {
      const added = cartItems.some((item) => item.id === plant.id);
      return <article className="product-card" key={plant.id}>
        <div className="product-photo-wrap"><img className="product-photo" src={'https://images.unsplash.com/' + plant.image + '?auto=format&fit=crop&w=900&q=85'} alt={plant.name} loading="lazy" /><span className="plant-tag">{plant.category}</span></div>
        <div className="product-info"><div><h3>{plant.name}</h3><p>{plant.note}</p></div><strong className="price">{'$' + plant.price.toFixed(2)}</strong></div>
        <button className={added ? 'button button-added' : 'button button-dark add-button'} disabled={added} onClick={() => dispatch(addToCart(plant))}>{added ? '✓ Added to cart' : <>Add to cart <span aria-hidden="true">＋</span></>}</button>
      </article>;
    })}</div>
  </main>;
}
