import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Adjust the path to your store
import App from '../components/BooksContainer';

describe('App', () => {
  it('renders the Vite + React text', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Books/i)).toBeInTheDocument();
  });
});