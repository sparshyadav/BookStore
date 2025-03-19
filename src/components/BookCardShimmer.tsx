const BookCardShimmer = () => {
  return (
    <div className="h-[275px] w-[235px] border border-[#E2E2E2] rounded-[3px] overflow-hidden max-[500px]:w-[175px]">
      <div className='h-[171px] w-[100%] bg-[#F5F5F5] flex justify-center items-center animate-pulse'>
        <div className='h-[135px] w-[105px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate'></div>
      </div>
      <div className='h-[102px] w-[100%] !pl-[10px] !pt-[10px] flex flex-col gap-[5px]'>
        <div className='h-[14px] w-[80%] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]'></div>
        <div className='h-[10px] w-[60%] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]'></div>
        <div className='flex gap-[5px] items-center'>
          <div className='w-[33px] h-[16px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[1px]'></div>
          <div className='w-[40px] h-[10px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]'></div>
        </div>
        <div className='flex items-center gap-[5px]'>
          <div className='w-[50px] h-[12px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]'></div>
          <div className='w-[40px] h-[10px] bg-gradient-to-r from-[#f0f0f0] via-[#e0e0e0] to-[#f0f0f0] background-animate rounded-[2px]'></div>
        </div>
      </div>
    </div>
  );
};

export default BookCardShimmer;