'use client';

import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Button, IconButton, Popover, TextField } from '@mui/material';
import { get } from 'lodash';
import { useState } from 'react';

import CenterAlign from '@/components/StyledComponents/CenterAlign';

enum EMessagingPopover {
  WHATS_APP = 'WHATS_APP',
  EMAIL = 'EMAIL',
}
const PopOverNames = {
  [EMessagingPopover.WHATS_APP]: 'WhatsApp',
  [EMessagingPopover.EMAIL]: 'Email',
};
const MessagingActionRenderer = ({ colDef, row }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [popOverType, setPopOverType] = useState<EMessagingPopover | null>(
    null
  );
  const whatsapp = get(row, colDef?.cellRenderParams?.whatsAppField, '');
  const email = get(row, colDef?.cellRenderParams?.emailField, '');
  const [textMessage, setTextMessage] = useState('');
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: EMessagingPopover
  ) => {
    setAnchorEl(event.currentTarget);
    setPopOverType(type);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSendMessage = () => {
    const anchor = document.createElement('a');
    if (popOverType === EMessagingPopover.EMAIL) {
      if (email) {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Message from your trainer')}&body=${encodeURIComponent(textMessage)}`;
        anchor.href = gmailLink;
      }
    }
    anchor.target = '_blank';
    if (popOverType === EMessagingPopover.WHATS_APP) {
      if (whatsapp) {
        anchor.href = `https://web.whatsapp.com/send?phone=${whatsapp}&text=${textMessage}`;
      }
    }
    anchor.click();
  };
  return (
    <>
      <CenterAlign gap={0.25} justifyContent='flex-start'>
        {whatsapp && (
          <IconButton
            onClick={(e) => handleClick(e, EMessagingPopover.WHATS_APP)}
          >
            <WhatsAppIcon />
          </IconButton>
        )}
        {email && (
          <IconButton onClick={(e) => handleClick(e, EMessagingPopover.EMAIL)}>
            <EmailIcon />
          </IconButton>
        )}
      </CenterAlign>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Box p={1} minWidth='24.5rem'>
          <CenterAlign flexDirection='column' alignItems='flex-start' gap={0.5}>
            <TextField
              placeholder='Type your message...'
              multiline
              rows={2}
              fullWidth
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              label={PopOverNames[popOverType as EMessagingPopover]}
            />
            <Button onClick={handleSendMessage} disabled={!textMessage}>
              Send
            </Button>
          </CenterAlign>
        </Box>
      </Popover>
    </>
  );
};

export default MessagingActionRenderer;
