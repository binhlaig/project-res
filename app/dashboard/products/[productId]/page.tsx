"use client";

import Loader from "@/components/custom ui/Loader";
import ProductsForm from "@/components/products/productsForm";
import { useEffect, useState } from "react";

const productDetails = ({ params }: { params: { productId: string } }) => {
  const [productDetails, setProductDetails] = useState<ProductsType | null>( null);
  const [loading, setLoading] = useState(true);

  const getproductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[collectionId_GET]", err);
    }
  };

  useEffect(() => {
    getproductDetails();
  }, []);

  console.log(productDetails);
  
  return loading ? (
    <Loader />
  ) : (
    <div>
     <ProductsForm initialData={productDetails}/>
    </div>
  );
};

export default productDetails;
