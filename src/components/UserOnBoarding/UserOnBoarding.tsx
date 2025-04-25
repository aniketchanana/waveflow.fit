'use client';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useActionState, useState } from 'react';

import { api } from '@/common/api.utils';
import { USER_ENDPOINTS } from '@/common/apiEndpoints';
import { convertFormDataToJson, isValidIndianPhone } from '@/common/app.utils';
import { EUserRole } from '@/common/constants';
import useSession from '@/components/SessionProvider/useSession';
import useToast, { EToastType } from '@/components/Toast/useToast';

const userHealthProfileInitialValues = {
  blood_pressure: '',
  allergies: '',
  weight: '',
  height: '',
  age: '',
  average_sleeping_time: '',
  eating_preference: 'none',
  diabetes: false,
  additional_notes: '',
};

type TUserHealthProfile = typeof userHealthProfileInitialValues;

const UserOnBoarding = ({ children }) => {
  const { fetchSession: refetchSession, session } = useSession();
  const [userRole, setUserRole] = useState<null | EUserRole>(EUserRole.MANAGER);
  const [whatsAppPhoneNumber, setWhatsAppPhoneNumber] = useState<string>('');
  const [isPhoneNumberErrored, setIsPhoneNumberErrored] = useState(false);
  const { showToast } = useToast();
  const [formState, formAction, isPending] = useActionState(
    async (prevState: TUserHealthProfile, formData: FormData) => {
      const userHealthProfileValues = {
        ...prevState,
        ...convertFormDataToJson(formData),
        diabetes: formData.get('diabetes') ? true : false,
      };
      try {
        await api.post(USER_ENDPOINTS.USER_SAVE_ONBOARDING_DETAILS, {
          healthInfo: {
            ...userHealthProfileValues,
            weight: Number(userHealthProfileValues.weight),
            height: Number(userHealthProfileValues.height),
            age: Number(userHealthProfileValues.age),
            average_sleeping_time: Number(
              userHealthProfileValues.average_sleeping_time
            ),
          },
          userRole,
          whatsAppPhoneNumber: whatsAppPhoneNumber,
        });
        await refetchSession();
        showToast({
          severity: EToastType.SUCCESS,
          message: 'Details saved successfully',
        });
      } catch (e: any) {
        showToast({ severity: EToastType.ERROR, message: e.message });
      }
      return userHealthProfileValues;
    },
    userHealthProfileInitialValues
  );

  const handleRoleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newRole: EUserRole
  ) => {
    if (newRole) {
      setUserRole(newRole);
    }
  };

  if (Boolean(session?.role)) return children;

  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      alignItems='center'
      flexDirection='column'
    >
      <Typography variant='h1' p={3}>
        Welcome aboard 🎉
      </Typography>
      <Box
        width={{ xs: '100%', md: '60%' }}
        display='flex'
        flexDirection='column'
        gap={1}
      >
        <FormControl>
          <FormLabel sx={{ fontWeight: 'bold' }}>
            How you want to use this platform?
          </FormLabel>
          <ToggleButtonGroup
            value={userRole}
            exclusive
            onChange={handleRoleChange}
          >
            <Badge
              color='secondary'
              badgeContent={userRole === EUserRole.MANAGER ? '' : null}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <ToggleButton value={EUserRole.MANAGER}>Gym manager</ToggleButton>
            </Badge>
            <Badge
              badgeContent={userRole === EUserRole.TRAINEE ? '' : null}
              color='secondary'
            >
              <ToggleButton value={EUserRole.TRAINEE}>Trainee</ToggleButton>
            </Badge>
          </ToggleButtonGroup>
        </FormControl>

        <FormControl>
          <FormLabel sx={{ fontWeight: 'bold' }} required>
            Whats app phone number
          </FormLabel>
          <TextField
            required
            name='whatsAppPhoneNumber'
            type='number'
            placeholder='ex: 9588195330'
            onChange={(e) => {
              const phone = e.target.value;
              setWhatsAppPhoneNumber(phone);
              setIsPhoneNumberErrored(!isValidIndianPhone(phone));
            }}
            error={isPhoneNumberErrored}
            helperText={
              isPhoneNumberErrored && 'Please enter valid phone number'
            }
          />
        </FormControl>

        <form action={formAction}>
          <FormLabel sx={{ fontWeight: 'bold' }}>
            Fill some basic information
          </FormLabel>

          <Grid container spacing={1}>
            <Grid size={6}>
              <TextField
                name='blood_pressure'
                label='Blood Pressure (mmHG)'
                fullWidth
                defaultValue={userHealthProfileInitialValues.blood_pressure}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                name='allergies'
                label='Allergies'
                fullWidth
                defaultValue={userHealthProfileInitialValues.allergies}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                name='weight'
                label='Weight (kg)'
                type='number'
                fullWidth
                defaultValue={userHealthProfileInitialValues.weight}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                name='height'
                label='Height (cm)'
                type='number'
                fullWidth
                defaultValue={userHealthProfileInitialValues.height}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                name='age'
                label='Age'
                type='number'
                fullWidth
                defaultValue={userHealthProfileInitialValues.age}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                name='average_sleeping_time'
                label='Avg Sleeping Time (hrs)'
                type='number'
                fullWidth
                defaultValue={
                  userHealthProfileInitialValues.average_sleeping_time
                }
              />
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel id='meal-selector-label'>
                  Eating Preference
                </InputLabel>
                <Select
                  labelId='meal-selector-label'
                  id='meal-selector'
                  name='eating_preference'
                  defaultValue={
                    userHealthProfileInitialValues.eating_preference
                  }
                  input={<OutlinedInput label='Eating Preference' />}
                >
                  <MenuItem value='none'>None</MenuItem>
                  <MenuItem value='veg'>Veg</MenuItem>
                  <MenuItem value='non-veg'>Non-Veg</MenuItem>
                  <MenuItem value='vegan'>Vegan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='diabetes'
                    defaultChecked={formState.diabetes}
                  />
                }
                label='Diabetic'
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name='additional_notes'
                label='Additional Info'
                fullWidth
                defaultValue={userHealthProfileInitialValues.additional_notes}
                multiline
              />
            </Grid>
          </Grid>

          <Button
            type='submit'
            color='primary'
            loading={isPending}
            sx={{ mt: 0.75 }}
            disabled={!userRole || isPhoneNumberErrored || !whatsAppPhoneNumber}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UserOnBoarding;
