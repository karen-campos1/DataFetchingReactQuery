import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import PostContent from './PostContent';
import PostList from './PostList';

// Function to create a new post
const createPost = async (newPost) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  console.log('Post created:', data);
  return data;
};

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      setPosts((prevPosts) => [...prevPosts, newPost]);
      console.log('Post creation successful');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { title, body });
    mutation.mutate({ title, body });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Body: </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      <PostList posts={posts} />
    </>
  );
};

export default CreatePost;
