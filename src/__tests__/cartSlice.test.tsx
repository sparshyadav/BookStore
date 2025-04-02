import { configureStore, Store } from "@reduxjs/toolkit";
import cartReducer, { addItemToCart, updateItemQuantity, fetchCartItems, deleteCartItem, CartItem } from "../redux/cartSlice";
import { getCartItems, removeCartItems } from "../utils/API";
import { toast } from "react-toastify";

interface Product {
    quantityToBuy: number;
    description: string;
    discountPrice: number;
    bookImage: string | null;
    _id: string;
    admin_user_id: string;
    bookName: string;
    author: string;
}

interface User {
    address: string[];
    isVerified: boolean;
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
}

interface CartState {
    items: CartItem[];
    totalCount: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

interface RootState {
    cart: CartState;
}

jest.mock("../utils/API", () => ({
    getCartItems: jest.fn(),
    removeCartItems: jest.fn(),
}));

jest.mock("react-toastify", () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}));

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Cart Slice", () => {
    let store: Store<RootState, any, any>; 

    const mockProduct: Product = {
        _id: "123",
        bookName: "Test Book",
        description: "Test Description",
        discountPrice: 200,
        bookImage: "test.jpg",
        admin_user_id: "admin123",
        author: "Test Author",
        quantityToBuy: 1,
    };

    const mockCartItem: CartItem = {
        _id: "cart1",
        createdAt: "2025-01-01",
        updatedAt: "2025-01-02",
        product_id: mockProduct,
        quantityToBuy: 2,
        user_id: {
            _id: "user1",
            fullName: "Test User",
            email: "test@example.com",
            address: [],
            isVerified: false,
        },
        __v: 0,
    };

    beforeEach(() => {
        store = configureStore({
            reducer: { cart: cartReducer },
        });
        jest.clearAllMocks();
        localStorageMock.getItem.mockReturnValue("[]");
    });

    test("should add a new item to the cart", () => {
        store.dispatch(addItemToCart({ product: mockProduct, quantityToAdd: 1 }));
        const state = store.getState().cart;
        expect(state.items).toHaveLength(1);
        expect(state.items[0].product_id.bookName).toBe("Test Book");
        expect(state.items[0].quantityToBuy).toBe(1);
        expect(state.totalCount).toBe(1);
        expect(toast.success).toHaveBeenCalledWith("Added Test Book to the cart with quantity 1");
        expect(localStorageMock.setItem).toHaveBeenCalledWith("cart", JSON.stringify(state.items));
    });

    test("should update quantity of an existing item", () => {
        store.dispatch(addItemToCart({ product: mockProduct, quantityToAdd: 1 }));
        const itemId = store.getState().cart.items[0]._id;
        store.dispatch(addItemToCart({ product: mockProduct, quantityToAdd: 2 }));
        const state = store.getState().cart;
        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantityToBuy).toBe(3);
        expect(state.totalCount).toBe(3);
        expect(toast.success).toHaveBeenCalledWith("Updated Test Book quantity to 3");
    });

    test("should update item quantity via updateItemQuantity", () => {
        store.dispatch(addItemToCart({ product: mockProduct, quantityToAdd: 1 }));
        const itemId = store.getState().cart.items[0]._id;
        store.dispatch(updateItemQuantity({ id: itemId, quantityToBuy: 5 }));
        const state = store.getState().cart;
        expect(state.items[0].quantityToBuy).toBe(5);
        expect(state.totalCount).toBe(5);
        expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    test("should set status to loading when fetching cart items", () => {
        (getCartItems as jest.Mock).mockReturnValue(new Promise(() => {})); 
        store.dispatch(fetchCartItems() as any); 
        const state = store.getState().cart;
        expect(state.status).toBe("loading");
    });

    test("should fetch cart items successfully", async () => {
        (getCartItems as jest.Mock).mockResolvedValue([mockCartItem]);
        await store.dispatch(fetchCartItems() as any); 
        const state = store.getState().cart;
        expect(state.status).toBe("succeeded");
        expect(state.items).toHaveLength(1);
        expect(state.items[0].product_id.bookName).toBe("Test Book");
        expect(state.totalCount).toBe(2);
        expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    test("should handle fetch cart items failure", async () => {
        (getCartItems as jest.Mock).mockRejectedValue(new Error("API Error"));
        await store.dispatch(fetchCartItems() as unknown); 
        const state = store.getState().cart;
        expect(state.status).toBe("failed");
        expect(state.error).toBe("API Error");
    });

    test("should set status to loading when deleting an item", () => {
        store.dispatch(addItemToCart({ product: mockProduct, quantityToAdd: 1 }));
        const itemId = store.getState().cart.items[0]._id;
        (removeCartItems as jest.Mock).mockReturnValue(new Promise(() => {})); 
        store.dispatch(deleteCartItem(itemId) as any); 
        const state = store.getState().cart;
        expect(state.status).toBe("loading");
    });

    test("should delete an item from the cart", async () => {
        store.dispatch(addItemToCart({ product: mockProduct, quantityToAdd: 1 }));
        const itemId = store.getState().cart.items[0]._id;
        (removeCartItems as jest.Mock).mockResolvedValue(200);
        await store.dispatch(deleteCartItem(itemId) as any); 
        const state = store.getState().cart;
        expect(state.items).toHaveLength(0);
        expect(state.totalCount).toBe(0);
        expect(state.status).toBe("succeeded");
        expect(toast.success).toHaveBeenCalledWith("Book Removed Successfully! ✅");
        expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    test("should handle delete item failure", async () => {
        store.dispatch(addItemToCart({ product: mockProduct, quantityToAdd: 1 }));
        const itemId = store.getState().cart.items[0]._id;
        (removeCartItems as jest.Mock).mockResolvedValue(400); 
        await store.dispatch(deleteCartItem(itemId) as any); 
        const state = store.getState().cart;
        expect(state.items).toHaveLength(1); 
        expect(state.status).toBe("failed");
        expect(state.error).toBe("Failed to remove the cart item");
    });

    test("should calculate total count correctly", () => {
        store.dispatch(addItemToCart({ product: mockProduct, quantityToAdd: 1 }));
        store.dispatch(addItemToCart({ product: { ...mockProduct, _id: "456" }, quantityToAdd: 2 }));
        const state = store.getState().cart;
        expect(state.totalCount).toBe(3);
    });
});