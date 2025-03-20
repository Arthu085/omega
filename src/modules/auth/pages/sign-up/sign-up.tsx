import { useState } from 'react';
import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@mui/material';

import { EUnauthenticatedPath } from '@/core/router';

import { IStepperStep } from '@/shared/domain';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { Stepper, AddressForm, StepperButtons } from '@/shared/components';
import {
  UnauthenticatedContentAlert,
  IUnauthenticatedContentAlert,
  UnauthenticatedContentHeader,
} from '@/shared/layout';

import { SignUpData, signUpSchema } from '../../domain';
import { AuthRepository } from '../../repositories';

import { SignUpForm } from './components/sign-up-form';

const STEPS: Array<IStepperStep> = [
  {
    label: 'Dados Pessoais',
    step: <SignUpForm />,
  },
  {
    label: 'Endereço',
    step: <AddressForm />,
  },
];

export function SignUp() {
  const navigate = useNavigate();

  const repository = new AuthRepository();

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({
    message: '',
    type: 'warning',
  });

  const [activeStep, setActiveStep] = useState<number>(0);

  const isLastStep: boolean = activeStep === STEPS.length - 1;
  const isFirstStep: boolean = activeStep === 0;
  const success = alert.type === 'success';

  const methods = useForm<SignUpData>({
    defaultValues: {
      companyName: '',
      tradeName: '',
      cnpj: '',
      phone: '',
      email: '',
      password: '',
      confirm: '',
      address: {
        postcode: '',
        country: 'Brasil',
        state: '',
        city: '',
        street: '',
        neighborhood: '',
        number: '',
        complement: '',
      },
    },
    resolver: zodResolver(signUpSchema),
  });

  function handleBack(): void {
    if (isFirstStep) {
      navigate(EUnauthenticatedPath.LOGIN);
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  async function handleNext(): Promise<void> {
    if (isLastStep) {
      methods.handleSubmit(handleSignUp, callbackOnInvalidZod)();
      return;
    }

    if (activeStep === 0) {
      const isValid = await methods.trigger([
        'companyName',
        'tradeName',
        'cnpj',
        'phone',
        'email',
        'password',
        'confirm',
      ]);

      if (!isValid) return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  async function handleSignUp(data: SignUpData) {
    if (loading) return;

    try {
      setLoading(true);

      await repository.signUp(data);

      setAlert({ type: 'success', message: `Foi enviado um e-mail de confirmacao para: ${data.email} !` });
    } catch (error) {
      const message = formatErrorForNotification(error);

      setAlert({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  }

  function handleClearAlert(): void {
    setAlert({ message: '', type: 'warning' });
  }

  return (
    <>
      <UnauthenticatedContentHeader
        title='Cadastre-se'
        description='Utilize o formulário a seguir para criar uma nova conta.'
      />

      <UnauthenticatedContentAlert alert={alert} clear={handleClearAlert} />

      <FormProvider {...methods}>
        <Stepper
          steps={STEPS}
          active={activeStep}
          stepSx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        />
      </FormProvider>

      <StepperButtons
        onBack={handleBack}
        onNext={handleNext}
        disabled={success}
        loading={loading}
        first={isFirstStep}
        last={isLastStep}
      />

      <Link
        marginTop={1}
        color='text.secondary'
        component={LinkRouter}
        to={EUnauthenticatedPath.LOGIN}
      >
        Já possui uma conta? Acesse
      </Link>
    </>
  );
}
