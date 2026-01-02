const DashboardHome = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dummy Stats Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Daily Jobs
          </div>
          <div className="mt-2 text-3xl font-extrabold text-gray-900">124</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Analysis Pending
          </div>
          <div className="mt-2 text-3xl font-extrabold text-gray-900">12</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Success Rate
          </div>
          <div className="mt-2 text-3xl font-extrabold text-green-600">
            98.5%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
