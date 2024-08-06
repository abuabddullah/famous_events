"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { AppDispatch, RootState } from "@/rtk/app/store";
import { fetchUsersAction } from "@/rtk/reducers/usersActions";
import { clearUsersErrors } from "@/rtk/reducers/usersSlice";
import { ApiResponseType } from "@/types/ApiResponseTypes";
import axios, { AxiosError } from "axios";
import { PenIcon, SaveIcon, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// const users = [];

const AllUsers = () => {
  const [editMode, setEditMode] = useState(false);
  const [role, setRole] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, usersData, error } = useSelector(
    (store: RootState) => store.users
  );
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "users Getting Failed",
        description: error.message,
        variant: "destructive",
      });
      dispatch(clearUsersErrors());
    }
    dispatch(fetchUsersAction());
  }, [dispatch, error, toast]);

  const handleEditUserRole = async (_id: string) => {
    const data = {
      role,
    };
    // setIsSubmitting(true);
    try {
      // for submitting  user role
      const response = await axios.put<ApiResponseType>(
        `/api/users/edit-user/${_id}`,
        data
      );

      toast({
        title: "Success",
        description: response.data.message,
      });
      dispatch(fetchUsersAction());
    } catch (error) {
      // if any error submitting form
      console.error("Error during edit-user:", error);

      const axiosError = error as AxiosError<ApiResponseType>; // ??? returns axiosError-object= {res,req,message}

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your edit-user. Please try again."); // ???

      toast({
        title: "User Editing Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      // setIsSubmitting(false);
      setEditMode(false);
    }
  };

  const handleDeleteUser = async (_id: string) => {
    console.log(_id);
    try {
      // for submitting  user role
      const response = await axios.delete<ApiResponseType>(
        `/api/users/delete-user/${_id}`
      );

      toast({
        title: "Success",
        description: response.data.message,
      });
      dispatch(fetchUsersAction());
    } catch (error) {
      // if any error submitting form
      console.error("Error during edit-user:", error);

      const axiosError = error as AxiosError<ApiResponseType>; // ??? returns axiosError-object= {res,req,message}

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your edit-user. Please try again."); // ???

      toast({
        title: "User deleting Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      // setIsSubmitting(false);
      setEditMode(false);
    }
  };

  return (
    <>
      <div className="rounded-sm lg:border-none border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          All Users
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 md:grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 ">
            <div className="py-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                User
              </h5>
            </div>
            <div className="hidden md:block py-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="py-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Role
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5 border bg-slate-700 text-white">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {usersData?.map((user, key) => (
            <div
              className={`grid  grid-cols-3 md:grid-cols-4  ${
                key === usersData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 py-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {user?.username}
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center py-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user?.email}</p>
              </div>

              <div className="flex items-center justify-center py-2.5 xl:p-5">
                {editMode ? (
                  <div className="">
                    <Select onValueChange={(e) => setRole(e)}>
                      <SelectTrigger
                        id="role"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder={user?.role} />
                      </SelectTrigger>
                      <SelectContent>
                        {" "}
                        <SelectItem
                          disabled={user?.role == "user"}
                          value="user"
                        >
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <div className="grid gap-0.5">
                              <p>user</p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem
                          disabled={user?.role == "admin"}
                          value="admin"
                        >
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <div className="grid gap-0.5">
                              <p>admin</p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <p className="text-meta-3">{user?.role}</p>
                )}
              </div>
              <>
                {editMode ? (
                  <div className="flex gap-4">
                    <div className="items-center justify-center py-2.5 sm:flex xl:p-5">
                      <p className="text-meta-5">
                        <Button
                          onClick={() => handleEditUserRole(user?._id)}
                          className="bg-green-600 p-0 lg:p-4"
                        >
                          <SaveIcon />
                        </Button>
                      </p>
                    </div>

                    <div className="items-center justify-center py-2.5 sm:flex xl:p-5">
                      <p className="text-black dark:text-white">
                        <Button
                          onClick={() => setEditMode(false)}
                          className="bg-red-600 p-0 lg:p-4"
                        >
                          <X />
                        </Button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <div className="items-center justify-center py-2.5 sm:flex xl:p-5">
                      <p className="text-meta-5">
                        <Button
                          onClick={() => setEditMode(true)}
                          className="bg-green-600 p-0 lg:p-4"
                        >
                          <PenIcon />
                        </Button>
                      </p>
                    </div>

                    <div className="items-center justify-center py-2.5 sm:flex xl:p-5">
                      <p className="text-black dark:text-white">
                        <Button
                          onClick={() => handleDeleteUser(user?._id)}
                          className="bg-red-600 p-0 lg:p-4"
                        >
                          <Trash />
                        </Button>
                      </p>
                    </div>
                  </div>
                )}
              </>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
