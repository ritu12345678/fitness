import React, { useState, useEffect, useRef } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Box, TextField, Popper, Paper, IconButton, ClickAwayListener } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format } from 'date-fns';

const DateRangePicker = ({ startDate, endDate, onChange, onClear }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Helper to parse date string or return Date object
  const parseDate = (dateString) => {
    if (!dateString) return null;
    if (dateString instanceof Date) return dateString;
    return new Date(dateString);
  };

  const getInitialRange = () => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    return [{
      startDate: start || new Date(),
      endDate: end || new Date(),
      key: 'selection'
    }];
  };

  const [tempRange, setTempRange] = useState(getInitialRange);

  // Sync tempRange when props change
  useEffect(() => {
    if (startDate || endDate) {
      const start = parseDate(startDate);
      const end = parseDate(endDate);
      setTempRange([{
        startDate: start || new Date(),
        endDate: end || new Date(),
        key: 'selection'
      }]);
    }
  }, [startDate, endDate]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (ranges) => {
    const { selection } = ranges;
    setTempRange([selection]);

    // Check if both dates are selected and they're different
    const hasStartAndEnd = selection.startDate && selection.endDate;
    const areDifferent = hasStartAndEnd && selection.startDate.getTime() !== selection.endDate.getTime();

    console.log('📅 Selection:', {
      hasStartDate: !!selection.startDate,
      hasEndDate: !!selection.endDate,
      startDate: selection.startDate,
      endDate: selection.endDate,
      areDifferent
    });

    // Only call onChange when range is complete (both dates selected and different)
    if (areDifferent && onChange) {
      const formattedStart = format(selection.startDate, 'yyyy-MM-dd');
      const formattedEnd = format(selection.endDate, 'yyyy-MM-dd');
      
      console.log('✅ Calling onChange with complete range:', { formattedStart, formattedEnd });
      onChange(formattedStart, formattedEnd);
      
      // Close the calendar after selection
      handleClose();
    } else {
      console.log('⏸️ Waiting for complete range...');
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    setTempRange([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]);
  };

  const formatDisplayDate = (date) => {
    if (!date) return 'Select Date Range';
    return format(new Date(date), 'dd-MMM-yyyy');
  };

  const displayText = startDate && endDate 
    ? `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`
    : 'Select Date Range';

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 0.5,
          height: '40px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          cursor: 'pointer',
          backgroundColor: '#f9fafb',
          '&:hover': {
            borderColor: '#9ca3af',
          },
          minWidth: '220px',
        }}
      >
        <CalendarTodayIcon sx={{ fontSize: 18, color: '#6b7280' }} />
        <TextField
          value={displayText}
          size="small"
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Select Date Range"
          onClick={(e) => e.stopPropagation()}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'transparent',
              border: 'none',
              '& fieldset': { border: 'none' },
            },
          }}
        />
        {startDate && endDate && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            sx={{ p: 0.5 }}
          >
            ×
          </IconButton>
        )}
      </Box>

      {Boolean(anchorEl) && (
        <ClickAwayListener onClickAway={handleClose}>
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="bottom-start"
            style={{ zIndex: 1300 }}
          >
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              <style>
                {`
                  .rdrDateRangePicker {
                    background: white;
                  }
                  .rdrSelected,
                  .rdrInRange {
                    background: transparent !important;
                    border: 2px solid #3b82f6 !important;
                    color: #1f2937 !important;
                  }
                  .rdrStartEdge,
                  .rdrEndEdge {
                    background: #3b82f6 !important;
                    color: white !important;
                  }
                `}
              </style>
              <DateRange
                editableDateInputs={false}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={tempRange}
                showDateDisplay={false}
              />
            </Paper>
          </Popper>
        </ClickAwayListener>
      )}
    </>
  );
};

export default DateRangePicker;
