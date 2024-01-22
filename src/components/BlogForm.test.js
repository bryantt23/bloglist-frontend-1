import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'; // Make sure to import 'screen'
import React from 'react';
import BlogForm from './BlogForm';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({})), // Mock the Axios post method
}));

test('calls the event handler with the right details when a new blog is created', async () => {
  const mockSendNotification = jest.fn();
  const mockGetBlogsFromApi = jest.fn();

  render(
    <BlogForm
      setShowBlogForm={() => {}}
      user={{ token: 'testToken' }}
      sendNotification={mockSendNotification}
      getBlogsFromApi={mockGetBlogsFromApi}
    />
  );

  // Simulate user input
  fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Title' } });
  fireEvent.change(screen.getByTestId('author-input'), { target: { value: 'Test Author' } });
  fireEvent.change(screen.getByTestId('url-input'), { target: { value: 'http://testurl.com' } });

  // Simulate form submission
  fireEvent.click(screen.getByText('add'));

  // Assert that the mock functions were called
  await waitFor(() => {
    expect(mockSendNotification).toHaveBeenCalled();
    expect(mockGetBlogsFromApi).toHaveBeenCalled();
  });
});
