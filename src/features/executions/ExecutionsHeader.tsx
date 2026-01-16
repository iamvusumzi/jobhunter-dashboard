interface ExecutionsHeaderProps {
  title: string;
  subtitle?: string;
}

const ExecutionsHeader = ({ title, subtitle }: ExecutionsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default ExecutionsHeader;
