import { Select } from "antd";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import BookCardShimmer from "./BookCardShimmer";
import { Pagination } from 'antd';
import BookCover1 from '../assets/BookCover1.png';
import BookCover2 from '../assets/BookCover2.png';
import BookCover3 from '../assets/BookCover3.png';
import BookCover4 from '../assets/BookCover4.png';
import BookCover5 from '../assets/BookCover5.png';
import BookCover6 from '../assets/BookCover6.png';
import BookCover7 from '../assets/BookCover7.png';
import BookCover8 from '../assets/BookCover8.png';
import BookCover9 from '../assets/BookCover9.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBooks } from "../redux/bookSlice";

const { Option } = Select;

function BooksContainer() {
    const [sortValue, setSortValue] = useState("relevance");
    const [currentPage, setCurrentPage] = useState(() => {
        return Number(localStorage.getItem("currentPage")) || 1;
    });
    const booksPerPage = 12;

    const dispatch = useDispatch<AppDispatch>();
    const { allBooks, status } = useSelector((state: RootState) => state.books);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchBooks());
        }
    }, [dispatch, status]);

    useEffect(() => {
        localStorage.setItem("currentPage", String(currentPage));
    }, [currentPage]);

    const bookCovers = [
        BookCover1, BookCover2, BookCover3, BookCover4,
        BookCover5, BookCover6, BookCover7, BookCover8,
        BookCover9
    ];

    const handleChange = (value: string) => {
        setSortValue(value);
        console.log("Selected:", value);
    };

    const hasBooks = status === "succeeded" && allBooks.length > 0;

    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const displayedBooks = hasBooks ? allBooks.slice(startIndex, endIndex) : [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderShimmerPlaceholders = () => {
        return Array(booksPerPage).fill(0).map((_, index) => (
            <BookCardShimmer key={`shimmer-${index}`} />
        ));
    };

    return (
        <div className='w-[100%] flex flex-col justify-center items-center !mt-[60px] z-100 !mb-[25px]'>
            <div className="w-[67%] h-[100px] flex items-center max-sm:w-[92%]">
                <div className='w-[100%] h-[60%] py-10 flex justify-between items-center'>
                    <div className="text-[30px] flex items-center gap-[10px] max-sm:gap-[2px] max-md:gap-[5px]">
                        <p className="text-[35px] max-md:text-[25px] max-sm:text-[20px]">Books</p>
                        <p className="text-[12px] text-[grey] !mt-2 max-sm:!mt-1">
                            {hasBooks ? `(${allBooks.length} Books)` : "(Loading...)"}
                        </p>
                    </div>
                    <div className="">
                        <Select
                            value={sortValue}
                            onChange={handleChange}
                            className="w-[200px] max-md:w-[150px] max-sm:w-[150px]"
                            dropdownStyle={{ zIndex: 10 }}
                            disabled={!hasBooks}
                        >
                            <Option value="relevance">Sort by Relevance</Option>
                            <Option value="high-to-low">Price: High to Low</Option>
                            <Option value="low-to-high">Price: Low to High</Option>
                            <Option value="recommended">Recommended</Option>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="w-[67%] max-w-7xl flex max-sm:w-[92%] flex-wrap gap-[25px] justify-center items-center !mb-[50px] max-md:w-[90%] max-xl:w-[80%] max-[1515px]:w-[80%]">
                {
                    !hasBooks
                        ? renderShimmerPlaceholders()
                        : displayedBooks.map((book, i) => (
                            <BookCard key={i} data={{
                                ...book,
                                cover: bookCovers[i % bookCovers.length],
                                discountPrice: book.discountPrice ?? book.price,
                                bookName: book.bookName ?? book.title,
                                rating: book.rating ?? 0,
                                quantity: book.quantity ?? 1,
                                _id: book._id
                            }} />
                        ))
                }
            </div>
            <Pagination
                defaultCurrent={1}
                current={currentPage}
                total={allBooks.length}
                pageSize={booksPerPage}
                onChange={handlePageChange}
                showSizeChanger={false}
                disabled={!hasBooks}
            />
        </div>
    )
}

export default BooksContainer



