import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect.ts";
import EventModel from "@/model/Event.model";
import { getServerSession } from "next-auth";

export const PUT = async (
  request: Request,
  { params }: { params: { _id: string } }
) => {
  await dbConnect();
  const eventData = await request.json();

  const session = await getServerSession(authOptions);
  // const session = await getSession({ request });
  const _user = session?.user;

  if (!session || !_user) {
    console.log({ success: false, message: "Not authenticated" });
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  // role admin trying to edit event
  if (_user?.role !== "admin") {
    return Response.json(
      { success: false, message: "Not Allowed! You are not admin" },
      { status: 401 }
    );
  }
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      params?._id,
      eventData,
      { new: true }
    );
    return Response.json(
      {
        success: true,
        message: "event is edited",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing event role:", error);
    return Response.json(
      {
        success: false,
        message: "Error editing event role",
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { _id: string } }
) => {
  await dbConnect();
  const ratingData = await request.json();

  const session = await getServerSession(authOptions);
  const _user = session?.user;

  if (!session || !_user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not authenticated" }),
      { status: 401 }
    );
  }

  try {
    // Find the event by ID
    const event = await EventModel.findById(params?._id);
    if (!event) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Event not found",
        }),
        { status: 404 }
      );
    }

    // Check if the user has already rated this event
    const existingRatingIndex = event.ratings.findIndex(
      (rating) => rating.username === ratingData.username
    );

    if (existingRatingIndex !== -1) {
      // Update the existing rating
      event.ratings[existingRatingIndex] = ratingData;
    } else {
      // Add the new rating
      event.ratings.push(ratingData);
    }

    // Calculate the average rating
    const ratingsCount = event.ratings.length;
    const totalSumOfRatings = event.ratings.reduce((sum, rating) => {
      return sum + rating.rating;
    }, 0);
    event.avgRating = totalSumOfRatings / ratingsCount;

    // Save the updated event
    await event.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Event rating updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error rating event:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error rating event",
      }),
      { status: 500 }
    );
  }
};

export const GET = async (
  request: Request,
  { params }: { params: { _id: string } }
) => {
  await dbConnect();
  /* 
  const session = await getServerSession(authOptions);
  const _user = session?.user;

  if (!session || !_user) {
    console.log({ success: false, message: "Not authenticated" });
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  if (_user?.role !== "admin") {
    return Response.json(
      { success: false, message: "Not Allowed! You are not admin" },
      { status: 401 }
    );
  } */

  try {
    const event = await EventModel.findById(params?._id);
    return Response.json(
      {
        success: true,
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting event role:", error);
    return Response.json(
      {
        success: false,
        message: "Error getting event role",
      },
      { status: 500 }
    );
  }
};
