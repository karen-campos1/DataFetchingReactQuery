import React, { useMemo } from 'react';
import PostContent from './PostContent';

const PostList = ({ posts, selectedUserId, onEdit, onDelete }) => {
  // Use useMemo to memoize the filtered posts
  const filteredPosts = useMemo(() => {
    return selectedUserId ? posts.filter(post => post.userId === selectedUserId) : posts;
  }, [posts, selectedUserId]);

  return (
    <div>
      {filteredPosts.map(post => (
        <div key={post.id}>
          <PostContent content={post} />
          <button onClick={() => onEdit(post)}>Edit</button>
          <button onClick={() => onDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
