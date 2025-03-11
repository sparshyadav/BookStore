import { Select } from "antd";
import { SetStateAction, useState } from "react";
import bookCover from "../assets/book-image.png"
import BookCard from "./BookCard";

const { Option } = Select;

function BooksContainer() {
    const [sortValue, setSortValue] = useState("relevance");

    const handleChange = (value: SetStateAction<string>) => {
        setSortValue(value);
        console.log("Selected:", value);
    };

    const books = [
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
        {
            title: "Don't Make Me Think",
            author: "Steve Krug",
            rating: 4.5,
            price: 1500,
            cover: bookCover
        },
    ]

    return (
        <div className='w-[100%] flex flex-col justify-center items-center !mt-[60px] z-100'>
            <div className="w-[67%] h-[100px] flex items-center max-sm:w-[92%]">
                <div className='w-[100%] h-[60%] py-10 flex justify-between items-center'>
                    <div className="text-[30px] flex items-center gap-[10px] max-sm:gap-[2px] max-md:gap-[5px]">
                        <p className="text-[35px] max-md:text-[25px] max-sm:text-[20px]">Books</p>
                        <p className="text-[12px] text-[grey] !mt-2 max-sm:!mt-1">(128 Books)</p>
                    </div>
                    <div className="">
                        <Select
                            value={sortValue}
                            onChange={handleChange}
                            className="w-[200px] max-md:w-[150px] max-sm:w-[150px]"
                            dropdownStyle={{ zIndex: 10 }}
                        >
                            <Option value="relevance">Sort by Relevance</Option>
                            <Option value="high-to-low">Price: High to Low</Option>
                            <Option value="low-to-high">Price: Low to High</Option>
                            <Option value="recommended">Recommended</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="w-[67%] max-w-7xl flex max-sm:w-[92%] flex-wrap gap-[25px] justify-center items-center !mb-[50px] max-md:w-[90%] max-xl:w-[80%]">
                {
                    books.map((book, i) => (
                        <BookCard key={i} data={book} />
                    ))
                }
            </div>
        </div>
    )
}

export default BooksContainer
