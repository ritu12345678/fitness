import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import GeneralTab from './GeneralTab';
import CategoryTab from './CategoryTab';
import PaymentTab from './PaymentTab';
import SocialLinkTab from './SocialLinkTab';
import WebsiteConfigTab from './WebsiteConfigTab';

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
        {tab === 1 && <CategoryTab />}
        {tab === 2 && <PaymentTab />}
        {tab === 3 && <SocialLinkTab />}
        {tab === 4 && <WebsiteConfigTab />}
      </div>
    </div>
  );
}

export default SettingsTabs;






