import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";

type PaginationProps = {
  page: number;
};

const Pagination: React.FC<PaginationProps> = ({ page }) => {
  const router = useRouter();
  const { id } = router.query;

  const handleBackClick = () => {
    if (page > 1) {
      const newPage = page - 1;
      const range = `${newPage * 2 - 1}-${newPage * 2}`;
      router.push(`/${id}?range=${range}`);
    }
  };

  const handleForwardClick = () => {
    const newPage = page + 1;
    const range = `${newPage * 2 - 1}-${newPage * 2}`;
    router.push(`/${id}?range=${range}`);
  };

  return (
    <section className="w-full flex justify-between items-center">
      <button
        onClick={handleBackClick}
        className="border p-3 rounded-md bg-gray-200 transition-all duration-100 active:scale-90"
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={handleForwardClick}
        className="border p-3 rounded-md bg-gray-200 transition-all duration-100 active:scale-90"
      >
        <IoIosArrowForward />
      </button>
    </section>
  );
};

export default Pagination;
