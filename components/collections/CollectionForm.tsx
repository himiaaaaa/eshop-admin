"use client"

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    ChevronLeft,
} from "lucide-react"
import Image from "next/image"

const breadcrumbItems = [
    { title: 'Dashboard', link: '/' },
    { title: 'Collections', link: '/collections' },
    { title: 'Edit', link: '/collections/new' }
  ];

const CollectionForm = () => {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="w-full items-start sm:px-6 sm:py-0 md:gap-8">
          <div>
            <div className="flex items-center py-5">
              <Button variant="outline" size="icon" className="h-7 w-7 mr-3">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Create Collections
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Collections details</Button>
              </div>
            </div>
            <div className="w-full">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Collection Details</CardTitle>
                    {/* <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">

                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          placeholder="Healthy dog food"
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          className="min-h-32"
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="description">Image</Label>
                        <Image
                           alt="Product image"
                           className="aspect-square w-1/3 rounded-md object-cover"
                           height="50"
                           src="/placeholder.jpg"
                           width="50"
                        />
                        <Button variant="outline" size="sm" className='w-1/3'>
                          Upload Image
                        </Button> 
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </div>
            <div className="flex items-center justify-center gap-2 mt-5 md:hidden">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm">Save Collections</Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default CollectionForm