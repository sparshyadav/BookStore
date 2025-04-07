
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MyCartContainer from "../components/MyCartContainer";
import { fetchCartItems} from "../redux/cartSlice";
import { updateCartItems } from "../utils/API";
import { ToastContainer } from "react-toastify";

jest.mock("../redux/cartSlice", () => ({
  fetchCartItems: jest.fn(),
  deleteCartItem: jest.fn(),
}));
jest.mock("../utils/API", () => ({
  updateCartItems: jest.fn(),
}));

const mockStore = configureStore([]);
const mockSetIsContinueClicked = jest.fn();

describe("MyCartContainer Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          {
            _id: "1",
            product_id: {
              bookName: "Book 1",
              author: "Author 1",
              discountPrice: 200,
            },
            quantityToBuy: 1,
          },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  it("should render the cart component correctly", () => {
    render(
      <Provider store={store}>
        <ToastContainer />
        <MyCartContainer setIsContinueClicked={jest.fn()} />
      </Provider>
    );

    expect(screen.getByTestId("My Cart")).toBeInTheDocument();
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("Rs. 200")).toBeInTheDocument();
  });

  it("should call fetchCartItems on mount", () => {
    render(
      <Provider store={store}>
        <MyCartContainer setIsContinueClicked={mockSetIsContinueClicked} />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchCartItems());
  });

  it("should increase quantity when plus button is clicked", async () => {
    (updateCartItems as jest.Mock).mockResolvedValue({});

    render(
      <Provider store={store}>
        <ToastContainer />
        <MyCartContainer setIsContinueClicked={mockSetIsContinueClicked} />
      </Provider>
    );

    const increaseButton = screen.getByText("+");
    fireEvent.click(increaseButton);

    await waitFor(() => {
      expect(updateCartItems).toHaveBeenCalledWith("1", 2);
      expect(store.dispatch).toHaveBeenCalledWith(fetchCartItems());
    });
  });

  it("should decrease quantity when minus button is clicked", async () => {
    (updateCartItems as jest.Mock).mockResolvedValue({});

    render(
      <Provider store={store}>
        <ToastContainer />
        <MyCartContainer setIsContinueClicked={mockSetIsContinueClicked} />
      </Provider>
    );

    const decreaseButton = screen.getByText("-");
    fireEvent.click(decreaseButton);

    await waitFor(() => {
      expect(updateCartItems).toHaveBeenCalled(); 
    });
  });

  it("should toggle continue button state when clicked", () => {
    render(
      <Provider store={store}>
        <MyCartContainer setIsContinueClicked={mockSetIsContinueClicked} />
      </Provider>
    );

    const continueButton = screen.getByText("CONTINUE");
    fireEvent.click(continueButton);

    expect(mockSetIsContinueClicked).toHaveBeenCalledWith(expect.any(Function));
  });

});