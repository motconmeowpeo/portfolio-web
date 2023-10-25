import { ValidationErrors } from '@angular/forms';
import { IErrorValidation, IWindowMetric } from '../models/base.model';
export const getWindowMetric = (): IWindowMetric => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  return { height, width };
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getError = (
  errors: ValidationErrors | null
): IErrorValidation | null => {
  if (errors?.['required']) {
    return {
      key: 'validation.required',
    };
  }

  if (errors?.['email'] || errors?.['pattern'] || errors?.['strongPassword']) {
    return {
      key: 'validation.invalid',
    };
  }

  if (errors?.['minlength']) {
    const error = errors?.['minlength'];
    return {
      key: 'validation.minLength',
      data: {
        minLength: error['requiredLength'],
      },
    };
  }

  //Min Number
  if (errors?.['min']) {
    const error = errors?.['min'];
    return {
      key: 'validation.min',
      data: {
        min: error['min'],
      },
    };
  }

  //Max Number
  if (errors?.['max']) {
    const error = errors?.['max'];
    return {
      key: 'validation.max',
      data: {
        max: error['max'],
      },
    };
  }

  return null;
};
