import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product no found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(product), { status: 200 })

  } catch (err) {
    console.log("[productId_GET_api_error]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
  ) => {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      await connectToDB();
  
      const product = await Product.findById(params.productId);
  
      if (!product) {
        return new NextResponse(
          JSON.stringify({ message: "Product not found" }),
          { status: 404 }
        );
      }
  
      const {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        flavors,
        colors,
        price,
        expense,
      } = await req.json();
  
      if (!title || !description || !media || !category || !price || !expense) {
        return new NextResponse("Not enough data to create a new product", {
          status: 400,
        });
      }
  
      const addedCollections = collections.filter(
        (collectionId: string) => !product.collections.includes(collectionId)
      );
  
      const removedCollections = product.collections.filter(
        (collectionId: string) => !collections.includes(collectionId)
      );


      // Update collections
      await Promise.all([

        ...addedCollections.map((collectionId: string) =>
          Collection.findByIdAndUpdate(collectionId, {
            $push: { products: product._id },
          })
        ),
  
        ...removedCollections.map((collectionId: string) =>
          Collection.findByIdAndUpdate(collectionId, {
            $pull: { products: product._id },
          })
        ),
      ]);
  
      // Update product
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        {
          title,
          description,
          media,
          category,
          collections,
          tags,
          sizes,
          flavors,
          colors,
          price,
          expense,
        },
        { new: true }
      ).populate({ path: "collections", model: Collection });
  
      await updatedProduct.save();
  
      return NextResponse.json(updatedProduct, { status: 200 });

    } catch (err) {

      console.log("[productId_POST_error]", err);
      return new NextResponse("Internal error", { status: 500 });

    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
) => {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      await connectToDB();
  
      const product = await Product.findById(params.productId);
  
      if (!product) {
        return new NextResponse(
          JSON.stringify({ message: "Product no found" }),
          { status: 404 }
        );
      }
  
      await Product.findByIdAndDelete(product._id);
  
      // Update collections
      await Promise.all(
        product.collections.map((collectionId: string) =>
          Collection.findByIdAndUpdate(collectionId, {
            $pull: { products: product._id },
          })
        )
      );
  
      return new NextResponse(JSON.stringify({ message: "Product successfully deleted" }), {
        status: 200,
      });
    } catch (err) {

      console.log("[productId_DELETE_error]", err);
      return new NextResponse("Internal error", { status: 500 });

    }
};
  
export const dynamic = "force-dynamic";
  
  