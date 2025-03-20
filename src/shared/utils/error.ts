import axios from 'axios';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';

export function formatErrorForNotification(unhandledError: any): string {
  let returnMessage = '';

  const errorMessageOrName = unhandledError.message ? unhandledError.message : unhandledError.name;

  if (axios.isAxiosError(unhandledError)) {
    const { message } = unhandledError.response?.data || {
      message: errorMessageOrName,
    };

    if (typeof message === 'object' && message !== null) {
      let errorsStringify = '';

      if (Array.isArray(message)) {
        errorsStringify = message.reduce((prev, error) => {
          return (prev += `${error} \n`);
        }, '');
      } else {
        errorsStringify = Object.entries(message)
          .map(([_key, value]) => (value == message ? '' : value))
          .join('\n');
      }

      returnMessage = errorsStringify;
    } else {
      returnMessage = message;
    }
  }

  return returnMessage?.length ? returnMessage : errorMessageOrName;
}

export function callbackOnInvalidZod(error: unknown) {
  if (import.meta.env.DEV) console.warn('ZOD Error: ', error);
}

export function handleZodInvalidSchema<T extends FieldValues>(errors: FieldErrors<T>) {
  callbackOnInvalidZod(errors);
  Object.values(errors).map((prop) => {
    if (prop) {
      if (prop.message && !prop.ref) toast.error(prop.message.toString());
      if (Array.isArray(prop)) prop.map(handleZodInvalidSchema);
    }
  });
}
