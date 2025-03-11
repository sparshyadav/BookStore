import { Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';

type data = {
    cover: string,
    title: string,
    author: string,
    rating: number,
    price: number,
}

type bookProps = {
    data: data
}

function BookCard({ data }: bookProps) {
    return (
        <NavLink to='/bookpage/1'>
            <div className="h-[275px] w-[235px] border border-[#E2E2E2] rounded-[3px] hover:shadow-2xl transition-all duration-300 hover:border-[#C0C0C0]">
                <div className='h-[171px] w-[100%] bg-[#F5F5F5] flex justify-center items-center'>
                    <img src={data.cover} />
                </div>
                <div className='h-[102px] w-[100%] !pl-[10px] !pt-[10px] flex flex-col gap-[3px]'>
                    <p className='text-[14px] font-medium'>{data.title}</p>
                    <p className='text-[grey] text-[10px]'>by {data.author}</p>
                    <div className='flex items-center justify-center gap-[5px] bg-[#388E3C] rounded-[1px] w-[33px] h-[16px] text-white'>
                        <p className='text-[10px]'>{data.rating}</p>
                        <Star className='w-[9px] h-[9px]' fill='white' />
                    </div>
                    <p className='12px font-medium'>Rs. {data.price}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default BookCard
