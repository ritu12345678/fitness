import TextField from '@mui/material/TextField';

function GeneralTab() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">App Name</label>
          <TextField fullWidth placeholder="Enter App Name" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">App Logo</label>
          <div className="flex items-center gap-3">
            <TextField fullWidth placeholder="" InputProps={{ readOnly: true }} />
            <button className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">Upload</button>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">App Language</label>
          <div className="flex flex-wrap gap-2">
            {['Tamil', 'English', 'Hindi', 'Marathi'].map(l => (
              <span key={l} className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralTab