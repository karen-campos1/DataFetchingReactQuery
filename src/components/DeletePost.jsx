import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to delete a post
const deletePost = async (postId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
};

const DeletePost = ({ postId }) => {
  const queryClient = useQueryClient();

  // Use the useMutation hook to handle post deletion
  const mutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('Post deleted successfully');
    },
  });

  return (
    <button onClick={() => mutation.mutate()}>Delete Post</button>
  );
};

export default DeletePost;
