import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostList from './PostList';
import UserSelector from './UserSelector';

// Function to fetch posts from the API
const fetchPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

// Function to fetch users from the API
const fetchUsers = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};


const Posts = ({ onEdit, onDelete }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { data: posts, error: postsError, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const { data: users, error: usersError, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (postsLoading || usersLoading) return <p>Loading...</p>;
  if (postsError) return <p>An error occurred while fetching posts: {postsError.message}</p>;
  if (usersError) return <p>An error occurred while fetching users: {usersError.message}</p>;

  return (
    <div>
      <UserSelector users={users} onUserSelect={setSelectedUserId} />
      <PostList posts={posts} selectedUserId={selectedUserId} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default Posts;
