import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import BooksContainer from '../components/BooksContainer';
import { fetchBooks, Book } from '../redux/bookSlice';
import React from 'react'

jest.mock('../components/BookCard', () => ({ data }: { data: Book }) => (
  <div data-testid="book-card">{data.bookName}</div>
));
jest.mock('../components/BookCardShimmer', () => () => (
  <div data-testid="shimmer">Shimmer</div>
));

jest.mock('../redux/bookSlice', () => ({
  ...jest.requireActual('../redux/bookSlice'),
  fetchBooks: jest.fn(() => async (dispatch: any) => {
    dispatch({ type: 'books/fetchBooks/pending' });
    dispatch({
      type: 'books/fetchBooks/fulfilled',
      payload: [
        { _id: '1', bookName: 'Book 1', discountPrice: 10, quantity: 5, rating: 4, author: 'Author 1', description: 'Desc 1' },
        { _id: '2', bookName: 'Book 2', discountPrice: 20, quantity: 3, rating: 3, author: 'Author 2', description: 'Desc 2' },
      ],
    });
  }),
}));

const localStorageMock = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn(),
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('BooksContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('renders shimmer placeholders when status is idle', () => {
    const mockStore = configureStore({
      reducer: {
        books: () => ({ allBooks: [], status: 'idle', error: null }),
        search: () => ({ query: '' }),
      },
    });

    render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    expect(screen.getByText('(Loading...)')).toBeInTheDocument();
    expect(screen.getAllByTestId('shimmer')).toHaveLength(12);
  });

  test('dispatches fetchBooks when status is idle', () => {
    const mockStore = configureStore({
      reducer: {
        books: () => ({ allBooks: [], status: 'idle', error: null }),
        search: () => ({ query: '' }),
      },
    });

    render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    expect(fetchBooks).toHaveBeenCalledTimes(1);
    expect(screen.getByText('(Loading...)')).toBeInTheDocument();
  });

  test('renders book cards when status is succeeded', () => {
    const mockStore = configureStore({
      reducer: {
        books: () => ({
          allBooks: [
            { _id: '1', bookName: 'Book 1', discountPrice: 10, quantity: 5, rating: 4, author: 'Author 1', description: 'Desc 1' },
            { _id: '2', bookName: 'Book 2', discountPrice: 20, quantity: 3, rating: 3, author: 'Author 2', description: 'Desc 2' },
          ],
          status: 'succeeded',
          error: null,
        }),
        search: () => ({ query: '' }),
      },
    });

    render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    expect(screen.getByText('(2 Books)')).toBeInTheDocument();
    expect(screen.getAllByTestId('book-card')).toHaveLength(2);
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
  });

  test('filters books based on search query', () => {
    const mockStore = configureStore({
      reducer: {
        books: () => ({
          allBooks: [
            { _id: '1', bookName: 'Book 1', discountPrice: 10, quantity: 5, rating: 4, author: 'Author 1', description: 'Desc 1' },
            { _id: '2', bookName: 'Book 2', discountPrice: 20, quantity: 3, rating: 3, author: 'Author 2', description: 'Desc 2' },
          ],
          status: 'succeeded',
          error: null,
        }),
        search: () => ({ query: 'Book 1' }),
      },
    });

    render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    expect(screen.getByText('(1 of 2 Books)')).toBeInTheDocument();
    expect(screen.getAllByTestId('book-card')).toHaveLength(1);
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.queryByText('Book 2')).not.toBeInTheDocument();
  });

  test('shows no books found message when search query matches no books', () => {
    const mockStore = configureStore({
      reducer: {
        books: () => ({
          allBooks: [
            { _id: '1', bookName: 'Book 1', discountPrice: 10, quantity: 5, rating: 4, author: 'Author 1', description: 'Desc 1' },
          ],
          status: 'succeeded',
          error: null,
        }),
        search: () => ({ query: 'Nonexistent' }),
      },
    });

    render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    expect(screen.getByText('No books found matching "Nonexistent"')).toBeInTheDocument();
    expect(screen.queryAllByTestId('book-card')).toHaveLength(0);
  });


  test('sorts books by price low-to-high', () => {
    const mockStore = configureStore({
      reducer: {
        books: () => ({
          allBooks: [
            { _id: '1', bookName: 'Book 1', discountPrice: 20, quantity: 5, rating: 4, author: 'Author 1', description: 'Desc 1' },
            { _id: '2', bookName: 'Book 2', discountPrice: 10, quantity: 3, rating: 3, author: 'Author 2', description: 'Desc 2' },
          ],
          status: 'succeeded',
          error: null,
        }),
        search: () => ({ query: '' }),
      },
    });

    const { rerender } = render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    rerender(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );
    const bookCards = screen.getAllByTestId('book-card');

    expect(bookCards[0]).toHaveTextContent('Book 1');
    expect(bookCards[1]).toHaveTextContent('Book 2');
  });

  test('sorts books by price high-to-low', () => {
    const mockStore = configureStore({
      reducer: {
        books: () => ({
          allBooks: [
            { _id: '1', bookName: 'Book 1', discountPrice: 20, quantity: 5, rating: 4, author: 'Author 1', description: 'Desc 1' },
            { _id: '2', bookName: 'Book 2', discountPrice: 10, quantity: 3, rating: 3, author: 'Author 2', description: 'Desc 2' },
          ],
          status: 'succeeded',
          error: null,
        }),
        search: () => ({ query: '' }),
      },
    });

    const { rerender } = render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    rerender(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );
    const bookCards = screen.getAllByTestId('book-card');

    expect(bookCards[0]).toHaveTextContent('Book 1');
    expect(bookCards[1]).toHaveTextContent('Book 2');
  });

  test('sorts books by price low-to-high when sortValue is set', () => {
    const mockStore = configureStore({
      reducer: {
        books: () => ({
          allBooks: [
            { _id: '1', bookName: 'Book 1', discountPrice: 20, quantity: 5, rating: 4, author: 'Author 1', description: 'Desc 1' },
            { _id: '2', bookName: 'Book 2', discountPrice: 10, quantity: 3, rating: 3, author: 'Author 2', description: 'Desc 2' },
          ],
          status: 'succeeded',
          error: null,
        }),
        search: () => ({ query: '' }),
      },
    });

    jest.spyOn(React, 'useState').mockImplementationOnce(() => ['low-to-high', jest.fn()]);

    render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    const bookCards = screen.getAllByTestId('book-card');
    expect(bookCards[0]).toHaveTextContent('Book 2');
    expect(bookCards[1]).toHaveTextContent('Book 1');
  });

  test('handles pagination with more than 12 books', () => {
    const books = Array.from({ length: 15 }, (_, i) => ({
      _id: `${i + 1}`,
      bookName: `Book ${i + 1}`,
      discountPrice: 10 + i,
      quantity: 5,
      rating: 4,
      author: `Author ${i + 1}`,
      description: `Desc ${i + 1}`,
    }));

    const mockStore = configureStore({
      reducer: {
        books: () => ({
          allBooks: books,
          status: 'succeeded',
          error: null,
        }),
        search: () => ({ query: '' }),
      },
    });

    render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    expect(screen.getByText('(15 Books)')).toBeInTheDocument();
    expect(screen.getAllByTestId('book-card')).toHaveLength(12);
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.queryByText('Book 13')).not.toBeInTheDocument();
  });

  test('resets to page 1 when search query changes', () => {
    const mockStore = configureStore({
      reducer: {
        books: () => ({
          allBooks: [
            { _id: '1', bookName: 'Book 1', discountPrice: 10, quantity: 5, rating: 4, author: 'Author 1', description: 'Desc 1' },
          ],
          status: 'succeeded',
          error: null,
        }),
        search: () => ({ query: 'Book 1' }),
      },
    });

    localStorageMock.getItem.mockReturnValue('2');
    render(
      <Provider store={mockStore}>
        <BooksContainer />
      </Provider>
    );

    expect(localStorageMock.setItem).toHaveBeenCalledWith('currentPage', '1');
  });
});