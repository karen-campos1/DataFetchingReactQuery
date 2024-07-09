import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

const queryClient = new QueryClient();

const App = () => {
  const [editingPost, setEditingPost] = useState(null);


  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 className='title'>SE React Query </h1>
        <CreatePost />
        <Posts
          onEdit={(post) => {
            console.log('Setting editing post:', post); 
            setEditingPost(post);
          }}
          onDelete={(postId) => alert(`Post ${postId} deleted`)}
        />
        {editingPost && (
          <EditPost
            post={editingPost}
            onClose={() => {
              console.log('Closing edit post'); 
              setEditingPost(null);
            }}
          />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
