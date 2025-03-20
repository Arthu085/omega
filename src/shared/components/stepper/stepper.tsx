import { Fragment } from 'react';
import {
  Badge,
  Box,
  Step,
  StepLabel,
  Stepper as MuiStepper,
  SxProps,
  Typography,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { IStepperStep } from '../../domain/interfaces';

interface Props {
  active: number;
  steps: Array<IStepperStep>;
  stepperSx?: SxProps;
  stepSx?: SxProps;
}

function OptionalLabel() {
  return <Typography variant='caption'>Opcional</Typography>;
}

export function Stepper({ active, steps, stepperSx, stepSx }: Props) {
  const isMobile: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const activeStep = steps.length > 0 && steps[active].step;

  return (
    <Fragment>
      <MuiStepper
        variant='outlined'
        activeStep={active}
        className={isMobile ? 'stepper-mobile' : undefined}
        sx={{
          '&.stepper-mobile div.MuiStepConnector-horizontal.Mui-completed': {
            display: 'none',
          },
          '& .MuiStepLabel-labelContainer': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
          },
          width: '100%',
          ...stepperSx,
        }}
      >
        {isMobile
          ? steps.map(({ label, optional, badge }, index) => {
              const show = active === 0 ? index <= 1 : index >= active - 1 && index <= active + 1;

              if (!show) return <Fragment key={label} />;

              const showLabel = index === active;

              return (
                <Step key={label}>
                  <StepLabel optional={optional && showLabel ? <OptionalLabel /> : undefined}>
                    {showLabel ? label : '...'}

                    {showLabel && !!badge && (
                      <Badge
                        color='secondary'
                        badgeContent={badge}
                        sx={{ transform: 'scale(80%)' }}
                      >
                        <Box sx={{ width: '10px', height: '24px' }} />
                      </Badge>
                    )}
                  </StepLabel>
                </Step>
              );
            })
          : steps.map(({ label, optional, badge }) => {
              return (
                <Step key={label}>
                  <StepLabel optional={optional ? <OptionalLabel /> : undefined}>
                    {label}

                    {!!badge && (
                      <Badge
                        color='secondary'
                        badgeContent={badge}
                        sx={{ transform: 'scale(80%)' }}
                      >
                        <Box sx={{ width: '10px', height: '24px' }} />
                      </Badge>
                    )}
                  </StepLabel>
                </Step>
              );
            })}
      </MuiStepper>

      <Box sx={{ width: '100%', ...stepSx }}>{activeStep}</Box>
    </Fragment>
  );
}
