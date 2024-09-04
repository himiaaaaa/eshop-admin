"use client";

import { useEffect, useState } from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import ImageUpload from '@/components/image-upload'
import DeleteButton from "@/components/delete-button";
import MultiText from "@/components/multitext"
import MultiSelect from "@/components/multiselect"

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { CollectionType, ProductType } from "@/lib/types";
import Loader from "../Loader";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
    initialData?: ProductType | null
}

const breadcrumbItems = [
  { title: "Dashboard", link: "/" },
  { title: "Products", link: "/products" },
  { title: "Edit", link: "/products/new" },
];

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);

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
      toast.error("Something went wrong! Please try again.");

    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  console.log('initial data', initialData)
  console.log('collections', collections)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
        ? {
            ...initialData,
            collections: initialData.collections.map(
              (collection) => collection._id
            ),
          }
        : {
            title: "",
            description: "",
            media: [],
            category: "",
            collections: [],
            tags: [],
            sizes: [],
            colors: [],
            price: 0.1,
            expense: 0.1,
        },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)

    try {
        const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";

        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
        })

        if (res.ok) {
          setLoading(false);
          toast.success(`Product successfully ${initialData ? "updated" : "created"}`);
          window.location.href = "/products";
          router.push("/products");
        }

      } catch (err) {
        console.log("[products_POST_error]", err);
        toast.error("Something went wrong! Please try again.");
      }

  };

  return loading ? (
    <Loader />
    ) : (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="w-full items-start sm:px-6 sm:py-0 md:gap-8">
          <div>
            <Form {...form}>

              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center py-5">
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 mr-3"
                    onClick={() => router.push("/products")}
                    type="button"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only" >Back</span>
                  </Button>

                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {initialData ?  'Edit Products' : 'Create Products' }
                  </h1>

                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push("/products")}
                        type="button"
                    >
                      Discard
                    </Button>
                    <Button size="sm" type="submit">
                        {initialData ?  'update' : 'create' } Products
                    </Button>
                        {initialData ? <DeleteButton item="product" type='button' id={initialData._id}/> : ''}
                  </div>

                </div>

                <div className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                      {/* <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription> */}
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Title" {...field} onKeyDown={handleKeyPress}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Description"
                                {...field}
                                rows={5}
                                onKeyDown={handleKeyPress}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Media</FormLabel>
                            <FormControl>
                                <ImageUpload
                                   value={field.value}
                                   onChange={(url) => field.onChange([...field.value, url])}
                                   onRemove={(url) =>
                                    field.onChange([
                                      ...field.value.filter((image) => image !== url),
                                    ])
                                  }
                                />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price($)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Price" {...field} onKeyDown={handleKeyPress}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="expense"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expense($)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Expense" {...field} onKeyDown={handleKeyPress}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <Input placeholder="Category" {...field} onKeyDown={handleKeyPress}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="tags"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tags</FormLabel>
                              <FormControl>
                                <MultiText 
                                    placeholder="Tags" 
                                    value={field.value} 
                                    onChange={(tag) => field.onChange([...field.value, tag])}
                                    onRemove={(tagToRemove) =>
                                        field.onChange([
                                          ...field.value.filter((tag) => tag !== tagToRemove),
                                        ])
                                    }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {collections.length > 0 && (
                        <FormField
                          control={form.control}
                          name="collections"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Collections</FormLabel>
                              <FormControl>
                                <MultiSelect
                                    placeholder="Collections" 
                                    collections={collections}
                                    value={field.value} 
                                    onChange={(_id) => field.onChange([...field.value, _id])}
                                    onRemove={(idToRemove) =>
                                        field.onChange([
                                          ...field.value.filter((collectionId) => collectionId !== idToRemove),
                                        ])
                                    }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        )}

                        <FormField
                          control={form.control}
                          name="colors"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Colors</FormLabel>
                              <FormControl>
                                <MultiText 
                                    placeholder="Colors" 
                                    value={field.value} 
                                    onChange={(color) => field.onChange([...field.value, color])}
                                    onRemove={(colorToRemove) =>
                                        field.onChange([
                                          ...field.value.filter((color) => color !== colorToRemove),
                                        ])
                                    }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sizes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sizes</FormLabel>
                              <FormControl>
                                <MultiText 
                                    placeholder="Sizes" 
                                    value={field.value} 
                                    onChange={(size) => field.onChange([...field.value, size])}
                                    onRemove={(sizeToRemove) =>
                                        field.onChange([
                                          ...field.value.filter((size) => size !== sizeToRemove),
                                        ])
                                    }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>

                      <div className="flex items-center justify-center gap-2 mt-5 md:hidden">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.push("/collections")}
                            type="button"
                        >
                          Discard
                        </Button>
                        <Button size="sm" type="submit">Save Products</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductForm;