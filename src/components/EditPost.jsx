import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to update a post
const updatePost = async (post) => {
  const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
  return data;
};

const EditPost = ({ post, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ ...post, title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button type="submit">Update Post</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditPost;
