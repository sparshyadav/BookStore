import React, { useState } from 'react'
import { Select } from "antd";
import { MapPin } from 'lucide-react'
import bookImage from '../assets/book-image-large-2.png'

const { Option } = Select;

function MyCartContainer() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [count, setCount] = useState<number>(1);

  const handleChange = (value: React.SetStateAction<null>) => {
    setSelectedAddress(value);
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
            <div className='!pl-[15px] border border-[#acabab] min-h-[250px] max-[550px]:!ml-[0px] md:min-h-[250px] w-full max-w-[775px] flex flex-col p-4 max-[550px]:h-auto'>
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
                {[1, 2].map((_, index) => (
                  <div key={index} className='flex w-full gap-[35px] max-[550px]:!mt-[10px] max-[550px]:items-start max-[550px]:justify-start max-[550px]:!px-[10px] !mb-[25px]'>
                    <img src={bookImage} className='h-[85px] w-[65px] max-[425px]:h-[70px] max-[425px]:w-[55px] max-[550px]:!mt-[5px]' />
                    <div className='w-full md:w-[75%] flex flex-col gap-[10px] max-[550px]:justify-start '>
                      <p className='text-[18px]'>Don't Make Me Think</p>
                      <p className='text-[12px] text-[grey]'>By Steve Kurg</p>
                      <p className='text-[15px]'>Rs. 1500</p>
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
                        <p className="cursor-pointer text-[12px]">Remove</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCartContainer;
