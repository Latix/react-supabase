import { useState } from 'react';
import supabase from "../config/supabaseClient";

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !method || !rating) {
      alert('Provide all fields');
      return;
    }
    
    const {error} = await supabase
    .from('smoothies')
    .insert([{title, method, rating}]);
    
    if(!error) {
      alert('Smooothie Added');
    }
  }

  return (
    <div className="page create">
      <h2>Create</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Method" value={method} onChange={(e) => setMethod(e.target.value)} />
        <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
        <input type="submit" value="Create" />
      </form>
    </div>
  )
}

export default Create