import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: { name: 'Test Blog User' } // Mock blog user object
  };

  const user = {
    name: 'Test User' // Mock user object
  };

  const component = render(
    <Blog blog={blog} user={user} /> // Pass both blog and user props
  );

  // Simulate clicking the button to show details
  const button = component.getByText('Show details');
  fireEvent.click(button);

  expect(component.getByText('Test Blog Title')).toBeInTheDocument();
  expect(component.getByText('Author: Test Author')).toBeInTheDocument();
  expect(component.getByText('URL: http://testblog.com')).toBeInTheDocument();
  expect(component.getByText('Likes: 5')).toBeInTheDocument();
});

test('blog URL and likes are shown when the details button is clicked', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: { name: 'Test Blog User' } // Mock blog user object
  };

  const user = {
    name: 'Test User' // Mock user object
  };

  const component = render(
    <Blog blog={blog} user={user} /> // Pass both blog and user props
  );

  // Find and click the button to show details
  const button = component.getByText('Show details');
  fireEvent.click(button);

  // Check that URL and likes are now visible
  const url = component.getByText('URL: http://testblog.com');
  const likes = component.getByText('Likes: 5');

  expect(url).toBeVisible();
  expect(likes).toBeVisible();
});