import dbConnect from "@/lib/dbConnect.ts";
import UserModel from "@/model/User.model";

export const DELETE = async (
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
    const response = await UserModel.findByIdAndDelete(params?._id);
    console.log(response);
    return Response.json(
      {
        success: true,
        message: "User is deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return Response.json(
      {
        success: false,
        message: "Error deleting user role",
      },
      { status: 500 }
    );
  }
};
