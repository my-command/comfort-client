import React, { useState } from 'react';

const CustomChair = () => {
  const [color, setColor] = useState('#ffffff');
  const [material, setMaterial] = useState('Wood');
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    setCart([...cart, { color, material }]);
    alert('Custom chair added to cart!');
  };

  return (
    <div className="custom-chair">
      <h1>Customize Your Chair</h1>
      <div>
        <label>Choose Color:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div>
        <label>Choose Material:</label>
        <select value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="Wood">Wood</option>
          <option value="Metal">Metal</option>
          <option value="Plastic">Plastic</option>
        </select>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default CustomChair;
