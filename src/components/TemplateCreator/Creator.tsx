'use client';
import Add from '@mui/icons-material/Add';
import { Button, Drawer, TextField } from '@mui/material';
import { isEmpty } from 'lodash';
import { JSX, useEffect, useState } from 'react';

import { api } from '@/common/api.utils';
import { TEMPLATE_CREATOR_ENDPOINTS } from '@/common/apiEndpoints';
import {
  createNestedObject,
  groupByPrefix,
  replaceKeyValue,
} from '@/common/app.utils';
import { ETemplateType } from '@/common/constants';
import DrawerActionButtons from '@/components/StyledComponents/Drawer/DrawerActionButtons';
import DrawerContent from '@/components/StyledComponents/Drawer/DrawerContent';
import DrawerHeader from '@/components/StyledComponents/Drawer/DrawerHeader';
import VStack from '@/components/StyledComponents/VStack';
import useToast, { EToastType } from '@/components/Toast/useToast';

type Props<T, K> = {
  initState: T;
  groupPrefix: 'dietFoodItems' | 'workoutExercises';
  createNewBtnText: string;
  drawerHeader: string;
  planNameKey: string;
  list: ({ defaultItems }: { defaultItems: K[] }) => JSX.Element;
  templateType: ETemplateType;
  appendNewTemplate: (newTemplate: ITemplate) => void;
  viewTemplate: Record<string, any> | null;
};
const Creator = <T, K>({
  initState,
  createNewBtnText,
  groupPrefix,
  drawerHeader,
  list: List,
  planNameKey,
  templateType,
  appendNewTemplate,
  viewTemplate = null,
}: Props<T, K>) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { showToast } = useToast();
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [isViewOnlyMode, setIsViewOnlyMode] = useState(false);
  const handleClose = () => {
    setIsDrawerOpen(false);
    setPlan(initState);
  };
  const handleOpen = () => {
    setIsViewOnlyMode(false);
    setIsDrawerOpen(true);
    setPlan(initState);
  };
  const handleViewModeOpen = () => {
    setIsDrawerOpen(true);
    setIsViewOnlyMode(true);
  };
  const [plan, setPlan] = useState<T>(initState);

  const handleSavePlan = async (plan: T) => {
    setIsCreatingTemplate(true);

    try {
      const response = await api.post<unknown, ITemplate>(
        TEMPLATE_CREATOR_ENDPOINTS.CREATE_TEMPLATE,
        {
          template: {
            [String(groupPrefix)]: plan[groupPrefix],
          },
          templateType,
          templateName: plan[planNameKey],
        }
      );
      appendNewTemplate(response);
      showToast({
        message: 'Template created',
        severity: EToastType.SUCCESS,
      });
      handleClose();
    } catch (e: any) {
      showToast({
        severity: EToastType.ERROR,
        message: e?.message as string,
      });
    } finally {
      setIsCreatingTemplate(false);
    }
  };

  useEffect(() => {
    if (!isEmpty(viewTemplate)) {
      setPlan({
        ...viewTemplate.template,
        [planNameKey]: viewTemplate.template_name,
      });
      handleViewModeOpen();
    }
  }, [planNameKey, viewTemplate]);

  return (
    <>
      <Button startIcon={<Add />} onClick={handleOpen}>
        {createNewBtnText}
      </Button>

      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={handleClose}
        component='form'
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = event.currentTarget as HTMLFormElement;

          const formData = new FormData(form);
          console.log(Object.fromEntries(formData.entries()));
          const values = createNestedObject(
            Object.fromEntries(formData.entries())
          );
          const plan = replaceKeyValue(
            groupByPrefix(values, groupPrefix),
            'isOptional',
            'on',
            true
          ) as T;
          setPlan(plan);
          handleSavePlan(plan);
        }}
      >
        <DrawerHeader handleClose={handleClose} isViewOnlyMode={isViewOnlyMode}>
          {drawerHeader}
        </DrawerHeader>
        <DrawerContent
          containerProps={{
            sx: { width: '36rem', overflowY: 'auto', m: '-1rem', p: '1rem' },
          }}
        >
          <VStack
            height='100%'
            gap={1}
            sx={{
              ...(isViewOnlyMode
                ? { pointerEvents: 'none', opacity: 0.7 }
                : {}),
            }}
          >
            <TextField
              name={planNameKey}
              placeholder='Plan name'
              sx={{ maxWidth: '16.5rem' }}
              required
              defaultValue={plan[planNameKey]}
            />
            <List defaultItems={plan[groupPrefix]} />
          </VStack>
        </DrawerContent>
        <DrawerActionButtons>
          <Button
            variant='outlined'
            onClick={handleClose}
            disabled={isCreatingTemplate}
          >
            Close
          </Button>
          {!isViewOnlyMode && (
            <Button type='submit' loading={isCreatingTemplate}>
              Save
            </Button>
          )}
        </DrawerActionButtons>
      </Drawer>
    </>
  );
};

export default Creator;
