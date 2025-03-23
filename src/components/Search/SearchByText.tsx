import { Clear, SearchOutlined } from '@mui/icons-material';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';

const SearchByText = ({
  placeholder = 'Search',
  sx,
  value,
  onClearIconClick,
  ...rest
}: TextFieldProps & { onClearIconClick?: () => void }) => {
  return (
    <TextField
      value={value}
      placeholder={placeholder}
      sx={{
        width: '16.5rem',
        '& .MuiInputBase-input': {
          py: 0.5,
        },
        ...sx,
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <SearchOutlined sx={{ fontSize: '1.3rem' }} />
            </InputAdornment>
          ),
          endAdornment:
            onClearIconClick && value ? (
              <InputAdornment position='start'>
                <Clear
                  sx={{ fontSize: '1.3rem', cursor: 'pointer' }}
                  onClick={onClearIconClick}
                />
              </InputAdornment>
            ) : null,
        },
      }}
      {...rest}
    />
  );
};

export default SearchByText;
