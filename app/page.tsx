import Image from "next/image";
import { Header } from "./_components/header";
import { Search } from "./_components/search";
import CategoryList from "./_components/category-list";
import { ProductList } from "./_components/ProductList";
import { Button } from "./_components/ui/button";
import { ChevronsRightIcon } from "lucide-react";

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

      <div className="pt-6 space-y-3">
        <div className="px-5 flex items-center justify-between">
          <h2 className="font-semibold">
            Pedidos Recomendados
          </h2>
          <Button variant="ghost" className="text-primary p-0 hover:bg-transparent h-fit">
            Ver todos
            <ChevronsRightIcon />
          </Button>
        </div>
        <ProductList />
      </div>
     
    </>
  );
}
