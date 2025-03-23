'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlatwareIcon from '@mui/icons-material/Flatware';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import {
  Box,
  CircularProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { ROUTE_URLS } from '@/common/appUrls';
import { EUserRole } from '@/common/constants';
import RoleFlag from '@/components/RoleFlag/RoleFlag';
import { handleLogout } from '@/components/SessionProvider/auth.utils';
import SectionContainer from '@/components/StyledComponents/SectionContainer';
import useToast, { EToastType } from '@/components/Toast/useToast';

const FloatingSidebar = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);
  const toggleFloatingBarMinimization = useCallback(
    () => setIsSidebarMinimized(!isSidebarMinimized),
    [isSidebarMinimized]
  );
  const theme = useTheme();
  const pathname = usePathname();
  const { showToast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const sidebarOptions = useMemo(
    () => [
      {
        text: 'Home',
        icon: <HomeIcon color='inherit' />,
        navigateTo: ROUTE_URLS.dashboard,
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
  return (
    <Box
      width={
        isSidebarMinimized
          ? theme.custom.leftPanelWidthMinimized
          : theme.custom.leftPanelWidthExpanded
      }
      padding='1rem'
      borderRadius='0.75rem'
    >
      <Box width='100%' height='100%' position='relative'>
        <SectionContainer sx={{ padding: 0 }}>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              borderRadius: '1.5rem',
            }}
            component='nav'
          >
            {sidebarOptions.map(
              ({ text, icon, handleClick, navigateTo, allowedFor }) => {
                const sidebarItem = (
                  <ListItemButton
                    key={text}
                    selected={navigateTo === pathname}
                    {...(handleClick ? { onClick: handleClick } : {})}
                    sx={
                      isSidebarMinimized
                        ? {
                            display: 'flex',
                            justifyContent: 'center',
                          }
                        : {}
                    }
                  >
                    <ListItemIcon
                      sx={{
                        color: theme.palette.text.secondary,
                        ...(isSidebarMinimized
                          ? { display: 'flex', justifyContent: 'center' }
                          : {}),
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    {!isSidebarMinimized && (
                      <ListItemText
                        sx={{ whiteSpace: 'nowrap' }}
                        primary={text}
                      />
                    )}
                  </ListItemButton>
                );
                return (
                  <RoleFlag key={text} allowedFor={allowedFor}>
                    {navigateTo ? (
                      <Link href={navigateTo}>{sidebarItem}</Link>
                    ) : (
                      sidebarItem
                    )}
                  </RoleFlag>
                );
              }
            )}
          </List>
        </SectionContainer>
        <Box
          onClick={toggleFloatingBarMinimization}
          color={theme.palette.text.secondary}
          position='absolute'
          left='100%'
          sx={{
            transform: 'translateX(-50%)',
            top: '10%',
            cursor: 'pointer',
          }}
        >
          {isSidebarMinimized ? (
            <AddCircleIcon color='inherit' />
          ) : (
            <RemoveCircleIcon color='inherit' />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FloatingSidebar;
