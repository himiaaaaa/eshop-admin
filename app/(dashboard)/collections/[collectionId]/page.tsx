"use client"

import { CollectionType } from "@/lib/types"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader"
import CollectionForm from "@/components/collections/CollectionForm"

const DetailCollection = ({ params }: { params: { collectionId: string }}) => {
    const [loading, setLoading] = useState(true)
    const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

    const getCollectionDetails = async () => {
        try { 
          const res = await fetch(`/api/collections/${params.collectionId}`, {
            method: "GET"
          })
          const data = await res.json()

          setCollectionDetails(data)

          setLoading(false)

        } catch (err) {
          console.log("[collectionId_GET_error]", err)
        }
    }

    useEffect(() => {
        getCollectionDetails()
    }, [])

  return loading ? <Loader /> : (
    <div>
        <CollectionForm initialData={collectionDetails}/>
    </div>
  )
}

export default DetailCollection