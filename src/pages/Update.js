import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from "../config/supabaseClient";

const Update = () => {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()


      if (error) {
        alert("No Smoothie");
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    }

    fetchSmoothie();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('smoothies')
      .update({ title, method, rating })
      .eq('id', id)
      .select()
      
      if (error) {
        alert('Error Updating!')
        console.log(error);
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        alert('Updated!')
      }
  }

  return (
    <div className="page update">
    <h2>Create</h2>
    <form onSubmit={handleUpdate}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Method" value={method} onChange={(e) => setMethod(e.target.value)} />
      <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
      <input type="submit" value="Update" />
    </form>
  </div>
  )
}

export default Update