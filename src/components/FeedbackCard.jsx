const FeedbackCard = ({ name, role, message }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl mx-2 my-4">
      <div className="mb-4">
        <h1 className="font-bold text-2xl">{name}</h1>
        <p className="text-xl text-gray-600">{role}</p>
      </div>
      <p className="text-gray-800 text-xl leading-relaxed">{message}</p>
    </div>
  );
};

export default FeedbackCard;