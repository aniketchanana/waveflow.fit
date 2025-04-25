'use client';

import { Button, Drawer, FormLabel, TextField } from '@mui/material';
import { isBefore } from 'date-fns';
import { useFormik } from 'formik';
import { useEffect, useMemo } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_MANAGER_ENDPOINTS } from '@/common/apiEndpoints';
import { isValidEmail, isValidIndianPhone } from '@/common/app.utils';
import DatePickerInput from '@/components/DatePickerInput/DatePickerInput';
import DynamicRenderer from '@/components/DynamicRenderer/DynamicRenderer';
import useGetGymCenterMember from '@/components/Members/useGetGymCenterMember';
import DrawerActionButtons from '@/components/StyledComponents/Drawer/DrawerActionButtons';
import DrawerContent from '@/components/StyledComponents/Drawer/DrawerContent';
import DrawerHeader from '@/components/StyledComponents/Drawer/DrawerHeader';
import VStack from '@/components/StyledComponents/VStack';
import useToast, { EToastType } from '@/components/Toast/useToast';

const fields = [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'ex: John doe',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'ex: john@gmail.com',
    type: 'email',
  },
  {
    label: 'Address',
    name: 'address',
    placeholder: 'ex: House number 420',
    type: 'text',
  },
  {
    label: 'Phone Number',
    name: 'phone_number',
    placeholder: 'ex: 9588195330',
    type: 'number',
  },
  {
    label: 'Start Date',
    name: 'start_date',
    type: 'date',
  },
  {
    label: 'End Date',
    name: 'end_date',
    type: 'date',
  },
];

type Props = {
  memberId?: string;
  isDrawerOpen: boolean;
  refetchData: () => void;
  handleClose: () => void;
};

const EditUpdateMemberDrawerForm = ({
  memberId,
  handleClose: _handleClose,
  refetchData,
  isDrawerOpen,
}: Props) => {
  const { showToast } = useToast();
  const {
    gymCenterMember,
    setGymCenterMember,
    fetchGymCenterMember,
    isGymCenterMemberLoading,
    isGymCenterMemberLoadingErr,
  } = useGetGymCenterMember();

  const initialValues = useMemo(
    () => ({
      name: gymCenterMember?.name || '',
      address: gymCenterMember?.address || '',
      phone_number: gymCenterMember?.phone_number || '',
      email: gymCenterMember?.email || '',
      start_date: gymCenterMember?.start_date
        ? new Date(gymCenterMember?.start_date)
        : new Date(),
      end_date: gymCenterMember?.end_date
        ? new Date(gymCenterMember?.end_date)
        : null,
    }),
    [gymCenterMember]
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validate: (values) => {
      const errors: any = {};
      if (!values.name) errors.name = 'Name is required field';
      if (!values.start_date)
        errors.start_date = 'Start date is required field';
      if (!values.end_date) errors.end_date = 'End date is required field';
      if (!values.address) errors.address = 'Address is required field';
      if (!values.phone_number) {
        errors.phone_number = 'Phone number is required field';
      } else if (!isValidIndianPhone(values.phone_number)) {
        errors.phone_number = 'Invalid phone number';
      }
      if (!values.email) {
        errors.email = 'Email is required field';
      } else if (!isValidEmail(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (
        values.start_date &&
        values.end_date &&
        isBefore(values.end_date, values.start_date)
      ) {
        errors.start_date =
          'Invalid date! End date cannot be less then end date';
        errors.end_date = 'Invalid date! End date cannot be less then end date';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const isUpdate = Boolean(gymCenterMember?.id);
        const response = await api[isUpdate ? 'patch' : 'post'](
          isUpdate
            ? MANAGEMENT_MANAGER_ENDPOINTS.GYM_CENTER_MEMBERS_GET_UPDATE_DELETE(
                memberId
              )
            : MANAGEMENT_MANAGER_ENDPOINTS.GYM_CENTER_MEMBER,
          { ...values }
        );

        if (!isUpdate) {
          setGymCenterMember(response);
        } else {
          setGymCenterMember(values as IGymCenterMember);
        }

        showToast({
          severity: EToastType.SUCCESS,
          message: 'Details saved successfully',
        });

        refetchData();
        handleDrawerClose();
      } catch (e: any) {
        showToast({ severity: EToastType.ERROR, message: e.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDrawerClose = () => {
    formik.resetForm();
    setGymCenterMember(null);
    _handleClose();
  };

  const renderField = ({ name, type, placeholder, label }) => {
    const hasError = formik.touched[name] && Boolean(formik.errors[name]);
    if (type === 'date') {
      const helperText = hasError ? formik.errors[name] : undefined;

      const dateAdderConfig =
        name === 'end_date' && formik.values.start_date
          ? {
              initDate: formik.values.end_date
                ? formik.values.end_date
                : formik.values.start_date instanceof Date
                  ? formik.values.start_date
                  : new Date(),
              dateAdders: [
                { label: '+15 days', amount: 15, unit: 'days' as const },
                { label: '+1 month', amount: 1, unit: 'months' as const },
                { label: '+3 months', amount: 3, unit: 'months' as const },
                { label: '+6 months', amount: 6, unit: 'months' as const },
              ],
            }
          : undefined;

      return (
        <DatePickerInput
          label={label}
          name={name}
          value={formik.values[name]}
          onChange={(value: Date | null) => {
            formik.setFieldValue(name, value);
          }}
          required
          onBlur={formik.handleBlur}
          error={hasError}
          textFieldProps={{
            helperText: helperText,
            error:
              Boolean(formik.errors[name]) && Boolean(formik.touched[name]),
          }}
          dateAdder={dateAdderConfig}
        />
      );
    }

    return (
      <>
        <FormLabel required sx={{ fontWeight: 'bold' }} error={hasError}>
          {label}
        </FormLabel>
        <TextField
          type={type}
          name={name}
          fullWidth
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors[name]) && Boolean(formik.touched[name])}
          helperText={
            formik.touched[name] && formik.errors[name]
              ? formik.errors[name]
              : ''
          }
        />
      </>
    );
  };

  useEffect(() => {
    if (isDrawerOpen && memberId) {
      fetchGymCenterMember(memberId);
    }
  }, [fetchGymCenterMember, isDrawerOpen, memberId]);

  return (
    <Drawer
      anchor='right'
      open={isDrawerOpen}
      onClose={handleDrawerClose}
      component='form'
      onSubmit={formik.handleSubmit as any}
    >
      <DrawerHeader handleClose={handleDrawerClose}>
        {`${memberId ? 'Update' : 'Add new'} gym member`}
      </DrawerHeader>
      <DrawerContent
        containerProps={{
          sx: {
            width: { xs: '27.5rem', md: '36rem' },
            overflowY: 'auto',
            m: '-1rem',
            p: '1rem',
            gap: 1,
          },
        }}
      >
        <DynamicRenderer
          isError={isGymCenterMemberLoadingErr}
          isLoading={isGymCenterMemberLoading}
        >
          <VStack gap={1}>
            {fields.map(({ label, name, type, placeholder }) => (
              <div key={name}>
                {renderField({ name, type, placeholder, label })}
              </div>
            ))}
          </VStack>
        </DynamicRenderer>
      </DrawerContent>
      <DrawerActionButtons>
        <Button
          variant='outlined'
          onClick={handleDrawerClose}
          disabled={
            formik.isSubmitting ||
            isGymCenterMemberLoading ||
            isGymCenterMemberLoadingErr
          }
        >
          Close
        </Button>
        <Button
          type='submit'
          disabled={
            formik.isSubmitting ||
            isGymCenterMemberLoading ||
            isGymCenterMemberLoadingErr
          }
        >
          {memberId ? 'Update' : 'Save'}
        </Button>
      </DrawerActionButtons>
    </Drawer>
  );
};

export default EditUpdateMemberDrawerForm;
