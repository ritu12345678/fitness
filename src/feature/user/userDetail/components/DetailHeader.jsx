import React from 'react';
import UserAvatar from '../../../../components/UserAvatar';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MovieEditIcon from '@mui/icons-material/MovieEdit';

function DetailHeader() {
  return (
    <div className="grid grid-cols-4 items-start gap-8 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
      {/* Profile Section */}
      <div className="flex items-start gap-3">
        <UserAvatar name="Abhishek Sharma" src="https://i.pravatar.cc/80?img=31" size={56} />
        <div>
          <p className="font-semibold text-[18px] leading-6 text-black">Abhishek Sharma</p>
          <p className="text-[12px] leading-5 text-gray-800 font-medium">27 Nov 1998</p>
          <p className="text-[12px] leading-5 text-gray-800 font-medium">Male</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="pl-8 md:pl-12">
        <p className="font-semibold text-[14px] leading-5 text-gray-900 mb-1">Contact Details</p>
        <div className="flex flex-col gap-2 text-[13px] text-gray-700">
          <span className="inline-flex items-center gap-2">
            <EmailOutlinedIcon sx={{ fontSize: 16, color: '#6b7280' }} /> abhishek@gmail.com
          </span>
          <span className="inline-flex items-center gap-2">
            <PhoneIphoneOutlinedIcon sx={{ fontSize: 16, color: '#6b7280' }} /> 9875678818
          </span>
          <span className="inline-flex items-center gap-2">
            <LocationOnOutlinedIcon sx={{ fontSize: 16, color: '#6b7280' }} /> 123, main road, 625501
          </span>
        </div>
      </div>

      {/* Balance Section */}
      <div className="pl-8 md:pl-12">
        <p className="font-semibold text-[14px] leading-5 text-gray-900 mb-1">Available Balance</p>
        <p className="text-[20px] leading-6 font-semibold text-gray-900">₹45,634.0</p>
      </div>

      {/* Edit Icon Section */}
      <div className="flex justify-end items-start">
        <MovieEditIcon sx={{ fontSize: 18, color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#111827' } }} />
      </div>
    </div>
  );
}

export default DetailHeader;

