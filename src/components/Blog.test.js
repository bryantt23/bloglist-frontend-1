import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';
import blogService from '../services/blogs'; // Import the service

jest.mock('../services/blogs'); // Mock the blogService module

test('like button event handler is called twice when clicked twice', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: { name: 'Test User' },
    _id: 'testId' // Mock _id for the blog
  };

  const mockSendNotification = jest.fn();
  const mockGetBlogsFromApi = jest.fn();

  // Reset mock before each test
  blogService.updateBlog.mockClear();
  mockSendNotification.mockClear();

  const component = render(
    <Blog blog={blog} sendNotification={mockSendNotification} getBlogsFromApi={mockGetBlogsFromApi} user={{ name: 'Test User' }} />
  );

  // Simulate clicking the 'Show details' button
  const detailsButton = component.getByText('Show details');
  fireEvent.click(detailsButton);

  // Find the like button and click it twice
  const likeButton = component.getByText('Like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  // Assert that the blogService.updateBlog function was called exactly twice
  expect(blogService.updateBlog).toHaveBeenCalledTimes(2);
});

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
