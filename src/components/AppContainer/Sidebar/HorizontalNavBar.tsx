import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useNavBarOpts from '@/components/AppContainer/Sidebar/useNavBarOpts';
import RoleFlag from '@/components/RoleFlag/RoleFlag';
import SectionContainer from '@/components/StyledComponents/SectionContainer';

const HorizontalNavBar = () => {
  const pathname = usePathname();
  const { navBarOptions } = useNavBarOpts();
  const theme = useTheme();

  return (
    <SectionContainer sx={{ padding: 0 }}>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: '1.5rem',
          display: 'flex',
          justifyContent: 'space-around',
          height: '100%',
          flex: 1,
          alignItems: 'center',
        }}
        component='nav'
      >
        {navBarOptions.map(
          ({ text, icon, handleClick, navigateTo, allowedFor }) => {
            const sidebarItem = (
              <ListItemButton
                key={text}
                selected={navigateTo === pathname}
                {...(handleClick ? { onClick: handleClick } : {})}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
              </ListItemButton>
            );
            return (
              <RoleFlag key={text} allowedFor={allowedFor}>
                <Tooltip title={text} placement='top'>
                  <ListItem disablePadding sx={{ height: '100%' }}>
                    {navigateTo ? (
                      <Box
                        width='100%'
                        height='100%'
                        component={Link}
                        href={navigateTo}
                      >
                        {sidebarItem}
                      </Box>
                    ) : (
                      <Box width='100%'>{sidebarItem}</Box>
                    )}
                  </ListItem>
                </Tooltip>
              </RoleFlag>
            );
          }
        )}
      </List>
    </SectionContainer>
  );
};

export default HorizontalNavBar;
