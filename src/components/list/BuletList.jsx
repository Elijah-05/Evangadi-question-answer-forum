const BuletList = ({ text }) => {
  return (
    <li className=" flex gap-2">
      <div className=" shrink-0 w-[8px] h-[8px] bg-[#f6a54e] mt-[6px] rounded-full" />
      <span className=" text-sm sm:text-base ">{text}</span>
    </li>
  );
};

export default BuletList;
