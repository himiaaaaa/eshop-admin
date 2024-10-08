import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

export const GET = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
) => {
    try {
        await connectToDB()

        const collection = await await Collection.findById(params.collectionId).populate({ path: "products", model: Product });

        if (!collection) {
            return new NextResponse(
              JSON.stringify({ message: "Collection no found" }), { status: 404 });
        }

        return NextResponse.json(collection, { status: 200 });

    } catch (err) {
        console.log("[collectionId_GET_Error]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export const POST = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
) => {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      await connectToDB();
  
      let collection = await Collection.findById(params.collectionId);
  
      if (!collection) {
        return new NextResponse("Collection no found", { status: 404 });
      }
  
      const { title, subtitle, description, image } = await req.json();
  
      if (!title || !image) {
        return new NextResponse("Title and image are required", { status: 400 });
      }
  
      collection = await Collection.findByIdAndUpdate(
        params.collectionId,
        { title, subtitle, description, image },
        { new: true }
      );
  
      await collection.save();
  
      return NextResponse.json(collection, { status: 200 });

    } catch (err) {

      console.log("[collectionId_POST_error]", err);

      return new NextResponse("Internal error", { status: 500 });

    }
  };
  

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
  ) => {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      await connectToDB();
  
      await Collection.findByIdAndDelete(params.collectionId);

      await Product.updateMany(
        { collections: params.collectionId },
        { $pull: { collections: params.collectionId } }
      );
      
      return new NextResponse("Collection is deleted", { status: 200 });

    } catch (err) {
      console.log("[collectionId_DELETE_error]", err);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

  export const dynamic = "force-dynamic";