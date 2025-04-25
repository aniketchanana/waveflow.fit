import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlatwareIcon from '@mui/icons-material/Flatware';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { ROUTE_URLS } from '@/common/appUrls';
import { EUserRole } from '@/common/constants';
import { handleLogout } from '@/components/SessionProvider/auth.utils';
import useToast, { EToastType } from '@/components/Toast/useToast';

const useNavBarOpts = () => {
  const { showToast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const navBarOptions = useMemo(
    () => [
      {
        text: 'Home',
        icon: <HomeIcon color='inherit' />,
        navigateTo: ROUTE_URLS.dashboard,
      },
      {
        text: 'Members',
        icon: <PeopleAlt />,
        navigateTo: ROUTE_URLS.members,
      },
      {
        text: 'Trainees',
        icon: <SportsGymnasticsIcon color='inherit' />,
        navigateTo: ROUTE_URLS.trainees,
        allowedFor: EUserRole.TRAINER,
      },
      {
        text: 'Workout plans',
        icon: <FitnessCenterIcon color='inherit' />,
        navigateTo: ROUTE_URLS.workout,
        allowedFor: EUserRole.TRAINER,
      },
      {
        text: 'Diet plans',
        icon: <FlatwareIcon color='inherit' />,
        navigateTo: ROUTE_URLS.diet,
        allowedFor: EUserRole.TRAINER,
      },
      {
        text: 'Todo List',
        icon: <FormatListBulletedIcon color='inherit' />,
        navigateTo: ROUTE_URLS.todo,
      },
      {
        text: 'Sign out',
        icon: isLoggingOut ? (
          <CircularProgress size='24px' />
        ) : (
          <LogoutIcon color='inherit' />
        ),
        handleClick: async () => {
          try {
            setIsLoggingOut(true);
            await handleLogout();
            router.push(ROUTE_URLS.root);
          } catch (e: any) {
            showToast({
              severity: EToastType.ERROR,
              message: e.message,
            });
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ],
    [isLoggingOut, router, showToast]
  );

  return { navBarOptions };
};

export default useNavBarOpts;
