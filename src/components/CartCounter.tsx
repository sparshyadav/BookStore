import { useState } from 'react'

function CartCounter() {
    const [count, setCount] = useState<number>(1);
    return (
        <div className="flex justify-center items-center gap-3 mt-3">
            <button
                onClick={() => setCount(count > 1 ? count - 1 : 1)}
                className="cursor-pointer w-[25px] h-[25px] flex items-center justify-center rounded-full text-[15px] text-black text-lg font-bold border border-gray-400"
            >
                -
            </button>
            <div className="w-[40px] h-[25px] flex items-center justify-center text-[15px] border border-gray-400 bg-white text-lg font-semibold">
                {count}
            </div>
            <button
                onClick={() => setCount(count + 1)}
                className="cursor-pointer w-[25px] h-[25px] flex items-center justify-center text-[15px] rounded-full text-black text-lg font-bold border border-gray-400"
            >
                +
            </button>
            {/* <p className="cursor-pointer text-[12px]">Remove</p> */}
        </div>
    )
}

export default CartCounter
