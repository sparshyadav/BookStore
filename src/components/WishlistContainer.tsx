import { useState } from "react"
import bookImage from '../assets/book-image-large-2.png'
import { Trash2 } from 'lucide-react';

function WishlistContainer() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="min-h-[93vh] !mt-[60px] w-[100%] flex flex-col items-center">
            <nav aria-label="breadcrumb" className="w-[68%] h-[75px] flex items-center max-md:w-[90%]">
                <ol className="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
                    <li className="flex gap-1 cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                        <a href="/home">Home</a>
                        <span className="pointer-events-none mx-2 text-slate-800 !mr-1">
                            /
                        </span>
                    </li>
                    <li className="flex gap-1 text-black cursor-pointer items-center text-sm transition-colors duration-300 hover:text-slate-800">
                        <a href="/bookpage">My Wishlist</a>
                        <span className="pointer-events-none mx-2 text-slate-800">
                            /
                        </span>
                    </li>
                </ol>
            </nav>
            <div className="w-[68%] flex items-center border border-[#E4E4E4] max-md:w-[90%]">
                <div className="min-h-[55px] w-[100%] border border-gray-300  p-4  mx-auto">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full min-h-[55px] bg-[#F5F5F5] border border-[#E4E4E4] flex justify-between items-center text-lg font-semibold py-2 px-4"
                    >
                        <span className="!pl-[25px]">My Wishlist</span>
                    </button>
                    {isOpen && (
                        <div className="w-[100%] h-[100%] flex flex-col gap-[25px] justify-center items-center transition">
                            <div className="h-[95px] w-[95%] flex justify-between !my-[25px] max-sm:h-[75px]">
                                <div className="flex gap-[25px]">
                                    <div className="">
                                        <img src={bookImage} className="w-[100%] h-[100%]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-[18px] text-[#0A0102] !mb-[3px] max-sm:text-[15px]">Don't Make Me Think</h2>
                                        <p className="text-[12px] text-[#9D9D9D] !mb-[10px] max-sm:text-[10px]">By Steve Knug</p>
                                        <p className="text-[15px] text-[#0A0102] max-sm:text-[12px]">Rs. 1500</p>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center !mr-[15px]">
                                    <Trash2 className="text-[grey] max-sm:h-[15px] w-[15px]" />
                                </div>
                            </div>
                            <div className="w-[100%] border border-[#E4E4E4]"></div>
                            <div className="h-[95px] w-[95%] flex justify-between !my-[25px] max-sm:h-[75px]">
                                <div className="flex gap-[25px]">
                                    <div className="">
                                        <img src={bookImage} className="w-[100%] h-[100%]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-[18px] text-[#0A0102] !mb-[3px] max-sm:text-[15px]">Don't Make Me Think</h2>
                                        <p className="text-[12px] text-[#9D9D9D] !mb-[10px] max-sm:text-[10px]">By Steve Knug</p>
                                        <p className="text-[15px] text-[#0A0102] max-sm:text-[12px]">Rs. 1500</p>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center !mr-[15px]">
                                    <Trash2 className="text-[grey] max-sm:h-[15px] w-[15px]" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WishlistContainer
