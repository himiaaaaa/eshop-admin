"use client";

import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { DataTable } from "@/components/datatable";
import { columns } from "@/components/collections/CollectionColumns";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const breadcrumbItems = [
  { title: "Dashboard", link: "/" },
  { title: "Collections", link: "/collections" },
];

const Collection = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET_error]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  console.log("get collections", collections);

  return (
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
              Collections
            </h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                size="sm"
                type="submit"
                onClick={() => router.push("/collections/new")}
              >
                Create Collections
              </Button>
            </div>
          </div>

          <DataTable columns={columns} data={collections} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Collection;
