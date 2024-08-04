import mongoose, { Document, Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

export interface Event extends Document {
  title: string;
  description: string;
  date: any;
  time: any;
  location: string;
  category: string;
  ticketPrice: number;
  ratings: any[];
  images: string[];
  comments: any[];
  attendees: any[];
}

// Updated User schema
const EventSchema: Schema<Event> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description Avatar is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "time is required"],
  },
  location: {
    type: String,
    required: [true, "location is required"],
    enum: ["Tech City", "Art Town", "Music City"],
  },
  category: {
    type: String,
    required: [true, "category Code is required"],
    enum: ["All", "Conferences", "Workshops", "Concerts"],
  },
  ticketPrice: {
    type: Number,
    required: [true, "ticket-Price Expiry is required"],
  },
  ratings: [],
  images: [],
  comments: [],
  attendees: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

const EventModel =
  (mongoose.models.Event as mongoose.Model<Event>) ||
  mongoose.model<Event>("Event", EventSchema);

export default EventModel;
