interface ExecutionsFooterProps {
  onLoadLast20: () => void;
}

const ExecutionsFooter = ({ onLoadLast20 }: ExecutionsFooterProps) => {
  return (
    <div className="text-center pt-2">
      <button
        onClick={onLoadLast20}
        className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
      >
        Load last 20 runs
      </button>
    </div>
  );
};

export default ExecutionsFooter;
