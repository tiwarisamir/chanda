import { NextResponse } from "next/server";
import User from "@/models/User";
import donationPage from "@/models/donationPage";
import connectDB from "@/db/connectDB";
import Payment from "@/models/Payment";

export async function GET(req, res) {
  try {
    await connectDB();

    const id = await req.url.split("=")[1];

    const pageDetail = await donationPage.findOne({ _id: id });
    const organiser = await User.findOne({ _id: pageDetail.user });
    const pay = await Payment.find({ to_page: id });

    if (pageDetail) {
      return NextResponse.json({
        success: true,
        organiser: organiser,
        pageDetails: pageDetail,
        recentDonation: pay,
      });
    }

    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  } catch (err) {
    console.log("error aayo: ", err);
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
}
