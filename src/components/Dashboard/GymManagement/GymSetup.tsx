'use client';

import { Button, FormLabel, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Formik } from 'formik';
import { useMemo } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_MANAGER_ENDPOINTS } from '@/common/apiEndpoints';
import { isValidEmail, isValidIndianPhone } from '@/common/app.utils';
import SectionContainer from '@/components/StyledComponents/SectionContainer';
import useToast, { EToastType } from '@/components/Toast/useToast';

const GymSetup = ({
  gymCenterDetails,
  setGymCenterDetails,
}: {
  gymCenterDetails: IGymCenter | null;
  setGymCenterDetails: (value: IGymCenter) => void;
}) => {
  const { showToast } = useToast();
  const isUpdate = gymCenterDetails && gymCenterDetails.id;
  const gymDetailsInitValues = useMemo(
    () => ({
      name: gymCenterDetails?.name || '',
      address: gymCenterDetails?.address || '',
      phone_number: gymCenterDetails?.phone_number || '',
      email: gymCenterDetails?.email || '',
    }),
    [
      gymCenterDetails?.address,
      gymCenterDetails?.email,
      gymCenterDetails?.name,
      gymCenterDetails?.phone_number,
    ]
  );
  const saveUpdateGymDetails = async (values) => {
    try {
      const response = await api[isUpdate ? 'patch' : 'post'](
        isUpdate
          ? MANAGEMENT_MANAGER_ENDPOINTS.UPDATE_GYM_CENTER(gymCenterDetails.id)
          : MANAGEMENT_MANAGER_ENDPOINTS.CREATE_GYM_CENTER,
        {
          ...values,
        }
      );
      if (!isUpdate) {
        setGymCenterDetails(response);
      } else {
        setGymCenterDetails({ ...gymCenterDetails, ...values });
      }
      showToast({
        severity: EToastType.SUCCESS,
        message: 'Details saved successfully',
      });
    } catch (e: any) {
      showToast({ severity: EToastType.ERROR, message: e.message });
    }
  };
  return (
    <SectionContainer>
      <Formik
        initialValues={gymDetailsInitValues}
        validate={(values: TGymCenterUpdateAbleValues) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = 'Name is required field';
          }
          if (!values.address) {
            errors.address = 'Address is required field';
          }
          if (!values.phone_number) {
            errors.phone_number = 'Phone number is required field';
          } else if (
            values.phone_number &&
            !isValidIndianPhone(values.phone_number)
          ) {
            errors.phone_number = 'Invalid phone number';
          }
          if (!values.email) {
            errors.email = 'Email is required field';
          }
          if (!isValidEmail(values.email)) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await saveUpdateGymDetails(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Typography variant='h5' marginBottom={1}>
              Gym center setup
            </Typography>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormLabel required sx={{ fontWeight: 'bold' }}>
                  Name
                </FormLabel>
                <TextField
                  required
                  name='name'
                  fullWidth
                  placeholder='ex: waveflow fitness'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={Boolean(errors.name && touched.name && errors.name)}
                  helperText={errors.name && touched.name && errors.name}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormLabel required sx={{ fontWeight: 'bold' }}>
                  Address
                </FormLabel>
                <TextField
                  required
                  name='address'
                  fullWidth
                  placeholder='ex: Sector 6, karnal'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  error={Boolean(
                    errors.address && touched.address && errors.address
                  )}
                  helperText={
                    errors.address && touched.address && errors.address
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormLabel required sx={{ fontWeight: 'bold' }}>
                  Email
                </FormLabel>
                <TextField
                  required
                  type='email'
                  name='email'
                  fullWidth
                  placeholder='ex: manager@waveflow.fit'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={Boolean(errors.email && touched.email && errors.email)}
                  helperText={errors.email && touched.email && errors.email}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormLabel required sx={{ fontWeight: 'bold' }}>
                  Phone number
                </FormLabel>
                <TextField
                  required
                  type='number'
                  name='phone_number'
                  fullWidth
                  placeholder='ex: 9588195330'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  error={Boolean(
                    errors.phone_number &&
                      touched.phone_number &&
                      errors.phone_number
                  )}
                  helperText={
                    errors.phone_number &&
                    touched.phone_number &&
                    errors.phone_number
                  }
                />
              </Grid>
              <Grid size={12}>
                <Button type='submit' disabled={isSubmitting}>
                  {isUpdate ? 'Update' : 'Save'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </SectionContainer>
  );
};

export default GymSetup;
