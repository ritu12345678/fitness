import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import GeneralTab from './GeneralTab';

function Placeholder({ text }) { return <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-gray-500">{text}</div>; }

function SettingsTabs() {
  const [tab, setTab] = React.useState(0);
  return (
    <div>
      <div className='bg-white border border-gray-200 rounded-xl p-1 shadow-sm'>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ minHeight: 36 }}>
        <Tab label="General" sx={{ minHeight: 36 }} />
        <Tab label="Category" sx={{ minHeight: 36 }} />
        <Tab label="Payment" sx={{ minHeight: 36 }} />
        <Tab label="Social Link" sx={{ minHeight: 36 }} />
        <Tab label="Website Config" sx={{ minHeight: 36 }} />
      </Tabs></div>
      <div className="mt-3">
        {tab === 0 && <GeneralTab />}
        {tab === 1 && <Placeholder text="Category settings" />}
        {tab === 2 && <Placeholder text="Payment settings" />}
        {tab === 3 && <Placeholder text="Social Link settings" />}
        {tab === 4 && <Placeholder text="Website Config settings" />}
      </div>
    </div>
  );
}

export default SettingsTabs;



