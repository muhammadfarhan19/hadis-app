import Pagination from "@/components/Pagination";
import { HadistData } from "@/types/api/hadistAPI";
import { config } from "@/utils/config";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

interface ImamPageProps {
  dataHadis: HadistData;
  page: number;
}

const ImamPage: React.FC<ImamPageProps> = ({ dataHadis, page }) => {
  const router = useRouter();
  return (
    <main className="p-10 sm:p-14 md:p-24 lg:p-40 w-full h-screen flex flex-col space-y-20 justify-center">
      <h1
        className="flex gap-x-2 items-center"
        onClick={() => router.push("/")}
      >
        <IoMdArrowRoundBack />
        <span className="text-xl font-semibold cursor-pointer">Kembali</span>
      </h1>
      <h1 className="font-semibold text-2xl">
        Kumpulan Hadis <span className="font-bold">{dataHadis.name}</span>
      </h1>
      <section className="w-full min-h-[300px] max-h-[500px] flex flex-col md:flex-row gap-3 md:gap-10">
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
    },
  };
};
