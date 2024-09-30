"use client"

import { useState } from "react";

import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface DeleteProps {
  item: string
  id: string
  type?: "button" | "submit" | "reset" | undefined
}

const DeleteButton: React.FC<DeleteProps> = ({ item, id, type }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true)

      const itemType = item === "product" ? "products" : "collections"

      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setLoading(false)
        window.location.href = (`/${itemType}`)
        toast.success(`${item} successfully deleted`)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong! Please try again.")
    }
  }


  return (
    <div>
      
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="bg-red-700" type={type}>
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-700">Are you sure to delete ${item}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your ${item}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-700 text-white"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default DeleteButton;
