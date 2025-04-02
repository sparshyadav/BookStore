import { render, screen, fireEvent } from '@testing-library/react';
import MyCartPage from '../pages/MyCartPage'; 

jest.mock('../components/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../components/MyCartContainer', () => ({ setIsContinueClicked }: { setIsContinueClicked: (value: boolean) => void }) => (
  <div data-testid="my-cart-container">
    <button data-testid="continue-btn" onClick={() => setIsContinueClicked(true)}>
      Continue
    </button>
  </div>
));
jest.mock('../components/AddressCart', () => ({ isContinueClicked }: { isContinueClicked: boolean }) => (
  <div data-testid="address-cart">{isContinueClicked ? 'Open' : 'Closed'}</div>
));
jest.mock('../components/OrderSummary', () => () => <div data-testid="order-summary">Order Summary</div>);

describe('MyCartPage', () => {
  test('renders Navbar, MyCartContainer, AddressCart, OrderSummary, and Footer', () => {
    render(<MyCartPage />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('my-cart-container')).toBeInTheDocument();
    expect(screen.getByTestId('address-cart')).toBeInTheDocument();
    expect(screen.getByTestId('order-summary')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('initializes with isContinueClicked as false and AddressCart closed', () => {
    render(<MyCartPage />);

    const addressCart = screen.getByTestId('address-cart');
    expect(addressCart).toHaveTextContent('Closed');
  });

  test('updates isContinueClicked to true when Continue button is clicked in MyCartContainer', () => {
    render(<MyCartPage />);

    const continueButton = screen.getByTestId('continue-btn');
    fireEvent.click(continueButton);

    const addressCart = screen.getByTestId('address-cart');
    expect(addressCart).toHaveTextContent('Open');
  });

  test('passes setIsContinueClicked function to MyCartContainer', () => {
    render(<MyCartPage />);

    const myCartContainer = screen.getByTestId('my-cart-container');
    expect(myCartContainer).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('continue-btn'));
    expect(screen.getByTestId('address-cart')).toHaveTextContent('Open');
  });

  test('passes isContinueClicked prop to AddressCart', () => {
    render(<MyCartPage />);

    expect(screen.getByTestId('address-cart')).toHaveTextContent('Closed');

    fireEvent.click(screen.getByTestId('continue-btn'));
    expect(screen.getByTestId('address-cart')).toHaveTextContent('Open');
  });

  test('renders all components within a single div container', () => {
    const { container } = render(<MyCartPage />);
    
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    expect(div?.children).toHaveLength(5); 
  });
});