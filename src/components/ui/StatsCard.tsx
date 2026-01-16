import clsx from "clsx";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ElementType;
  color: string;
  to?: string;
  onClick?: () => void;
}

const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  color,
  to,
  onClick,
}: StatCardProps) => {
  const CardInner = (
    <div
      className={clsx(
        "bg-white p-6 rounded-xl shadow-sm border border-gray-200",
        (to || onClick) &&
          "cursor-pointer hover:shadow-md hover:border-gray-300 transition"
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
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

  return to ? (
    <Link
      to={to}
      className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
    >
      {CardInner}
    </Link>
  ) : (
    CardInner
  );
};

export default StatCard;
