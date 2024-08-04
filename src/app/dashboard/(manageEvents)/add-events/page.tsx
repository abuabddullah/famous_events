import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MicVocalIcon, PresentationIcon, SettingsIcon } from "lucide-react";

const AddEvents = () => {
  return (
    <>
      <div className="w-full lg:w-1/2">
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Add Events
            </legend>
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="title here ..."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="describe event here ..."
                className="min-h-[9.5rem]"
                name="description"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger
                  id="category"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conferences">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <PresentationIcon className="size-5" />
                      <div className="grid gap-0.5">
                        <p>Conferences</p>
                        <p className="text-xs" data-description>
                          Our fastest model for general use cases.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Workshops">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <SettingsIcon className="size-5" />
                      <div className="grid gap-0.5">
                        <p>Workshops</p>
                        <p className="text-xs" data-description>
                          Performance and speed for efficiency.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Concerts">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MicVocalIcon className="size-5" />
                      <div className="grid gap-0.5">
                        <p>Concerts</p>
                        <p className="text-xs" data-description>
                          The most powerful model for complex computations.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Select>
                <SelectTrigger
                  id="location"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech City">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="grid gap-0.5">
                        <p>Tech City</p>
                        <p className="text-xs" data-description>
                          Our fastest model for general use cases.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Art Town">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="grid gap-0.5">
                        <p>Art Town</p>
                        <p className="text-xs" data-description>
                          Performance and speed for efficiency.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Music City">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="grid gap-0.5">
                        <p>Music City</p>
                        <p className="text-xs" data-description>
                          The most powerful model for complex computations.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="ticketPrice">Ticket Price</Label>
              <Input
                className="hide-spinner"
                id="ticketPrice"
                type="number"
                name="ticketPrice"
                placeholder="0"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="seats">Available seats</Label>
              <Input
                className="hide-spinner"
                id="seats"
                type="number"
                name="seats"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" name="date" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="time">time</Label>
                <Input id="time" type="time" name="time" />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default AddEvents;
