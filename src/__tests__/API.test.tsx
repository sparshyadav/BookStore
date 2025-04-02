import axios from 'axios';
import {
    loginUser,
    registerUser,
    getAllBooks,
    getBookReviews,
    addBookReviews,
    addWishlist,
    removeWishlist,
    getWishlistItems,
    addToCart,
    getCartItems,
    removeCartItems,
    updateCartItems,
    addOrder
} from '../utils/API'

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

describe('API Service Tests', () => {
    const mockToken = 'mock-token';
    const mockBookId = '123';

    beforeEach(() => {
        jest.clearAllMocks();
        mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ token: mockToken }));
    });

    describe('loginUser', () => {
        test('successful login', async () => {
            const mockResponse = { data: { token: 'abc123' } };
            mockedAxios.post.mockResolvedValue(mockResponse);

            const result = await loginUser('test@example.com', 'password123');
            expect(result).toEqual(mockResponse.data);
            expect(mockedAxios.post).toHaveBeenCalledWith(
                'https://bookstore.incubation.bridgelabz.com/bookstore_user/login',
                { email: 'test@example.com', password: 'password123' }
            );
        });

        test('login failure', async () => {
            const error = new Error('Login failed');
            mockedAxios.post.mockRejectedValue(error);

            await expect(loginUser('test@example.com', 'password123')).rejects.toThrow(error);
        });
    });

    describe('registerUser', () => {
        test('successful registration', async () => {
            const mockResponse = { data: { id: 'user123' } };
            mockedAxios.post.mockResolvedValue(mockResponse);

            const result = await registerUser('test@example.com', 'password123', '1234567890', 'John Doe');
            expect(result).toEqual(mockResponse.data);
        });

        test('registration failure', async () => {
            const error = new Error('Registration failed');
            mockedAxios.post.mockRejectedValue(error);

            await expect(registerUser('test@example.com', 'password123', '1234567890', 'John Doe'))
                .rejects.toThrow(error);
        });
    });

    describe('getAllBooks', () => {
        test('successful fetch books', async () => {
            const mockResponse = { data: [{ id: 'book1' }] };
            mockedAxios.get.mockResolvedValue(mockResponse);

            const result = await getAllBooks();
            expect(result).toEqual(mockResponse.data);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book'
            );
        });
    });

    describe('getBookReviews', () => {
        test('successful fetch reviews', async () => {
            const mockResponse = { data: [{ rating: 5 }] };
            mockedAxios.get.mockResolvedValue(mockResponse);

            const result = await getBookReviews(mockBookId);
            expect(result).toEqual(mockResponse.data);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                `https://bookstore.incubation.bridgelabz.com/bookstore_user/get/feedback/${mockBookId}`, 
                { headers: { 'x-access-token': mockToken } }
            );
        });
    });

    describe('addBookReviews', () => {
        test('successful add review', async () => {
            const mockResponse = { data: { success: true } };
            mockedAxios.post.mockResolvedValue(mockResponse);

            const result = await addBookReviews('Great book!', 5, mockBookId);
            expect(result).toEqual(mockResponse.data);
            expect(mockedAxios.post).toHaveBeenCalledWith(
                `https://bookstore.incubation.bridgelabz.com/bookstore_user/add/feedback/${mockBookId}`, 
                { comment: 'Great book!', rating: 5 },
                expect.objectContaining({
                    headers: {
                        'x-access-token': mockToken,
                        'Content-Type': 'application/json'
                    }
                })
            );
        });
    });


    describe('Wishlist Operations', () => {
        test('successful add to wishlist', async () => {
            const mockResponse = { data: { success: true } };
            mockedAxios.post.mockResolvedValue(mockResponse);

            const result = await addWishlist(mockBookId);
            expect(result).toEqual(mockResponse.data);
        });

        test('successful remove from wishlist', async () => {
            const mockResponse = { data: { success: true } };
            mockedAxios.delete.mockResolvedValue(mockResponse);

            const result = await removeWishlist(mockBookId);
            expect(result).toEqual(mockResponse.data);
        });

        test('successful get wishlist items', async () => {
            const mockResponse = { data: [{ bookId: mockBookId }] };
            mockedAxios.get.mockResolvedValue(mockResponse);

            const result = await getWishlistItems();
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('Cart Operations', () => {
        test('successful add to cart', async () => {
            const mockResponse = { status: 200 };
            mockedAxios.post.mockResolvedValue(mockResponse);

            const result = await addToCart(mockBookId);
            expect(result).toEqual(mockResponse.status);
        });

        test('successful get cart items', async () => {
            const mockResponse = { data: { result: [{ bookId: mockBookId }] } };
            mockedAxios.get.mockResolvedValue(mockResponse);

            const result = await getCartItems();
            expect(result).toEqual(mockResponse.data.result);
        });

        test('successful remove cart items', async () => {
            const mockResponse = { status: 200 };
            mockedAxios.delete.mockResolvedValue(mockResponse);

            const result = await removeCartItems(mockBookId);
            expect(result).toEqual(mockResponse.status);
        });

        test('successful update cart items', async () => {
            const mockResponse = { status: 200 };
            mockedAxios.put.mockResolvedValue(mockResponse);

            const result = await updateCartItems(mockBookId, 2);
            expect(result).toEqual(mockResponse.status);
        });
    });

    describe('addOrder', () => {
        test('successful add order', async () => {
            const mockResponse = { status: 200 };
            mockedAxios.post.mockResolvedValue(mockResponse);
            const orders = [{
                product_id: mockBookId,
                product_name: 'Test Book',
                product_quantity: 1,
                product_price: 10
            }];

            const result = await addOrder(orders);
            expect(result).toEqual(mockResponse.status);
            expect(mockedAxios.post).toHaveBeenCalledWith(
                'https://bookstore.incubation.bridgelabz.com/bookstore_user/add/order',
                { orders },
                expect.objectContaining({
                    headers: {
                        'x-access-token': mockToken,
                        'Content-Type': 'application/json'
                    }
                })
            );
        });
    });
});