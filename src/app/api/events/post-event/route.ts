import dbConnect from "@/lib/dbConnect.ts";
import EventModel from "@/model/Event.model";

export const POST = async (request: Request) => {
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

  const eventData = await request.json();
  console.log(eventData);
  try {
    const newEvent = new EventModel(eventData);

    await newEvent.save();
    return Response.json(
      {
        success: true,
        message: "newEvent is posted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error posting newEvent:", error);
    return Response.json(
      {
        success: false,
        message: "Error posting newEvent",
      },
      { status: 500 }
    );
  }
};
