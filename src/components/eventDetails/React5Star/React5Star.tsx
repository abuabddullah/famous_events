import { StarIcon } from "lucide-react";

const React5Star = ({
  ratingStyleOnSelect = "text-orange-400",
  ratingCardStyle = "flex gap-2 items-center p-4 rounded-lg text-slate-600 bg-slate-100",
  rating = 0,
  handleRatingClick = (e) => console.log(e),
  isDisabled = false,
}: {
  ratingStyleOnSelect: string;
  ratingCardStyle: string;
  rating: number | any;
  handleRatingClick: (rtg: number) => void;
  isDisabled: boolean;
}) => {
  // const [rating, setRating] = useState<number | undefined>(rating);
  return (
    <div className={ratingCardStyle}>
      {[...Array(5)].map((_, index) => (
        <StarIcon
          className={`${
            index + 1 <= rating ? ratingStyleOnSelect : "text-inherit"
          } ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => !isDisabled && handleRatingClick(index + 1)}
          key={index}
        />
      ))}
    </div>
  );
};

export default React5Star;
