import WishlistPage from '../pages/WishlistPage';
import { render,screen} from '@testing-library/react';

jest.mock("../components/Navbar",()=>()=><div data-testid="navbar">navbar</div>)
jest.mock("../components/Footer",()=>()=> <div data-testid="footer">footer</div>)
jest.mock("../components/WishlistContainer",()=>()=><div data-testid="WishlistContainer">WishlistContainer</div>)
describe("WishlistContainer", () => {
    test("whishlist page contains Navbar and Footer",()=>{
        render(
            <WishlistPage />
        )
        expect(screen.getByTestId("navbar")).toBeInTheDocument()
        expect(screen.getByTestId("footer")).toBeInTheDocument();
        expect(screen.getByTestId("WishlistContainer")).toBeInTheDocument();
    })
})