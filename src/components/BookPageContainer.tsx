import { useEffect, useState } from 'react'
import bookImage2 from '../assets/bookCover2.png'
import { Star, Dot, Heart } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';
import { addBookReviews, getBookReviews } from '../utils/API';

function BookPageContainer() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [showImage1, setShowImage1] = useState(true);
    const [reviewComment, setReviewComment] = useState("");
    const [reviews, setReviews] = useState<ResponseType["result"]>([]);
    const location = useLocation();
    const { bookId } = useParams();
    const { data } = location.state || {};

    interface User {
        _id: string;
        fullName: string;
    }

    interface Review {
        approveComment: boolean;
        _id: string;
        user_id: User;
        product_id: string;
        comment: string;
        rating: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    interface ResponseType {
        success: string;
        message: string;
        result: Review[];
    }

    const getInitials = (fullName: string) => {
        return fullName
            ? fullName
                .split(" ")
                .map(name => name[0])
                .join("")
                .toUpperCase()
            : JSON.parse(localStorage.getItem("token") || "null").name.slice(0, 1);
    };


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!bookId) return;

                const response: ResponseType = await getBookReviews(bookId);
                setReviews(response.result.reverse());
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, [bookId]);

    const handleReviewSubmit = async () => {
        try {
            const response = await addBookReviews(reviewComment, rating, bookId) as { result: Review };
            console.log("REVIEW ADDED SUCCESSFULLY: ", response);

            setReviews((prev) => [response.result, ...prev]);

            setReviewComment("");
            setRating(0);
        }
        catch (error) {
            console.error("Error Adding reviews:", error);
        }
    }

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
                            <button className="h-[40px] text-white rounded-[2px] w-full lg:w-[49%] bg-[#A03037] hover:bg-[#8C282E] text-sm lg:text-base">
                                ADD TO BAG
                            </button>
                            <button className="h-[40px] bg-[#333333] rounded-[2px] w-full lg:w-[49%] text-white flex justify-center items-center gap-[5px] hover:bg-[#4D4D4D] text-sm lg:text-base">
                                <Heart className='w-[18px] h-[18px]' fill='white' />
                                <p>WISHLIST</p>
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
                    <div className='w-[100%] !mt-[35px] p-4 rounded-lg'>
                        <h2 className="text-lg font-semibold">Customer Feedback</h2>
                        <div className="!mt-4 !ml-3 flex flex-col gap-1">
                            <p className="text-gray-700 font-medium">Write Your Review</p>
                            <div className='bg-[#F5F5F5] !p-[10px] '>
                                <div className="!mt-3 !ml-3 flex flex-col gap-2">
                                    <p className="text-gray-700 font-medium">Overall Rating</p>
                                    <div className="flex gap-2 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-5 h-5 cursor-pointer transition ${(hover || rating) >= star ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-400"
                                                    }`}
                                                onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(0)}
                                                onClick={() => setRating(star)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <textarea
                                    className="w-full !mt-1 !mb-5 !p-2 outline-none h-[80%]"
                                    rows={4}
                                    placeholder="Write Your Review..."
                                    value={reviewComment}
                                    onChange={(e) => setReviewComment(e.target.value)}
                                />
                                <div className='flex justify-end !pr-2 h-[20%]'>
                                    <button onClick={handleReviewSubmit} className="bg-[#3371B5] text-white w-[75px] h-[24%] rounded-[1px] hover:bg-[#2A5C94] transition">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 !mt-[50px]">
                        <h2 className="text-lg font-semibold">User Reviews</h2>
                        {reviews.map((user, index) => (
                            <div
                                key={index}
                                className="p-4 flex gap-4 flex-wrap !mb-[10px]"
                            >
                                <div className='flex items-center w-[100%] h-[50px] shrink-0 gap-[10px]'>
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold text-lg">
                                        {getInitials(user.user_id.fullName)}
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className="font-medium text-gray-800">{user.user_id.fullName}</p>
                                        <div className="flex gap-1 mt-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-5 h-5 ${user.rating >= star ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-400"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col min-w-0 !ml-[60px]">
                                    <p className="mt-2 text-gray-700 break-words">{user.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookPageContainer




