import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

// components
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  const fetchSmoothies = async () => {
    const { data, error } = await supabase
    .from('smoothies')
    .select()
    .order('title' , { ascending: false })
    
    if (error) {
      setFetchError("Could not fetch smoothies");
      setSmoothies(null);
      console.log(error);
    }
    
    if (data) {
      setSmoothies(data);
      setFetchError(null);
    }
  }

  // Create a function to handle inserts
  const handleDBChanges = (payload) => {
    fetchSmoothies();
    console.log('Change received!', payload)
  }
  useEffect(() => {
    fetchSmoothies();

    // Listen to inserts
    supabase
      .channel('smoothies')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'smoothies' }, handleDBChanges)
      .subscribe();
  }, []);

  const handleDelete = async (id) => {
    
    const { error } = await supabase
    .from('smoothies')
    .delete()
    .eq('id', id)

    if (error) {
      alert('Error Deleting');
    }
    if (!error) {
      fetchSmoothies();
      alert('Deleted Successfully');
    }
            
  }
  
  return (
    <div className="page home">
        {fetchError && (<p>{fetchError}</p>)}
        {smoothies && (
          <div className="smoothies">
            <div className="smoothies-grid">
              {
                smoothies.map((smoothie, index) => (
                  <SmoothieCard key={smoothie.id} smoothie={smoothie} handleDelete={handleDelete} />
                ))
              }
            </div>
          </div>
        )}
    </div>
  )
}

export default Home