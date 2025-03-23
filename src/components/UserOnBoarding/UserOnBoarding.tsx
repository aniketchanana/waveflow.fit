'use client';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useActionState, useState } from 'react';

import { api } from '@/common/api.utils';
import { USER_ENDPOINTS } from '@/common/apiEndpoints';
import { convertFormDataToJson } from '@/common/app.utils';
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
  const [userRole, setUserRole] = useState<EUserRole>(EUserRole.TRAINER);
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

  if (Boolean(session?.role)) return children;

  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography variant='h1'>Welcome aboard 🎉</Typography>
      <Box
        width={{ xs: '100%', md: '60%' }}
        p={{ xs: 1, sm: 4, md: 6 }}
        display='flex'
        flexDirection='column'
        gap={1}
      >
        <FormControl>
          <FormLabel sx={{ fontWeight: 'bold' }}>
            How you want to use this platform?
          </FormLabel>
          <RadioGroup
            row
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as EUserRole)}
            sx={{ gap: 1 }}
          >
            <FormControlLabel
              value={EUserRole.TRAINER}
              control={<Radio />}
              label='As Trainer'
            />
            <FormControlLabel
              value={EUserRole.TRAINEE}
              control={<Radio />}
              label='As Trainee'
            />
          </RadioGroup>
        </FormControl>

        <form action={formAction} className='flex flex-col gap-4'>
          <FormLabel sx={{ fontWeight: 'bold' }}>
            Fill some basic information
          </FormLabel>
          <Box className='grid grid-cols-2 gap-4'>
            <TextField
              name='blood_pressure'
              label='Blood Pressure (mmHG)'
              fullWidth
              defaultValue={userHealthProfileInitialValues.blood_pressure}
            />
            <TextField
              name='allergies'
              label='Allergies'
              fullWidth
              defaultValue={userHealthProfileInitialValues.allergies}
            />
            <TextField
              name='weight'
              label='Weight (kg)'
              type='number'
              fullWidth
              defaultValue={userHealthProfileInitialValues.weight}
            />
            <TextField
              name='height'
              label='Height (cm)'
              type='number'
              fullWidth
              defaultValue={userHealthProfileInitialValues.height}
            />
            <TextField
              name='age'
              label='Age'
              type='number'
              fullWidth
              defaultValue={userHealthProfileInitialValues.age}
            />
            <TextField
              name='average_sleeping_time'
              label='Avg Sleeping Time (hrs)'
              type='number'
              fullWidth
              defaultValue={
                userHealthProfileInitialValues.average_sleeping_time
              }
            />
            <FormControl fullWidth>
              <InputLabel id='meal-selector-label'>
                Eating Preference
              </InputLabel>
              <Select
                labelId='meal-selector-label'
                id='meal-selector'
                name='eating_preference'
                defaultValue={userHealthProfileInitialValues.eating_preference}
                input={<OutlinedInput label='Eating Preference' />}
              >
                <MenuItem value='none'>None</MenuItem>
                <MenuItem value='veg'>Veg</MenuItem>
                <MenuItem value='non-veg'>Non-Veg</MenuItem>
                <MenuItem value='vegan'>Vegan</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox name='diabetes' defaultChecked={formState.diabetes} />
              }
              label='Diabetic'
            />
          </Box>
          <TextField
            name='additional_notes'
            label='Additional Info'
            fullWidth
            defaultValue={userHealthProfileInitialValues.additional_notes}
            multiline
          />

          <Button type='submit' color='primary' loading={isPending}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UserOnBoarding;
