'use client';

import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlatwareIcon from '@mui/icons-material/Flatware';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Box,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { api } from '@/common/api.utils';
import { USER_ENDPOINTS } from '@/common/apiEndpoints';
import { ROUTE_URLS } from '@/common/appUrls';
import useToast, { EToastType } from '@/components/Toast/useToast';
const whatYouCanDoText = [
  {
    icon: <FitnessCenterIcon color='inherit' />,
    text: 'Design tailored fitness plans and assign them to trainees effortlessly',
  },
  {
    icon: <FlatwareIcon color='inherit' />,
    text: 'Customize nutrition plans to complement workout regimens',
  },
  {
    icon: <ManageAccountsIcon color='inherit' />,
    text: 'Stay organized with tools designed to simplify daily tasks',
  },
  {
    icon: <AutoGraphIcon color='inherit' />,
    text: 'Monitor performance and analytics to keep goals on track',
  },
];
export const LoginForm = () => {
  const theme = useTheme();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error(
          'Unable to authenticate via google, Please try again later.'
        );
      }
      await api.post(USER_ENDPOINTS.GOOGLE_SIGN_IN, {
        id_token: credentialResponse.credential,
      });
      showToast({
        severity: EToastType.SUCCESS,
        message: 'Successfully signed in',
      });
      router.push(ROUTE_URLS.dashboard);
    } catch (e: any) {
      showToast({
        severity: EToastType.ERROR,
        message: e?.message as string,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container height='100%'>
      <Grid
        size={{ xs: 0, sm: 8 }}
        display={{ xs: 'none', sm: 'flex' }}
        justifyContent='center'
        height='100%'
        sx={{ bgcolor: theme.palette.background.default }}
        flexDirection='column'
        gap='3.75rem'
        padding={{ sm: '2.5rem', md: '3.75rem', lg: '5rem', xl: '7.5rem' }}
      >
        <Typography variant='h1'>Your Personal Gym Manager</Typography>
        <Box display='flex' flexDirection='column' gap='2rem'>
          {whatYouCanDoText.map(({ text, icon }) => {
            return (
              <Box display='flex' key={text} gap='0.5rem'>
                {icon}
                <Typography variant='body1'>{text}</Typography>
              </Box>
            );
          })}
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }} height='100%'>
        <Box padding={{ xs: '2.5rem', sm: '2rem', md: '2.5rem' }} height='100%'>
          <Box position='relative' height='100%'>
            <Box
              display='flex'
              alignItems='center'
              flexDirection='column'
              gap='3rem'
              mb='3rem'
            >
              <Image src='/logo.png' width={180} height={180} alt='login' />
              <Typography variant='h1' textAlign='center'>
                Welcome
              </Typography>
            </Box>

            <Divider>LogIn With Google</Divider>
            <Box display='flex' justifyContent='center' mt='3rem'>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <GoogleLogin
                  onSuccess={handleGoogleAuth}
                  click_listener={() => {
                    setIsLoading(true);
                  }}
                  onError={() => {
                    showToast({
                      severity: EToastType.ERROR,
                      message:
                        'Something went wrong unable to login with google',
                    });
                    setIsLoading(false);
                  }}
                  shape='circle'
                  size='large'
                  containerProps={{ style: { transform: 'scale(1.19)' } }}
                  useOneTap
                  cancel_on_tap_outside={false}
                />
              )}
            </Box>
            <Typography
              variant='body2'
              position='absolute'
              bottom={0}
              textAlign='center'
            >
              Having queries? Lets connect, you can reach us via{' '}
              <Typography
                component='a'
                variant='body2'
                href='mailto:aniket.chanana@gmail.com'
                sx={{
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  textAlign: 'center',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                    textDecoration: 'underline',
                  },
                }}
              >
                aniket.chanana@gmail.com
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
