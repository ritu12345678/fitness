import React from 'react';
import SummaryCards from './components/SummaryCards';
import CalendarCard from './components/CalendarCard';
import UpcomingEvents from './components/UpcomingEvents';
import BarChartCard from './components/BarChartCard';
import PieChartCard from './components/PieChartCard';

function Dashboard() {
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
</div>

  );
}

export default Dashboard;


