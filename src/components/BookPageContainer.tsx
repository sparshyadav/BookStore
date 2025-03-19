import { useState } from 'react'
import bookImage2 from '../assets/bookCover2.png'
import { Star, Dot, Heart } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';
import FeedbackBookPage from './FeedbackBookPage';
import { toast } from 'react-toastify';
import { addWishlist, removeWishlist } from '../utils/API';

function BookPageContainer() {
    const [showImage1, setShowImage1] = useState(true);
    const [isWishlisted, setIsWishlisted]=useState(false);
    const location = useLocation();
    const { data } = location.state || {};
    const {bookId}=useParams();

    const handleWishlist = async () => {
        try {
            if (isWishlisted) {
                const response = await removeWishlist(bookId);
                console.log("RESPONSE FROM REMOVE WISHLIST: ", response);
                toast.error("Item Removed From Wishlist! ❌");
                setIsWishlisted(false); 
            } else {
                const response = await addWishlist(bookId);
                console.log("RESPONSE FROM ADD WISHLIST: ", response);
                toast.success("Item Added to Wishlist! ✅");
                setIsWishlisted(true); 
            }
        } catch (error) {
            console.error("Wishlist operation failed:", error);
            toast.error("Something went wrong! ❌");
        }
    };    
    

    return (
        <div className='!mt-[60px] w-[100%] flex flex-col items-center !my-[35px]'>
            <nav aria-label="breadcrumb" className="w-[68%] h-[75px] flex items-center max-md:w-[90%]">
                <ol className="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
                    <li className="flex gap-1 cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                        <a href="/">Home</a>
                        <span className="pointer-events-none mx-2 text-slate-800 !mr-1">
                            /
                        </span>
                    </li>
                    <li className="flex gap-1 text-black cursor-pointer items-center text-sm transition-colors duration-300 hover:text-slate-800">
                        <a href="/bookpage">Book</a>
                        <span className="pointer-events-none mx-2 text-slate-800">
                            /
                        </span>
                    </li>
                </ol>
            </nav>
            <div className='w-[68%] flex justify-between max-md:w-[90%] max-md:flex-col max-md:justify-center max-md:items-center max-sm:flex-col max-sm:justify-center max-sm:items-center'>
                <div className='w-[35%] h-[500px] flex max-md:w-[45%] max-sm:w-[90%]'>
                    <div className='w-[15%] h-[200px]'>
                        <div className='h-[65px] w-[100%] border border-black flex justify-center items-center hover:cursor-pointer'>
                            <img src={data.cover} className='h-[62px] !p-[2px]' onClick={() => setShowImage1(true)} />
                        </div>
                        <div className='h-[65px] w-[100%] border border-black flex justify-center items-center hover:cursor-pointer'>
                            <img src={bookImage2} className='h-[62px] !p-[2px]' onClick={() => setShowImage1(false)} />
                        </div>
                    </div>
                    <div className='w-[85%] flex flex-col gap-2.5'>
                        <div className='w-[100%] h-[375px] border border-[grey] flex justify-center items-center max-[1050px]:h-[250px]'>
                            <img src={showImage1 ? data.cover : bookImage2} className='h-[90%] max-[1050px]:h-[70%]' />
                        </div>
                        <div className="w-[100%] flex flex-col lg:flex-row justify-between gap-4 lg:gap-6 lg:w-full">
                            <button className="cursor-pointer h-[40px] text-white rounded-[2px] w-full lg:w-[49%] bg-[#A03037] hover:bg-[#8C282E] text-sm lg:text-base">
                                ADD TO BAG
                            </button>
                            <button onClick={handleWishlist} className="cursor-pointer h-[40px] bg-[#333333] rounded-[2px] w-full lg:w-[49%] text-white flex justify-center items-center gap-[5px] hover:bg-[#4D4D4D] text-sm lg:text-base">
                                <Heart className='w-[18px] h-[18px]' fill='white' />
                                {
                                    isWishlisted?
                                    <p>WISHLISTED</p>:
                                    <p>WISHLIST</p>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-[62%] max-md:w-[85%]'>
                    <div className=' w-[100%] flex flex-col gap-[5px] !mb-[15px]'>
                        <p className='text-[30px]'>{data.bookName}</p>
                        <p className='text-gray-500'>{data.author}</p>
                        <div className='flex items-center gap-[15px]'>
                            <div className='flex items-center justify-center gap-[5px] bg-[#388E3C] rounded-[1px] w-[55px] h-[25px] text-white'>
                                <p className='text-[15px]'>4.5</p>
                                <Star className='w-[13px] h-[13px]' fill='white' />
                            </div>
                            <p className='text-[12px] text-gray-500'>({data.quantity})</p>
                        </div>
                        <div className='flex gap-[15px]'>
                            <p className='text-[27px] font-medium'>Rs. {data.discountPrice}</p>
                            <div className='flex items-end'>
                                <p className='text-[20px] line-through text-[#878787]'>Rs. {data.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className='border border-[#c5c5c5]'></div>
                    <div className='border-t-[grey] w-[100%] !mt-[35px] text-[#555454] !mb-[45px]'>
                        <div className='flex '>
                            <Dot />
                            <h2>Book Details</h2>
                        </div>
                        <p className='!pl-[25px]'>{data.description}</p>
                    </div>
                    <div className='border border-[#c5c5c5]'></div>
                    <FeedbackBookPage />
                </div>
            </div>
        </div>
    )
}

export default BookPageContainer




