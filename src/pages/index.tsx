import Card from "@/components/Card";
import { HadistData } from "@/types/api/hadistAPI";
import { RawiRes } from "@/types/api/rawiAPI";
import { config } from "@/utils/config";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { GetServerSideProps } from "next";

interface HomeProps {
  rawi: RawiRes[];
}

const Home: React.FC<HomeProps> = ({ rawi }) => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <main className="p-10 lg:p-52 w-full h-screen flex flex-col space-y-20 justify-center items-center">
      <h1 className="font-semibold text-2xl">
        Cari Hadist Berdasarkan Periwayat:
      </h1>
      <section className="w-full md:w-2/3 lg:w-4/5 grid grid-cols-2 lg:grid-cols-3 gap-5">
        {rawi.map((item) => (
          <Card
            name={item.name}
            id={item.id}
            key={item.id}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(config.APIHost + "/books");
  const rawi = response.data.data;

  return {
    props: {
      rawi,
    },
  };
};

export default Home;
