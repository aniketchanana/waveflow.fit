'use client';
import { Chip, FormLabel, TextFieldProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addDays, addMonths } from 'date-fns';
import { FocusEvent } from 'react';

import HStack from '@/components/StyledComponents/HStack';

type DateAdderItem = {
  label: string;
  amount: number;
  unit: 'days' | 'months';
};

type TDatePickerProps = {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  name?: string;
  error?: boolean;
  required?: boolean;
  dateAdder?: {
    initDate: Date;
    dateAdders: DateAdderItem[];
  };
  datePickerProps?: Partial<DatePickerProps>;
  textFieldProps?: Partial<TextFieldProps>;
};

export default function DatePickerInput({
  label,
  dateAdder,
  value,
  onChange,
  onBlur,
  name,
  error,
  required,
  datePickerProps = {},
  textFieldProps = {},
}: TDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <>
        {label && (
          <FormLabel
            required={required}
            sx={{ fontWeight: 'bold', mb: 0.5 }}
            error={error}
          >
            {label}
          </FormLabel>
        )}
        <DatePicker
          format='dd/MM/yyyy'
          value={value ?? null}
          onChange={(v) => onChange(v)}
          {...datePickerProps}
          sx={{
            width: '100%',
            '& .MuiPickersSectionList-root': {
              paddingTop: '12px',
              paddingBottom: '12px',
            },
            ...datePickerProps?.sx,
          }}
          slotProps={{
            textField: {
              name,
              onBlur,
              error,
              fullWidth: true,
              value,
              helperText: textFieldProps?.helperText,
              ...textFieldProps,
            },
          }}
        />
        {!!dateAdder?.dateAdders?.length && (
          <HStack marginTop={0.5} gap={0.5} flexWrap='wrap'>
            {dateAdder.dateAdders.map(({ label: chipLabel, amount, unit }) => {
              const chipKey = `${chipLabel}-${amount}-${unit}`;
              return (
                <Chip
                  sx={{ cursor: 'pointer' }}
                  label={chipLabel}
                  key={chipKey}
                  onClick={() => {
                    if (dateAdder?.initDate) {
                      let newDate: Date;
                      if (unit === 'months') {
                        newDate = addMonths(dateAdder.initDate, amount);
                      } else {
                        newDate = addDays(dateAdder.initDate, amount);
                      }
                      onChange(newDate);
                    }
                  }}
                  size='small'
                />
              );
            })}
          </HStack>
        )}
      </>
    </LocalizationProvider>
  );
}
