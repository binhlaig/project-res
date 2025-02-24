"use client"
import { DataTable } from '@/components/custom ui/DataTable'
import { columns } from '@/components/products/productColunm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Products = () => {
  const router = useRouter();
  const [products,setProducts] =useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);
  
  return (
    <div className='px-10 py-5'>
    <div className="flex items-center justify-between">
     <p className="text-heading2-bold">Product Page</p>
     <Button
       className="bg-blue-700 text-white"
       type="button"
       onClick={() => router.push("/dashboard/products/new")}
     >
      <Plus/> အသစ်
     </Button>
   </div>
   <Separator className="my-4" />
   <DataTable columns={columns} data={products} searchKey="productname" />
     
 </div>
  )
}

export default Products
