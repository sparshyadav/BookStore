import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MyCartContainer from '../components/MyCartContainer'
import AddressCart from '../components/AddressCart'
import OrderSummary from '../components/OrderSummary'

function MyCartPage() {
    return (
        <div>
            <Navbar />
            <MyCartContainer />
            <AddressCart />
            <OrderSummary />
            <Footer />
        </div>
    )
}

export default MyCartPage
