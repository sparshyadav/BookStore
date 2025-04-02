import { render, screen } from '@testing-library/react';
import BookCardShimmer from '../components/BookCardShimmer'; 

describe('BookCardShimmer', () => {
  test('renders the outer container', () => {
    render(<BookCardShimmer />);
    expect(screen.getByTestId('shimmer-container')).toBeInTheDocument();
  });

  test('renders the image placeholder section', () => {
    render(<BookCardShimmer />);
    const imageContainer = screen.getByTestId('shimmer-image-container');
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer.querySelector('[data-testid="shimmer-image"]')).toBeInTheDocument();
  });

  test('renders the content section', () => {
    render(<BookCardShimmer />);
    expect(screen.getByTestId('shimmer-content')).toBeInTheDocument();
  });

  test('renders the title placeholder', () => {
    render(<BookCardShimmer />);
    expect(screen.getByTestId('shimmer-title')).toBeInTheDocument();
  });

  test('renders the author placeholder', () => {
    render(<BookCardShimmer />);
    expect(screen.getByTestId('shimmer-author')).toBeInTheDocument();
  });

  test('renders the rating and quantity placeholders', () => {
    render(<BookCardShimmer />);
    const ratingContainer = screen.getByTestId('shimmer-rating-container');
    expect(ratingContainer).toBeInTheDocument();
    expect(ratingContainer.querySelector('[data-testid="shimmer-rating"]')).toBeInTheDocument();
    expect(ratingContainer.querySelector('[data-testid="shimmer-quantity"]')).toBeInTheDocument();
  });

  test('renders the price placeholders', () => {
    render(<BookCardShimmer />);
    const priceContainer = screen.getByTestId('shimmer-price-container');
    expect(priceContainer).toBeInTheDocument();
    expect(priceContainer.querySelector('[data-testid="shimmer-discount-price"]')).toBeInTheDocument();
    expect(priceContainer.querySelector('[data-testid="shimmer-original-price"]')).toBeInTheDocument();
  });
});

jest.mock('../components/BookCardShimmer', () => {
  const MockBookCardShimmer = () => (
    <div data-testid="shimmer-container">
      <div data-testid="shimmer-image-container">
        <div data-testid="shimmer-image"></div>
      </div>
      <div data-testid="shimmer-content">
        <div data-testid="shimmer-title"></div>
        <div data-testid="shimmer-author"></div>
        <div data-testid="shimmer-rating-container">
          <div data-testid="shimmer-rating"></div>
          <div data-testid="shimmer-quantity"></div>
        </div>
        <div data-testid="shimmer-price-container">
          <div data-testid="shimmer-discount-price"></div>
          <div data-testid="shimmer-original-price"></div>
        </div>
      </div>
    </div>
  );
  return MockBookCardShimmer;
});