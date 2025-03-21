function AddressCart() {
    return (
        <div className="!mb-[50px] flex flex-col items-center px-4">
            <div className="w-[68%] mt-[60px] max-[1020px]:w-[90%] max-md:w-[90%]">
                <div className='!pl-[15px] border border-[#acabab] min-h-[250px] max-[550px]:!ml-[0px] md:min-h-[250px] w-full max-w-[775px] flex flex-col p-4 max-[550px]:h-auto'>
                    <div className='!py-[15px] w-full flex justify-between md:flex-row items-center max-[550px]:!mt-[0px] max-[550px]:gap-[15px] max-[550px]:!px-[10px] cursor-pointer'>
                        <p className='text-[18px]'>Customer Details</p>
                        <div className="md:min-w-[155px] max-md:mt-2 max-[550px]:w-[175px] max-[550px]:!mb-[10px] !mr-[30px] max-[550px]:!mr-[0px] ">
                            <button
                                className='!px-[25px] !py-[7px] border border-[#A03037] rounded-[3px] text-[#A03037] text-[14px] cursor-pointer'
                            >
                                Add New Address
                            </button>
                        </div>
                    </div>

                    <div className='w-[100%] flex flex-col !mb-3 p-3 h-auto gap-y-5'>
                        <div className='w-[80%] flex flex-col gap-y-5'>
                            <div className='flex gap-x-5 w-[100%] '>
                                <div className='flex flex-col justify-left '>
                                    <p className='text-[12px]'>
                                        Full Name
                                    </p>
                                    <input
                                        type="text"
                                        className="!py-[10px] !px-[15px] w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px]"
                                        value={"Raghav Khattar"}
                                    />
                                </div>

                                <div className='flex flex-col justify-left'>
                                    <p className='text-[12px]'>
                                        Mobile Number
                                    </p>
                                    <input
                                        type="text"
                                        className="!py-[10px] !px-[15px] w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px]"
                                        value={81678954778}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-y-5'>
                                <div className='flex gap-x-10 items-center'>
                                    <div className='flex gap-x-2 items-center'>
                                        <img
                                            src="" alt=""
                                            className='w-[15px] h-[15px]' />
                                        <p className='font-semibold'>1.WORK</p>
                                    </div>
                                    <div>
                                        <p className='text-[#A03037] font-semibold cursor-pointer'>Edit</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Address</p>
                                    <textarea value={"BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore"}
                                        className='border border-[#DCDCDC] w-[100%] h-[85px] text-[12px] !p-[10px] text-[#878787] align-left resize-none rounded-[3px] bg-[#F5F5F5]'
                                    />
                                </div>
                                <div className='flex gap-x-5'>
                                    <div className='flex flex-col justify-left'>
                                        <p className='text-[12px]'>
                                            City/Town
                                        </p>
                                        <input
                                            type="text"
                                            className="!py-[10px] !px-[15px] w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px] bg-[#F5F5F5]"
                                            value={"Bengaluru"}
                                        />
                                    </div>
                                    <div className='flex flex-col justify-left'>
                                        <p className='text-[12px]'>
                                            State
                                        </p>
                                        <input
                                            type="text"
                                            className="!py-[10px] !px-[15px] w-[290px] !h-[50px] border border-[#DCDCDC] rounded-[3px] bg-[#F5F5F5]"
                                            value={"Karnataka"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end w-[98%] !mb-[20px]'>
                            <button className=' bg-[#3371B5] text-white text-[15px] !px-[30px] !py-[7px] rounded-[3px] cursor-pointer' >
                                CONTINUE
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddressCart;
