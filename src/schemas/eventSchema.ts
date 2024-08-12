import { z } from "zod";

const ratingSchema = z.object({
  rating: z.number().min(0).max(5),
  username: z.string(),
  avatar: z.string(),
});

const eventSchema = z.object({
  title: z
    .string()
    .min(5, { message: "title must be at least 5 characters." })
    .max(50, { message: "title must not be longer than 50 characters." }),

  description: z
    .string()
    .min(10, { message: "description must be at least 10 characters." })
    .max(500, {
      message: "description must not be longer than 500 characters.",
    }),

  date: z.date({ message: "A date of event is required." }),

  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Time must be in HH:MM format.",
  }),

  location: z.enum(["Tech City", "Art Town", "Music City"], {
    message:
      "Invalid category. Choose from 'Tech City', 'Art Town', or 'Music City'.",
  }),

  category: z.enum(["Conferences", "Workshops", "Concerts"], {
    message:
      "Invalid category. Choose from 'All', 'Conferences', 'Workshops', or 'Concerts'.",
  }),

  ticketPrice: z
    .number()
    .nonnegative({ message: "ticketPrice must be a non-negative number." }),
  avgRating: z.number().optional(),
  ratings: z.array(ratingSchema).optional(),

  images: z.array(z.string().url()).optional(),

  comments: z.array(z.string()).optional(),

  attendees: z.array(z.string().uuid()).optional(),

  seatsAvailable: z
    .number()
    .nonnegative({ message: "ticketPrice must be a non-negative number." }),

  seatsBooked: z
    .number()
    .nonnegative({ message: "ticketPrice must be a non-negative number." })
    .optional(),
});

export default eventSchema;
