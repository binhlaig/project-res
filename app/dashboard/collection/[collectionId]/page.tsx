"use client"

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import { useEffect, useState } from "react"
const collectionDetails = ({params}:{params:{collectionId: string}}) => {
  const [loading,setLoading] = useState(true)
  const [collectionDetails,setCollectionDetails]= useState<CollectionType | null>(null);
  const getcollection = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`,{
        method : "GET"
      });
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[collectionId_GET]", err); 
    }

  }

  useEffect(()=> {
   getcollection()
  },[])
  return loading? <Loader/>: (
    <div>
       <CollectionForm initialData={collectionDetails}/>
    </div>
  )
}

export default collectionDetails
