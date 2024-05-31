import Pagination from "@/components/Pagination";
import { HadistData } from "@/types/api/hadistAPI";
import { config } from "@/utils/config";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";

interface ImamPageProps {
  dataHadis: HadistData;
  page: number;
  start: number;
  end: number;
}

interface SearchFormInputs {
  search: string;
}

const ImamPage: React.FC<ImamPageProps> = ({ dataHadis, page, start, end }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data: SearchFormInputs) => {
    const start = parseInt(data.search);
    if (!isNaN(start)) {
      const end = start + 1;
      router.push(`/${router.query.id}?range=${start}-${end}`);
    }
  };

  useEffect(() => {
    if (
      dataHadis.hadiths.length === 0 ||
      dataHadis.hadiths[0].number !== start
    ) {
      setErrorMessage(
        "The requested Hadith range is not available. Please try a different range."
      );
    } else {
      setErrorMessage("");
    }
  }, [start, dataHadis.hadiths]);

  return (
    <main className="p-10 sm:p-14 md:p-24 lg:p-40 w-full h-[100dvh] flex flex-col space-y-10 justify-center">
      <h1
        className="flex gap-x-2 items-center"
        onClick={() => router.push("/")}
      >
        <IoMdArrowRoundBack />
        <span className="text-xl font-semibold cursor-pointer">Kembali</span>
      </h1>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">
          Kumpulan Hadis <span className="font-bold">{dataHadis.name}</span>
        </h1>
        <aside className="flex gap-x-2 items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-x-2">
            <input
              type="text"
              className="border rounded-md p-1"
              {...register("search", {
                required: true,
                pattern: /^[0-9]*$/,
              })}
            />
            <button type="submit" className="border p-2 rounded-md">
              <HiOutlineSearch />
            </button>
          </form>
        </aside>
      </div>
      {errors.search && (
        <span className="text-red-500">Please enter a valid number</span>
      )}
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      <section className="w-full min-h-[300px] max-h-[500px] flex flex-col md:flex-row gap-5 md:gap-10">
        {dataHadis.hadiths.map((item) => (
          <section
            className="w-full max-h-full flex flex-col gap-y-5 overflow-scroll p-5 rounded-lg shadow-md border"
            key={item.number}
          >
            <h1>
              Hadis {dataHadis.name} No.{item.number}
            </h1>
            <h1 className="text-right">{item.arab}</h1>
            <h1>{item.id}</h1>
          </section>
        ))}
      </section>
      <Pagination page={page} />
    </main>
  );
};

export default ImamPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, range = "1-2" } = context.query as { id: string; range?: string };
  let [start, end] = range.split("-").map(Number);

  // Ensure the range is always one step
  if (end - start !== 1) {
    end = start + 1;
  }

  const response = await axios.get(
    `${config.APIHost}/books/${id}?range=${start}-${end}`
  );
  const dataHadis = response.data.data;
  const page = Math.ceil(end / 2);

  return {
    props: {
      dataHadis,
      page,
      start,
      end,
    },
  };
};
