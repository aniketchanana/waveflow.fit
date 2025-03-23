'use client';
import { Button, TextField } from '@mui/material';
import { useActionState } from 'react';

import AppContainer from '@/components/AppContainer/AppContainer';
const increment = async (prevState: any, formData: FormData) => {
  console.log(...formData.keys());
  console.log(formData.get('firstName'));
  console.log(Object.entries(formData));
  return { ...prevState, firstName: `${formData.get('firstName')} hello` };
};
const initialValues = {
  firstName: 'aniket',
};
const TestPage = () => {
  const [state, formAction, isPending] = useActionState(
    increment,
    initialValues
  );
  console.log(isPending);
  return (
    <AppContainer>
      <form action={formAction}>
        Hello {state.firstName}
        <TextField name='firstName' defaultValue={state.firstName} />
        <TextField name='lastName' defaultValue={state.lastName} />
        <Button type='submit' loading={isPending}>
          Click
        </Button>
      </form>
    </AppContainer>
  );
};

export default TestPage;
