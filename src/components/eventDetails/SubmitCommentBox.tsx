import { ApiResponseType } from "@/types/ApiResponseTypes";
import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

const SubmitCommentBox = ({
  user,
  eventId,
  fetchEvent,
}: {
  user: User;
  eventId: string;
  fetchEvent: (id: string) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const commentText = form.commentText.value;
    const data = {
      commentText,
      username: user?.username || "anonymous",
      likes: 0,
      dislikes: 0,
    };
    console.log(data);

    try {
      // for submitting form with data
      const response = await axios.put<ApiResponseType>(
        `/api/events/comment/${eventId}`,
        data
      );
      fetchEvent(eventId);
      toast({
        title: "Success",
        description: response.data.message,
      });

      // Reset the form fields
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      // if any error submitting form
      console.error("Error during editing event:", error);

      const axiosError = error as AxiosError<ApiResponseType>; // ??? returns axiosError-object= {res,req,message}

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your editing event. Please try again."); // ???

      toast({
        title: "edit Event Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid w-full gap-2">
      <Textarea
        className="text-black"
        placeholder="Type your comment here."
        name="commentText"
      />
      <Button type="submit" className="w-full">
        Comment Now
      </Button>
    </form>
  );
};

export default SubmitCommentBox;
