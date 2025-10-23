import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../store/slices/dashboardSlice';
import { useToast } from '../../hooks/useToast';
import SummaryCards from './components/SummaryCards';
import CalendarCard from './components/CalendarCard';
import UpcomingEvents from './components/UpcomingEvents';
import BarChartCard from './components/BarChartCard';
import PieChartCard from './components/PieChartCard';
import TopStudiosTable from './components/TopStudiosTable';
import PackageExpiryTable from './components/PackageExpiryTable';

function Dashboard() {
  const dispatch = useDispatch();
  const { loading, error, dashboardData } = useSelector((state) => state.dashboard);
  const { showError } = useToast();

  useEffect(() => {
    // Fetch dashboard data when component mounts
    const loadDashboardData = async () => {
      try {
        await dispatch(fetchDashboardData()).unwrap();
      } catch (error) {
        showError('Failed to load dashboard data. Please try again.');
        console.error('Dashboard data fetch error:', error);
      }
    };

    loadDashboardData();
  }, []);

  // Show loading state
  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C82D30] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#C82D30] text-white px-4 py-2 rounded-md hover:bg-[#A02528]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SummaryCards />

      {/* First row: Calendar and Upcoming Events */}
      <div className="lg:flex lg:gap-4">
        <div className="lg:w-1/3 flex">
          <div className="flex-1">
            <CalendarCard />
          </div>
        </div>
        <div className="lg:w-2/3 flex">
          <div className="flex-1">
            <UpcomingEvents />
          </div>
        </div>
      </div>

      {/* Second row: Bar Chart and Pie Chart */}
      <div className="lg:flex lg:gap-4">
        <div className="lg:w-2/3 flex">
          <div className="flex-1">
            <BarChartCard />
          </div>
        </div>
        <div className="lg:w-1/3 flex">
          <div className="flex-1">
            <PieChartCard />
          </div>
        </div>
      </div>

      {/* Third row: Top Studio (full width) */}
      <div>
        <TopStudiosTable />
      </div>

      {/* Fourth row: Package Expiry (full width) */}
      <div>
        <PackageExpiryTable />
      </div>
    </div>
  );
}

export default Dashboard;




