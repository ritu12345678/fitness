import React from 'react';

function Loader({ 
  size = 'medium', 
  color = '#C82D30', 
  text = 'Loading...',
  fullScreen = false,
  className = ''
}) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  const spinner = (
    <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]}`} 
         style={{ borderColor: color }}>
    </div>
  );

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      {spinner}
      {text && (
        <p className={`text-gray-600 ${textSizes[size]} text-center`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

// Predefined loader variants
export const PageLoader = ({ text = 'Loading page...' }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-40">
    <Loader size="large" text={text} />
  </div>
);

export const InlineLoader = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center py-4">
    <Loader size="small" text={text} />
  </div>
);

export const FullScreenLoader = ({ text = 'Loading...' }) => (
  <Loader size="large" text={text} fullScreen={true} />
);

export const ButtonLoader = () => (
  <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default Loader;
