import { useEffect, useState } from "react";
import Rate from "../utils/utils";
import { ReviewsApi } from "../features/users/UsersAPI";

const Review = () => {
  const { data: reviews, isLoading, error, refetch } = ReviewsApi.useGetReviewsQuery();
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState<string>("");
console.log(reviews)

useEffect(() => {
  refetch(); // Fetch reviews on mount
},[refetch])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission, e.g., by sending data to the API
    console.log("Submitted rating:", rating, "experience:", experience);
    setRating(0);
    setExperience("");
    refetch()
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg mb-6">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Rate our services</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
              Rating (1-5)
            </label>
            <input
              id="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              placeholder="Rate"
              max={5}
              min={1}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
              Describe your experience
            </label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              cols={25}
              rows={5}
              placeholder="Your experience"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <h2 className="font-extrabold text-center">REVIEWS</h2>
      <div className="flex flex-wrap justify-center m-auto items-center p-4 bg-slate-400 rounded-lg shadow-lg">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading reviews</p>}
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                {review.user?.link && (
                  <img src={review.user.link} alt="User profile" className="rounded-lg" />
                )}
                <p className="text-center">{Rate(review.rating)}</p>
                <p>{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </>
  );
};

export default Review;
