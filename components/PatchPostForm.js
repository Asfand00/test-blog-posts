import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function PatchPostForm({ postId }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (updatedTitle) => {
      const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedTitle);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedTitle = { title: form.title.value };
    mutation.mutate(updatedTitle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="New Title" required />
      <button type="submit">Update Title</button>
    </form>
  );
}

export default PatchPostForm;
