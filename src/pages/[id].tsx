import { HadistData } from "@/types/api/hadistAPI";
import { config } from "@/utils/config";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

interface ImamPageProps {
  dataHadis: HadistData;
}

const ImamPage: React.FC<ImamPageProps> = ({ dataHadis }) => {
  const { push } = useRouter();
  return (
    <main className="p-10 lg:p-52 w-full h-screen flex flex-col space-y-20 justify-center">
      <button className="flex gap-x-2 items-center" onClick={() => push("/")}>
        <IoMdArrowRoundBack />
        <span className="text-xl font-semibold">Kembali</span>
      </button>
      <h1 className="font-semibold text-2xl">
        Kumpulan Hadis <span className="font-bold">{dataHadis.name}</span>
      </h1>
      <section className="w-full"></section>
    </main>
  );
};

export default ImamPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const response = await axios.get(
    `${config.APIHost}/books/${id}?range=300-500`
  );
  const dataHadis = response.data.data;

  return {
    props: {
      dataHadis,
    },
  };
};
