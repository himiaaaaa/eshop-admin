import React, { useState, useEffect } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import PageContainer from '@/components/layout/page-container';

const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Collections", link: "/collections" }
];

const Collection = () => {
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])

  const getCollections = async () => {
    try {
        const res = await fetch("/api/collections", {
            method: "GET",
        })
        const data = await res.json()
        setCollections(data)
        setLoading(false)

    } catch (err){
        console.log("[collections_GET_error]", err);
    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  return (
    <PageContainer>
        <div className='space-y-2'>
            <Breadcrumbs items={breadcrumbItems} />
        </div>
    </PageContainer>
  )
}

export default Collection