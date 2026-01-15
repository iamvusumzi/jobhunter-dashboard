interface JobDescriptionCardProps {
  description?: string | null;
}

const JobDescriptionCard = ({ description }: JobDescriptionCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>

      <div className="prose prose-sm max-w-none text-gray-600">
        {description ? (
          <p className="whitespace-pre-wrap">{description}</p>
        ) : (
          <p className="italic text-gray-400">No description available.</p>
        )}
      </div>
    </div>
  );
};

export default JobDescriptionCard;
