import Image from "next/image";
import { Header } from "./_components/header";
import { Search } from "./_components/search";
import CategoryList from "./_components/category-list";

export default function Home() {
  return (
    <>
      <Header />
      
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 py-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image 
          src="/banner-01.png"
          alt="Até 30% de desconto em pitzza!"
          height={0}
          width={0}
          className="h-auto w-full"
          objectFit="contain"
          sizes="100vh"
          quality={100}
        />
      </div>
    </>
  );
}
