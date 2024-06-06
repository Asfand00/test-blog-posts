import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function FilterPosts({ userId }) {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const fetchPosts = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (!userId) {
        // If userId is not provided, fetch all posts
        response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      } else {
        // If userId is provided, fetch posts filtered by userId
        response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      }
      setFilteredPosts(response.data);
      // Update cache
      queryClient.setQueryData(['posts', userId], response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const userId = event.target.value;
    fetchPosts(userId);
  };

  // Fetch initial data on component mount
  React.useEffect(() => {
    fetchPosts(userId);
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input type="text" placeholder="Filter by User ID" onChange={handleChange} />
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterPosts;

