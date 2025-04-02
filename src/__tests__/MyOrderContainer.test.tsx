import { render, screen } from '@testing-library/react';
import MyOrderContainer from '../components/MyOrderContainer';
import bookImage from '../assets/book-image-large-2.png';

jest.mock('lucide-react', () => ({
    Dot: () => <svg data-testid="dot-icon" />
}));

describe('MyOrderContainer', () => {
    test('renders MyOrderContainer component without crashing', () => {
        render(<MyOrderContainer />);
        expect(screen.getByText("My Order")).toBeInTheDocument();
    });

    test('renders breadcrumb navigation correctly', () => {
        render(<MyOrderContainer />);
        
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('My Order')).toBeInTheDocument();
        
        const separators = screen.getAllByText('/');
        expect(separators.length).toBe(2);
    });

    test('renders book details correctly', () => {
        render(<MyOrderContainer />);
        
        expect(screen.getAllByText("Don't Make Me Think").length).toBe(7); 
        expect(screen.getAllByText("By Steve Krug").length).toBe(7); 
        expect(screen.getAllByText("Rs. 1500").length).toBe(7);
    });

    test('renders order status correctly', () => {
        render(<MyOrderContainer />);
        
        expect(screen.getAllByText("Order Placed on May 21").length).toBe(7);
    });

    test('renders book images correctly', () => {
        render(<MyOrderContainer />);
        
        const images = screen.getAllByRole('img');
        images.forEach((img) => {
            expect(img).toHaveAttribute('src', bookImage);
        });
    });

    test('renders Dot icon correctly', () => {
        render(<MyOrderContainer />);
        
        const dotIcons = screen.getAllByTestId('dot-icon');
        expect(dotIcons.length).toBe(7);
    });
});
