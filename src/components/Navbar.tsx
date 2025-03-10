import educationImage from '../assets/education.svg'
import { User, ShoppingCart, Search } from 'lucide-react';

function Navbar() {
    return (
        <div className='h-[60px] w-[100%] bg-[#A03037] flex justify-center'>
            <div className='h-[100%] w-[80%] flex justify-between max-sm:w-[100%] max-lg:w-[90%]'>
                <div className='h-[100%] w-[200px] flex items-center justify-center gap-5 max-sm:gap-2'>
                    <img src={educationImage} alt='Image Not Found' className='max-sm:h-[15px]' />
                    <p className='text-white text-[25px] max-sm:text-[18px]'>BookStore</p>
                </div>
                <div className='h-[100%] w-[80%] flex max-md:justify-end'>
                    <div className='h-[100%] w-[75%] flex items-center max-md:hidden'>
                        <div className="w-[75%] h-[40px] flex items-center gap-2 rounded-[3px] pl-[5px] bg-white">
                            <Search className="text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-transparent outline-none px-2 placeholder-gray-400"
                            />
                        </div>
                    </div>
                    <div className='h-[100%] w-[25%] flex max-md:justify-end max-md:w-[500px] max-sm:w-[300px]'>
                        <div className='bg-[#A03037] h-[100%] w-[80px] text-white hidden max-md:flex justify-center items-center max-md:w-[75px] max-sm:w-[50px]'>
                            <Search className="w-[25px] h-[25px] max-md:w-[22px] max-md:h-[22px] max-sm:w-[18px] max-sm:h-[18px]" />
                        </div>
                        <div className='bg-[#A03037] h-[100%] w-[80px] flex flex-col justify-center items-center gap-1 text-white max-md:w-[75px] max-sm:w-[50px]'>
                            <User className="w-[25px] h-[25px] max-md:w-[22px] max-md:h-[22px] max-sm:w-[18px] max-sm:h-[18px]" />
                            <p className="text-[10px] hidden md:block">Profile</p>
                        </div>
                        <div className='bg-[#A03037] h-[100%] w-[80px] flex flex-col justify-center items-center gap-1 text-white max-md:w-[75px] max-sm:w-[50px]'>
                            <ShoppingCart className="w-[25px] h-[25px] max-md:w-[22px] max-md:h-[22px] max-sm:w-[18px] max-sm:h-[18px]" />
                            <p className="text-[10px] hidden md:block">Cart</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
