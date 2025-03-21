// import { RootState } from '../redux/store';
// import { useSelector } from 'react-redux';
// import BookCover1 from '../assets/BookCover1.png';
// import BookCover2 from '../assets/BookCover2.png';
// import BookCover3 from '../assets/BookCover3.png';
// import BookCover4 from '../assets/BookCover4.png';
// import BookCover5 from '../assets/BookCover5.png';
// import BookCover6 from '../assets/BookCover6.png';
// import BookCover7 from '../assets/BookCover7.png';
// import BookCover8 from '../assets/BookCover8.png';
// import BookCover9 from '../assets/BookCover9.png';

// function OrderSummary() {
//     const { items, } = useSelector(
//         (state: RootState) => state.cart
//     );

//     const bookCovers = [
//         BookCover1, BookCover2, BookCover3, BookCover4,
//         BookCover5, BookCover6, BookCover7, BookCover8,
//         BookCover9
//     ];

//     return (
//         <div>
//             <div className="min-h-[93vh] flex flex-col items-center px-4">
//                 <div className="w-[68%] mt-[60px] max-[1020px]:w-[90%] max-md:w-[90%]"></div>
//                 <div className='!pl-[15px] border border-[#acabab] min-h-[250px] max-[550px]:!ml-[0px] md:min-h-[250px] w-full max-w-[775px] flex flex-col p-4 max-[550px]:h-auto'>
//                     <div className='!py-[15px] w-full flex flex-col max-[550px]:!mt-[0px] max-[550px]:gap-[15px] max-[550px]:!px-[10px] cursor-pointer gap-y-4'>
//                         <p className='text-[18px]'>Order Summary</p>
//                         <div className="md:min-w-[155px] max-md:mt-2 max-[550px]:w-[175px] max-[550px]:!mb-[10px] !mr-[30px] max-[550px]:!mr-[0px] ">
//                             {items.map((book, index) => (
//                                 <div key={index} className='flex w-full gap-[35px] max-[550px]:!mt-[10px] max-[550px]:items-start max-[550px]:justify-start max-[550px]:!px-[10px] !mb-[25px]'>
//                                     <img src={bookCovers[index % bookCovers.length]} className='h-[85px] w-[65px] max-[425px]:h-[70px] max-[425px]:w-[55px] max-[550px]:!mt-[5px]' />
//                                     <div className='w-full md:w-[75%] flex flex-col gap-[10px] max-[550px]:justify-start '>
//                                         {/* <p className='text-[18px]'>Don't </p>
//                                     <p className='text-[12px] text-[grey]'>By Steve Kurg</p>
//                                     <p className='text-[15px]'>Rs. 1500</p> */}
//                                         <h2 className="text-[18px] text-[#0A0102] !mb-[3px] max-sm:text-[15px]">{book.product_id.bookName}</h2>
//                                         <p className="text-[12px] text-[#9D9D9D] !mb-[10px] max-sm:text-[10px]">By {book.product_id.author}</p>
//                                         <p className="text-[15px] text-[#0A0102] max-sm:text-[12px]">Rs. {book.product_id.discountPrice}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className='flex justify-end w-[98%] !mb-[20px]'>
//                             <button className=' bg-[#3371B5] text-white text-[15px] !px-[30px] !py-[7px] rounded-[3px] cursor-pointer ' >
//                                 CHECKOUT
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>

//         </div >
//     )
// }

// export default OrderSummary






import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import BookCover1 from '../assets/BookCover1.png';
import BookCover2 from '../assets/BookCover2.png';
import BookCover3 from '../assets/BookCover3.png';
import BookCover4 from '../assets/BookCover4.png';
import BookCover5 from '../assets/BookCover5.png';
import BookCover6 from '../assets/BookCover6.png';
import BookCover7 from '../assets/BookCover7.png';
import BookCover8 from '../assets/BookCover8.png';
import BookCover9 from '../assets/BookCover9.png';

function OrderSummary() {
    const { items } = useSelector(
        (state: RootState) => state.cart
    );

    const bookCovers = [
        BookCover1, BookCover2, BookCover3, BookCover4,
        BookCover5, BookCover6, BookCover7, BookCover8,
        BookCover9
    ];

    return (
        <div className="!mb-[100px] flex flex-col items-center px-4">
            <div className="w-[68%] max-[1020px]:w-[90%] max-md:w-[90%]">

                <div className="!pl-[15px] border border-[#acabab] min-h-[250px] max-[550px]:!ml-[0px] md:min-h-[250px] w-full max-w-[775px] flex flex-col p-4 max-[550px]:h-auto">
                    <div className="!py-[15px] w-full flex flex-col max-[550px]:!mt-[0px] max-[550px]:gap-[15px] max-[550px]:!px-[10px] cursor-pointer gap-y-4">
                        <p className="text-[18px]">Order Summary</p>

                        {/* <div className="md:min-w-[155px] max-md:mt-2 max-[550px]:w-[175px] max-[550px]:!mb-[10px] !mr-[30px] max-[550px]:!mr-[0px] flex flex-col gap-[25px]"> */}
                        <div>
                            {items.map((book, index) => (
                                <div
                                    key={index}
                                    className=" border flex w-[100%] gap-[35px] max-[550px]:!mt-[10px] max-[550px]:items-start max-[550px]:justify-start max-[550px]:!px-[10px] !mb-[25px]"
                                >
                                    <img
                                        src={bookCovers[index % bookCovers.length]}
                                        className="h-[85px] w-[65px] max-[425px]:h-[70px] max-[425px]:w-[55px] max-[550px]:!mt-[5px]"
                                        alt="Book Cover"
                                    />
                                    <div className="w-full md:w-[75%] flex flex-col gap-[10px] max-[550px]:justify-start">
                                        <h2 className="text-[18px] text-[#0A0102] !mb-[3px] max-sm:text-[15px]">
                                            {book.product_id.bookName}
                                        </h2>
                                        <p className="text-[12px] text-[#9D9D9D] !mb-[10px] max-sm:text-[10px]">
                                            By {book.product_id.author}
                                        </p>
                                        <p className="text-[15px] text-[#0A0102] max-sm:text-[12px]">
                                            Rs. {book.product_id.discountPrice}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end w-[98%] !mb-[20px]">
                            <button
                                className="bg-[#3371B5] text-white text-[15px] !px-[30px] !py-[7px] rounded-[3px] cursor-pointer"
                            >
                                CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
