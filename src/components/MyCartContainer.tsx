import React, { useEffect, useState } from 'react'
import { Select } from "antd";
import { MapPin } from 'lucide-react'
import { getCartItems, removeCartItems } from '../utils/API';
import BookCover1 from '../assets/BookCover1.png';
import BookCover2 from '../assets/BookCover2.png';
import BookCover3 from '../assets/BookCover3.png';
import BookCover4 from '../assets/BookCover4.png';
import BookCover5 from '../assets/BookCover5.png';
import BookCover6 from '../assets/BookCover6.png';
import BookCover7 from '../assets/BookCover7.png';
import BookCover8 from '../assets/BookCover8.png';
import BookCover9 from '../assets/BookCover9.png';
import { toast } from 'react-toastify';

const { Option } = Select;

interface Product {
  bookName: string;
  author: string;
  discountPrice: number;
  _id: string
}

interface CartItem {
  product_id: Product;
  _id: string;
}

function MyCartContainer() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [count, setCount] = useState<number>(1);
  const [allCartItems, setAllCartItems] = useState<CartItem[]>([]);

  const handleChange = (value: React.SetStateAction<null>) => {
    setSelectedAddress(value);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        console.log("RESPONSE: ", response);
        setAllCartItems(response);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchCartItems();
  }, [])

  const bookCovers = [
    BookCover1, BookCover2, BookCover3, BookCover4,
    BookCover5, BookCover6, BookCover7, BookCover8,
    BookCover9
  ];

  const handleRemove = async (bookId: string) => {
    try {
      await removeCartItems(bookId);
      setAllCartItems(prevItems => prevItems.filter(book => book._id !== bookId));
      toast.success("Book Removed Successfully! ✅");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove book. ❌");
    }
  };


  return (
    <div className='min-h-[93vh] flex flex-col items-center px-4'>
      <div className='w-[68%] !mt-[60px] max-[1020px]:w-[90%] max-md:w-[90%]'>
        <nav aria-label="breadcrumb" className="w-full max-w-[800px] min-h-[75px] flex items-center max-md:w-[90%]">
          <ol className="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
            <li className="flex gap-1 cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
              <a href="/">Home</a>
              <span className="pointer-events-none mx-2 text-slate-800 !mr-1"> / </span>
            </li>
            <li className="flex gap-1 text-black cursor-pointer items-center text-sm transition-colors duration-300 hover:text-slate-800">
              <a href="/bookpage">My Cart</a>
              <span className="pointer-events-none mx-2 text-slate-800"> / </span>
            </li>
          </ol>
        </nav>

        <div className='w-full h-auto'>
          <div>
            <div className='!mb-[25px] !pl-[15px] border border-[#acabab] min-h-[50px] max-[550px]:!ml-[0px] md:min-h-[250px] w-full max-w-[775px] flex flex-col p-4 max-[550px]:h-auto'>
              <div className='!py-[15px] w-full flex justify-between md:flex-row items-center max-[550px]:!mt-[0px] max-[550px]:gap-[15px] max-[550px]:!px-[10px]'>
                <p className='text-[18px]'>My Cart</p>
                <div className="md:min-w-[155px] max-md:mt-2 max-[550px]:w-[175px] max-[550px]:!mb-[10px] !mr-[30px] max-[550px]:!mr-[0px]">
                  <Select
                    onChange={handleChange}
                    className="w-full text-gray-700 rounded-[1px]"
                    size="large"
                    value={selectedAddress}
                    dropdownStyle={{ minWidth: "250px" }}
                    placeholder={
                      <div className="flex items-center gap-2 text-black">
                        <MapPin className="text-[#A03037]" />
                        <span className="font-semibold max-[550px]:text-[12px]">Use Current Location</span>
                      </div>
                    }
                  >
                    <Option value="home">🏠 Home Address</Option>
                    <Option value="work">🏢 Work Address</Option>
                    <Option value="address2">📍 Address 2</Option>
                  </Select>
                </div>
              </div>

              <div className='w-full flex flex-wrap mt-3 p-3 h-auto'>
                {allCartItems.map((book, index) => (
                  <div key={index} className='!my-[15px] flex w-full gap-[35px] max-[550px]:!mt-[10px] max-[550px]:items-start max-[550px]:justify-start max-[550px]:!px-[10px] !mb-[25px]'>
                    <img src={bookCovers[index % bookCovers.length]} className='!pt-[25px] h-[100px] w-[65px] max-[425px]:h-[90px] max-[425px]:w-[65px] max-[550px]:!mt-[5px]' />
                    <div className='w-full md:w-[75%] flex flex-col gap-[10px] max-[550px]:justify-start '>
                      <p className='text-[18px]'>{book.product_id.bookName}</p>
                      <p className='text-[12px] text-[grey]'>{book.product_id.author}</p>
                      <p className='text-[15px]'>Rs. {book.product_id.discountPrice}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => setCount(count > 1 ? count - 1 : 1)}
                          className="w-[25px] h-[25px] flex items-center justify-center rounded-full text-[15px] text-black text-lg font-bold border border-gray-400"
                        >
                          -
                        </button>
                        <div className="w-[40px] h-[25px] flex items-center justify-center text-[15px] border border-gray-400 bg-white text-lg font-semibold">
                          {count}
                        </div>
                        <button
                          onClick={() => setCount(count + 1)}
                          className="w-[25px] h-[25px] flex items-center justify-center text-[15px] rounded-full text-black text-lg font-bold border border-gray-400"
                        >
                          +
                        </button>
                        <p onClick={() => handleRemove(book._id)} className="cursor-pointer text-[12px]">Remove</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className='!pl-[15px] border border-[#acabab] min-h-[250px] max-[550px]:!ml-[0px] md:min-h-[250px] w-full max-w-[775px] flex flex-col p-4 max-[550px]:h-auto'>
                  <div className='!py-[15px] w-full flex justify-between md:flex-row items-center max-[550px]:!mt-[0px] max-[550px]:gap-[15px] max-[550px]:!px-[10px] cursor-pointer'>
                    <p className='text-[18px]'>Customer Details</p>
                    <div className="md:min-w-[155px] max-md:mt-2 max-[550px]:w-[175px] max-[550px]:!mb-[10px] !mr-[30px] max-[550px]:!mr-[0px] ">
                      <button
                        className='!px-[25px] !py-[7px] border border-[#A03037] rounded-[3px] text-[#A03037] text-[14px] cursor-pointer'
                      >
                        Add New Address
                      </button>
                    </div>
                  </div>

                  <div className='w-[100%] flex flex-col !mb-3 p-3 h-auto gap-y-5'>
                    <div className='w-[80%] flex flex-col gap-y-5'>
                      <div className='flex gap-x-5 w-[100%] '>
                        <div className='flex flex-col justify-left '>
                          <p className='text-[12px]'>
                            Full Name
                          </p>
                          <input
                            type="text"
                            className="!py-[10px] !px-[15px] w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px]"
                            value={"Raghav Khattar"}
                          />
                        </div>

                        <div className='flex flex-col justify-left'>
                          <p className='text-[12px]'>
                            Mobile Number
                          </p>
                          <input
                            type="text"
                            className="!py-[10px] !px-[15px] w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px]"
                            value={81678954778}
                          />
                        </div>
                      </div>

                      <div className='flex flex-col gap-y-5'>
                        <div className='flex gap-x-10 items-center'>
                          <div className='flex gap-x-2 items-center'>
                            <img
                              src='' alt="no image found"
                              className='w-[15px] h-[15px]' />
                            <p className='font-semibold'>1.WORK</p>
                          </div>
                          <div>
                            <p className='text-[#A03037] font-semibold cursor-pointer'>Edit</p>
                          </div>
                        </div>
                        <div>
                          <p>Address</p>
                          <textarea value={"BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore"}
                            className='border border-[#DCDCDC] w-[100%] h-[85px] text-[12px] !p-[10px] text-[#878787] align-left resize-none rounded-[3px] bg-[#F5F5F5]'
                          />
                        </div>
                        <div className='flex gap-x-5'>
                          <div className='flex flex-col justify-left'>
                            <p className='text-[12px]'>
                              City/Town
                            </p>
                            <input
                              type="text"
                              className="!py-[10px] !px-[15px] w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px] bg-[#F5F5F5]"
                              value={"Bengaluru"}
                            />
                          </div>
                          <div className='flex flex-col justify-left'>
                            <p className='text-[12px]'>
                              State
                            </p>
                            <input
                              type="text"
                              className="!py-[10px] !px-[15px] w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px] bg-[#F5F5F5]"
                              value={"Karnataka"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-end w-[98%] !mb-[20px]'>
                      <button className=' bg-[#3371B5] text-white text-[15px] !px-[30px] !py-[7px] rounded-[3px] cursor-pointer' >
                        CONTINUE
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCartContainer;
