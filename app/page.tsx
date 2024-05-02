import Image from "next/image";
import { Header } from "./_components/header";
import { Search } from "./_components/search";
import CategoryList from "./_components/category-list";
import { ProductList } from "./_components/ProductList";
import { Button } from "./_components/ui/button";
import { ChevronsRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import { PromoBanner } from "./_components/promo-banner";

export default async function Home() {

  const products = await db.product.findMany({
    take: 10,
    include: {
        restaurant: {
            select: {
                name: true
            }
        }
    }
})

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
        <PromoBanner 
          src="/banner-01.png"
          alt="Até 30% de desconto em pitzza!"
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
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner 
          src="/banner-02.png"
          alt="Até 30% de desconto em pitzza!"
        />
      </div>
     
    </>
  );
}
