import dbConnect from "@/lib/dbConnect.ts";
import EventModel from "@/model/Event.model";

export const GET = async (request: Request) => {
  await dbConnect();
  try {
    const events = await EventModel.find();
    return Response.json(
      {
        success: true,
        events,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(
      {
        success: false,
        message: "Error getting events",
      },
      { status: 500 }
    );
  }
};
