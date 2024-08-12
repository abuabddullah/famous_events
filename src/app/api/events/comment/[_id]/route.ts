import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect.ts";
import EventModel from "@/model/Event.model";
import { getServerSession } from "next-auth";

export const PUT = async (
  request: Request,
  { params }: { params: { _id: string } }
) => {
  await dbConnect();

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

  try {
    const event = await EventModel.findById(params?._id);
    if (!event) {
      return Response.json(
        {
          success: false,
          message: "event is not found",
        },
        { status: 401 }
      );
    }
    const commentData = await request.json();
    const commentId = event?.comments?.length + 1 + Date.now();
    commentData.commentId = commentId;
    event.comments.push(commentData);
    await event.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Event commenting updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error commenting:", error);
    return Response.json(
      {
        success: false,
        message: "Error commenting",
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
  const { reaction, commentId } = await request.json();

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

  try {
    const event = await EventModel.findById(params?._id);
    if (!event) {
      return Response.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    const commentIndex = event.comments.findIndex(
      (cmnt) => cmnt.commentId === commentId
    );

    if (commentIndex === -1) {
      return Response.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    if (reaction === "likes") {
      event.comments[commentIndex].likes += 1;
    } else if (reaction === "dislikes") {
      event.comments[commentIndex].dislikes += 1;
    } else {
      return Response.json(
        { success: false, message: "Invalid reaction type" },
        { status: 400 }
      );
    }

    await EventModel?.findByIdAndUpdate(params?._id, event, { new: true });

    return Response.json(
      { success: true, message: "Event comment reacted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reacting comment:", error);
    return Response.json(
      {
        success: false,
        message: "Error reacting comment",
      },
      { status: 500 }
    );
  }
};
