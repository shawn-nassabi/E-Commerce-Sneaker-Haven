export default function ReviewCard({ reviewData }) {
  return (
    <div className="block text-left p-6 w-fit min-w-[175px] h-fit max-w-[250px] min-h-[100px] bg-gray-200 mx-2 my-4 rounded-lg">
      <h3 className="text-sm">by: {reviewData.userName}</h3>
      <h1 className="font-bold text-xl  my-1">{reviewData.rating}/10</h1>
      <p>{reviewData.review}</p>
    </div>
  );
}
