import React from 'react';
import UserAvatar from '../../../../components/UserAvatar';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

function DetailHeader() {
  return (
    <div className=" flex items-start gap-6">
      <div className="flex items-start gap-3 flex-1">
        <UserAvatar name="Abhishek Sharma" src="https://i.pravatar.cc/80?img=31" size={56} />
        <div>
          <p className="font-[600] mb-1 text-[20] text-black">Abhishek Sharma</p>
          <p className="text-xs text-black font-[600]">27 Nov 1998</p>
          <p className="text-xs text-black font-[600]">Male</p>
        </div>
      </div>
      <div className="flex-1">
        <p className="font-[600] mb-1 text-[20] text-black">Contact Details</p>
        <div className="flex flex-col gap-1 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2"><EmailOutlinedIcon sx={{ fontSize: 16 }} /> abhishek@gmail.com</span>
          <span className="inline-flex items-center gap-2"><PhoneIphoneOutlinedIcon sx={{ fontSize: 16 }} /> 9875678818</span>
          <span className="inline-flex items-center gap-2"><LocationOnOutlinedIcon sx={{ fontSize: 16 }} /> 123, main road, 625501</span>
        </div>
      </div>
      <div className="text-right">
        <p className="font-[600] mb-1 text-[20] text-black">Available Balance</p>
        <p className="text-xl font-semibold">₹45,634.0</p>
      </div>
    </div>
  );
}

export default DetailHeader;


