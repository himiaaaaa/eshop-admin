"use client";

import { useState } from "react";

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

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { CollectionType } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
});

interface CollectionFormProps {
    initialData?: CollectionType | null
}

const breadcrumbItems = [
  { title: "Dashboard", link: "/" },
  { title: "Collections", link: "/collections" },
  { title: "Edit", link: "/collections/new" },
];

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
        ? initialData
        : {
          title: "",
          description: "",
          image: "",
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)

    try {
        setLoading(true)

        const url = initialData
        ? `/api/collections/${initialData._id}`
        : "/api/collections";

        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
        })

        if (res.ok) {
          setLoading(false);
          toast.success(`Collection successfully ${initialData ? "updated" : "created"}`);
          window.location.href = "/collections";
          router.push("/collections");
        }

      } catch (err) {
        console.log("[collections_POST_error]", err);
        toast.error("Something went wrong! Please try again.");
      }

  };

  return (
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
                    onClick={() => router.push("/collections")}
                    type="button"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only" >Back</span>
                  </Button>

                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {initialData ?  'Edit Collections' : 'Create Collections' }
                  </h1>

                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push("/collections")}
                        type="button"
                    >
                      Discard
                    </Button>
                    <Button size="sm" type="submit">
                        {initialData ?  'update' : 'create' } Collections
                    </Button>
                        {initialData ? <DeleteButton type='button' id={initialData._id}/> : ''}
                  </div>

                </div>

                <div className="w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Collection Details</CardTitle>
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
                              <Input placeholder="Title" {...field} />
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
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                   value={field.value ? [field.value] : []}
                                   onChange={(url) => field.onChange(url)}
                                   onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center justify-center gap-2 mt-5 md:hidden">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.push("/collections")}
                            type="button"
                        >
                          Discard
                        </Button>
                        <Button size="sm" type="submit">Save Collections</Button>
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

export default CollectionForm;
