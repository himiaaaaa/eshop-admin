"use client"

import Loader from '@/components/Loader';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { ChevronLeft } from 'lucide-react';
import { DataTable } from '@/components/datatable';
import { columns } from '@/components/products/ProductColumns';

const Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Products", link: "/products" },
  ];

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);

    } catch (err) {
      console.log("[products_GET_error]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  
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
              Products
            </h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                size="sm"
                type="submit"
                onClick={() => router.push("/products/new")}
              >
                Create Products
              </Button>
            </div>
          </div>

          <DataTable columns={columns} data={products} searchKey="title" />
        </div>
      </div>
    </PageContainer>
  )
}

export default Products