import { render, screen, fireEvent } from '@testing-library/react';
import AddressCart from '../components/AddressCart';

describe('AddressCart', () => {
    test('renders with accordion closed when isContinueClicked is false', () => {
        render(<AddressCart isContinueClicked={false} />);

        expect(screen.getByText('Customer Details')).toBeInTheDocument();
        expect(screen.getByText('Add New Address')).toBeInTheDocument();
        expect(screen.queryByText('Full Name')).not.toBeInTheDocument();
    });

    test('renders with accordion open when isContinueClicked is true', () => {
        render(<AddressCart isContinueClicked={true} />);

        expect(screen.getByText('Customer Details')).toBeInTheDocument();
        expect(screen.getByText('Add New Address')).toBeInTheDocument();
        expect(screen.getByText('Full Name')).toBeInTheDocument();
        expect(screen.getByText('Mobile Number')).toBeInTheDocument();
        expect(screen.getByText('Address')).toBeInTheDocument();
        expect(screen.getByText('CONTINUE')).toBeInTheDocument();
    });

    test('toggles accordion open when clicking the header', () => {
        render(<AddressCart isContinueClicked={false} />);

        expect(screen.queryByText('Full Name')).not.toBeInTheDocument();

        const header = screen.getByText('Customer Details').parentElement!.parentElement!;
        fireEvent.click(header);

        expect(screen.getByText('Full Name')).toBeInTheDocument();
        expect(screen.getByText('Mobile Number')).toBeInTheDocument();
    });

    test('toggles accordion closed when clicking the header again', () => {
        render(<AddressCart isContinueClicked={true} />);

        expect(screen.getByText('Full Name')).toBeInTheDocument();

        const header = screen.getByText('Customer Details').parentElement!.parentElement!;
        fireEvent.click(header);

        expect(screen.queryByText('Full Name')).not.toBeInTheDocument();
    });

    test('updates accordion state when isContinueClicked prop changes', () => {
        const { rerender } = render(<AddressCart isContinueClicked={false} />);

        expect(screen.queryByText('Full Name')).not.toBeInTheDocument();

        rerender(<AddressCart isContinueClicked={true} />);

        expect(screen.getByText('Full Name')).toBeInTheDocument();
    });

    test('does not toggle accordion when clicking Add New Address button', () => {
        render(<AddressCart isContinueClicked={false} />);

        expect(screen.queryByText('Full Name')).not.toBeInTheDocument();

        const addButton = screen.getByText('Add New Address');
        fireEvent.click(addButton);

        expect(screen.queryByText('Full Name')).not.toBeInTheDocument();
    });

    test('renders form fields with default values when accordion is open', () => {
        render(<AddressCart isContinueClicked={true} />);

        const fullNameInput = screen.getByText('Full Name').nextElementSibling as HTMLInputElement;
        const mobileInput = screen.getByText('Mobile Number').nextElementSibling as HTMLInputElement;
        const addressTextarea = screen.getByText('Address').nextElementSibling as HTMLTextAreaElement;
        const cityInput = screen.getByText('City/Town').nextElementSibling as HTMLInputElement;
        const stateInput = screen.getByText('State').nextElementSibling as HTMLInputElement;

        expect(fullNameInput.value).toBe('');
        expect(mobileInput.value).toBe('');
        expect(addressTextarea.value).toBe(
            'BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore'
        );
        expect(cityInput.value).toBe('Bengaluru');
        expect(stateInput.value).toBe('Karnataka');
    });

    test('renders Edit link and WORK label when accordion is open', () => {
        render(<AddressCart isContinueClicked={true} />);

        expect(screen.getByText('1.WORK')).toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    test('does not toggle accordion when clicking CONTINUE button', () => {
        render(<AddressCart isContinueClicked={true} />);

        expect(screen.getByText('Full Name')).toBeInTheDocument();

        const continueButton = screen.getByText('CONTINUE');
        fireEvent.click(continueButton);

        expect(screen.getByText('Full Name')).toBeInTheDocument();
    });
});