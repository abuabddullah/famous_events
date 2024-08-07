import dbConnect from "@/lib/dbConnect.ts";
import EventModel from "@/model/Event.model";

export const PUT = async (
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

  const eventData = await request.json();
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      params?._id,
      eventData
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
