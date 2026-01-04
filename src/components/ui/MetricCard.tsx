interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  subtext?: string;
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  color,
  subtext,
}: MetricCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">
        {title}
      </h3>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
  </div>
);

export default MetricCard;
