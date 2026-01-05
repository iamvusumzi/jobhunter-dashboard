interface ProgressBarProps {
  label: string;
  current: number;
  max: number;
  colorClass: string;
}

const ProgressBar = ({ label, current, max, colorClass }: ProgressBarProps) => {
  const percent = Math.min((current / max) * 100, 100);
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">
          {current} / {max}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${colorClass}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
