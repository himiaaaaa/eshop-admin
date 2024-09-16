"use client"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { DataTable } from "@/components/datatable"
import PageContainer from "@/components/layout/page-container"
import Loader from "@/components/Loader"
import { columns } from "@/components/orders/OrderColumns"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import { Button } from '@/components/ui/button';

const Orders = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Orders", link: "/orders" },
  ];

  const getOrders = async () => {
    try {

      const res = await fetch(`/api/orders`)
      const data = await res.json()
      setOrders(data)
      setLoading(false)

    } catch (err) {

      console.log("[orders_GET_error", err)

    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  console.log('orders', orders)

  return loading ? (
    <Loader />
  ) : (
    <PageContainer>
      <div className="space-y-5">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="w-full items-start sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center py-5">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 mr-3"
              onClick={() => router.push("/")}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Orders
            </h1>

            {/* <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                size="sm"
                type="submit"
                onClick={}
              >
                Create 
              </Button>
            </div> */}
          </div>

          <DataTable columns={columns} data={orders} searchKey="_id" />
        </div>
      </div>
    </PageContainer>
  )
}

export const dynamic = "force-dynamic";

export default Orders