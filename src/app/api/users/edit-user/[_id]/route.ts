import dbConnect from "@/lib/dbConnect.ts";
import UserModel from "@/model/User.model";

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

  const role = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(params?._id, role);
    return Response.json(
      {
        success: true,
        message: "Username is edited",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing user role:", error);
    return Response.json(
      {
        success: false,
        message: "Error editing user role",
      },
      { status: 500 }
    );
  }
};
