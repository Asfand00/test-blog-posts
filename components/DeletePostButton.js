import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function DeletePostButton({ postId }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      return postId;
    },
    {
      onSuccess: (deletedPostId) => {
        queryClient.setQueryData(['posts'], (oldData) =>
          oldData.filter((post) => post.id !== deletedPostId)
        );
      },
    }
  );

  const handleDelete = () => {
    mutation.mutate();
  };

  return <button onClick={handleDelete}>Delete Post</button>;
}

export default DeletePostButton;
