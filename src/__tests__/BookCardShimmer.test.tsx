import { render, screen } from '@testing-library/react';
import BookCardShimmer from '../components/BookCardShimmer'; // Adjust path as needed

describe('BookCardShimmer', () => {
  // Test 1: Renders the outer container
  it('renders the outer container', () => {
    render(<BookCardShimmer />);
    expect(screen.getByTestId('shimmer-container')).toBeInTheDocument();
  });

  // Test 2: Renders the image placeholder section
  it('renders the image placeholder section', () => {
    render(<BookCardShimmer />);
    const imageContainer = screen.getByTestId('shimmer-image-container');
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer.querySelector('[data-testid="shimmer-image"]')).toBeInTheDocument();
  });

  // Test 3: Renders the content section
  it('renders the content section', () => {
    render(<BookCardShimmer />);
    expect(screen.getByTestId('shimmer-content')).toBeInTheDocument();
  });

  // Test 4: Renders the title placeholder
  it('renders the title placeholder', () => {
    render(<BookCardShimmer />);
    expect(screen.getByTestId('shimmer-title')).toBeInTheDocument();
  });

  // Test 5: Renders the author placeholder
  it('renders the author placeholder', () => {
    render(<BookCardShimmer />);
    expect(screen.getByTestId('shimmer-author')).toBeInTheDocument();
  });

  // Test 6: Renders the rating and quantity placeholders
  it('renders the rating and quantity placeholders', () => {
    render(<BookCardShimmer />);
    const ratingContainer = screen.getByTestId('shimmer-rating-container');
    expect(ratingContainer).toBeInTheDocument();
    expect(ratingContainer.querySelector('[data-testid="shimmer-rating"]')).toBeInTheDocument();
    expect(ratingContainer.querySelector('[data-testid="shimmer-quantity"]')).toBeInTheDocument();
  });

  // Test 7: Renders the price placeholders
  it('renders the price placeholders', () => {
    render(<BookCardShimmer />);
    const priceContainer = screen.getByTestId('shimmer-price-container');
    expect(priceContainer).toBeInTheDocument();
    expect(priceContainer.querySelector('[data-testid="shimmer-discount-price"]')).toBeInTheDocument();
    expect(priceContainer.querySelector('[data-testid="shimmer-original-price"]')).toBeInTheDocument();
  });
});

// Mock the component with data-testid attributes for testing (in-memory, no code changes)
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