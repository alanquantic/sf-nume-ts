import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/Layout/MainLayout';
import Spinner from '@/components/Spinner';
import StatusBar from '@/components/StatusBar';
import ConsultProvider from '@/context/ConsultProvider';
import ConsultantPage from '@/pages/dashboard/ConsultantPage';
import HomePage from '@/pages/dashboard/HomePage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import GroupAnnualCalendar from '@/pages/group/GroupAnnualCalendar';
import GroupAnnualReturnsPage from '@/pages/group/GroupAnnualReturnsPage';
import GroupMonthCalendarPage from '@/pages/group/GroupMonthCalendar';
import GroupPinnaclePage from '@/pages/group/GroupPinnaclePage';
import GroupTimeCirclePage from '@/pages/group/GroupTimeCirclePage';
import AnnualCalendar from '@/pages/personal/AnnualCalendar';
import AnnualReturnsPage from '@/pages/personal/AnnualReturnsPage';
import CreateNamePage from '@/pages/personal/CreateNamePage';
import DestinyTablePage from '@/pages/personal/DestinyTablePage';
import LifePathPage from '@/pages/personal/LifePathPage';
import MonthCalendarPage from '@/pages/personal/MonthCalendarPage';
import NamePage from '@/pages/personal/NamePage';
import PinnaclePage from '@/pages/personal/PinnaclePage';
import TimeCirclePage from '@/pages/personal/TimeCirclePage';
import VibrationTimePage from '@/pages/personal/VibrationTimePage';

import ManualPage from '@/pages/dashboard/ManualPage';
import PoliciesPage from '@/pages/dashboard/PoliciesPage';
import SupportPage from '@/pages/dashboard/SupportPage';

import GroupVibrationTimePage from '@/pages/group/GroupVibrationTime';
import SinastryAnnualReturnsPage from '@/pages/sinastry/SinastryAnnualReturnsPage';
import SinastryDestinyTablePage from '@/pages/sinastry/SinastryDestinyTablePage';
import SynastryAnnualCalendar from '@/pages/sinastry/SynastryAnnualCalendar';
import SynastryCompatibilityTablePage from '@/pages/sinastry/SynastryCompatibilityTablePage';
import SynastryMonthCalendarPage from '@/pages/sinastry/SynastryMonthCalendar';
import SynastryPinnaclePage from '@/pages/sinastry/SynastryPinnaclePage';
import SynastryTimeCirclePage from '@/pages/sinastry/SynastryTimeCirclePage';
import SynastryVibrationTimePage from '@/pages/sinastry/SynastryVibrationTimePage';

function App() {
  return (
    <ConsultProvider>
      <MainLayout>
        <Suspense
          fallback={(
            <div className="h-full w-full flex items-center justify-center">
              <Spinner size="xl" />
            </div>
          )}
        >
          <StatusBar />
          <Outlet />
        </Suspense>
      </MainLayout>
    </ConsultProvider>
  );
}

const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/personal/pinnacle', element: <PinnaclePage /> },
      { path: '/personal/life_path', element: <LifePathPage /> },
      { path: '/personal/name', element: <NamePage /> },
      { path: '/personal/create-name', element: <CreateNamePage /> },
      { path: '/personal/destiny_table', element: <DestinyTablePage /> },
      { path: '/personal/time_vibration', element: <VibrationTimePage /> },
      { path: '/personal/annual_returns', element: <AnnualReturnsPage /> },
      { path: '/personal/time_circle', element: <TimeCirclePage /> },
      { path: '/personal/annual_calendar', element: <AnnualCalendar /> },
      { path: '/personal/monthly_calendar', element: <MonthCalendarPage /> },
      // Sinastry Pages
      { path: '/partner/synastry_pinnacle', element: <SynastryPinnaclePage /> },
      { path: '/partner/synastry_annual_returns', element: <SinastryAnnualReturnsPage /> },
      { path: '/partner/synastry_destiny_table', element: <SinastryDestinyTablePage /> },
      { path: '/partner/synastry_compatibility_table', element: <SynastryCompatibilityTablePage /> },
      { path: '/partner/synastry_time_circle', element: <SynastryTimeCirclePage /> },
      { path: '/partner/synastry_monthly_calendar', element: <SynastryMonthCalendarPage /> },
      { path: '/partner/synastry_annual_calendar', element: <SynastryAnnualCalendar /> },
      { path: '/partner/synastry_time_vibration', element: <SynastryVibrationTimePage /> },
      // Group Pages
      { path: '/group/group_pinnacle', element: <GroupPinnaclePage /> },
      { path: '/group/group_annual_returns', element: <GroupAnnualReturnsPage /> },
      { path: '/group/group_time_circle', element: <GroupTimeCirclePage /> },
      { path: '/group/group_annual_calendar', element: <GroupAnnualCalendar /> },
      { path: '/group/group_monthly_calendar', element: <GroupMonthCalendarPage /> },
      { path: '/group/group_vibration_time', element: <GroupVibrationTimePage /> },
      // Dashboard Pages
      { path: '/consultant', element: <ConsultantPage /> },
      { path: '/config', element: <SettingsPage /> },
      { path: '/support', element: <SupportPage /> },
      { path: '/manual', element: <ManualPage /> },
      { path: '/polices', element: <PoliciesPage /> },
      // Home Page
      { path: '/', element: <HomePage /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export default protectedRoutes;
