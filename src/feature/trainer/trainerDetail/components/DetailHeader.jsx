import React from 'react';
import UserAvatar from '../../../../components/UserAvatar';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MovieEditIcon from '@mui/icons-material/MovieEdit';

function DetailHeader({ trainer, onEdit, bankDetails }) {
  // Default trainer data if none provided
  const defaultTrainer = {
    name: "Abhishek Sharma",
    email: "abhishek@gmail.com",
    phone: "9875678818",
    address: "123, Main Road, 625501",
    ifsc: "SBIN000456",
    img: "https://i.pravatar.cc/80?img=31",
    dateOfBirth: "27 Nov 1998",
    gender: "Male"
  };

  const trainerData = trainer?.user || defaultTrainer;
  const bankData = bankDetails?.[0];

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start shadow-sm">
      {/* Edit Icon */}
      <div 
        className="absolute top-3 right-3 text-gray-500 hover:text-blue-600 cursor-pointer"
        onClick={onEdit}
      >
        <MovieEditIcon fontSize="small" />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-start gap-2 flex-1">
        <div className="flex items-center gap-3">
          <UserAvatar
            name={trainerData?.name}
            src="https://i.pravatar.cc/80?img=31"
            size={56}
          />
          <div>
            <p className="font-semibold text-lg text-black capitalize">{trainerData?.name}</p>
            <p className="text-xs text-gray-600">27 Nov 1998</p>
            <p className="text-xs text-gray-600 capitalize">{trainerData?.gender}</p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="flex flex-col flex-1">
        <p className="font-semibold mb-2 text-black text-base">Contact Details</p>
        <div className="flex flex-col gap-1 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2">
            <EmailOutlinedIcon sx={{ fontSize: 16 }} /> {trainerData?.email}
          </span>
          <span className="inline-flex items-center gap-2">
            <PhoneIphoneOutlinedIcon sx={{ fontSize: 16 }} /> {trainerData?.mobile}
          </span>
          <span className="inline-flex items-center gap-2">
            <LocationOnOutlinedIcon sx={{ fontSize: 16 }} /> {trainerData?.address}
          </span>
        </div>
      </div>

      {/* Bank Details */}
      <div className="flex flex-col flex-1">
        <p className="font-semibold mb-2 text-black text-base">Bank Details</p>
        {!bankData ? (
          <div className="text-sm text-gray-500">No bank details found</div>
        ) : (
          <div className="flex flex-col gap-1 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2">
              <AccountBalanceIcon sx={{ fontSize: 16 }} /> IFSC: {bankData?.ifsc_code || 'N/A'}
            </span>
            <span className="inline-flex items-center gap-2">
              <PhoneIphoneOutlinedIcon sx={{ fontSize: 16 }} /> Account: {bankData?.account_no || 'N/A'}
            </span>
            <span className="inline-flex items-center gap-2">
              <EmailOutlinedIcon sx={{ fontSize: 16 }} /> {bankData?.bank_name || 'N/A'} - {bankData?.holdername || 'N/A'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailHeader;
