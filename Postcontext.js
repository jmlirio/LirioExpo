import React, { createContext, useState } from 'react';

export const Postcontext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPost = async (title, description, user_id) => {
    const newPost = { title, description, user_id };
  
    const response = await fetch('http://192.168.100.3:3001/Posts/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    });
  
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
  
    const post = await response.json();
  
    setPosts(prevPosts => [...prevPosts, post]);

    fetchPosts();
  };

  const fetchPosts = async () => {
    const response = await fetch('http://192.168.100.3:3001/Posts');
    const posts = await response.json();
    setPosts(posts);
  };

  const updatePost = async (id, updatedPost) => {
    try {
      const response = await fetch(`http://192.168.100.3:3001/Posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
  
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
  
      fetchPosts();
    } catch (error) {
      console.error('Failed to update post: ', error);
    }
  };
  
  const deletePost = async (id) => {
    try {
      const response = await fetch(`http://192.168.100.3:3001/Posts/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
  
      fetchPosts();
    } catch (error) {
      console.error('Failed to delete post: ', error);
    }
  };

  return (
    <Postcontext.Provider value={{ posts, addPost, updatePost, deletePost, fetchPosts }}>
      {children}
    </Postcontext.Provider>
  );
};