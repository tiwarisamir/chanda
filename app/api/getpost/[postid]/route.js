import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Post from "@/models/Post";

export async function GET(req, res) {
  try {
    await connectDB();

    console.log("yo req ho Post  ko :", req);
    const id = await req.url.split("=")[1];
    console.log("yo pageid ho page ko :", id);

    // const postDetail = await Post.find({ page: id });

    // if (postDetail) {
    //   return NextResponse.json({
    //     success: true,
    //     postDetails: postDetail,
    //   });
    // }

    return NextResponse.json({
      success: false,
      message: "page not found",
    });
  } catch (err) {
    console.log("error aayo: ", err);
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
}
