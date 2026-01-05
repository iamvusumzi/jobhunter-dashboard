interface StatBoxProps {
  label: string;
  value: string | number | undefined;
  icon: React.ElementType;
  color: string;
  loading: boolean;
}

const StatBox = ({
  label,
  value,
  icon: Icon,
  color,
  loading,
}: StatBoxProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
      <div className={`p-3 rounded-full ${color} mb-3`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-3xl font-extrabold text-gray-900 mb-1">
        {loading ? (
          <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
        ) : (
          value
        )}
      </div>
      <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

export default StatBox;
