import { ValidationError } from 'yup';
import lodash from 'lodash';

interface Errors {
  [key: string]: string;
}

export default function GetValidationErrors(yupError: ValidationError): Errors {
  let errors = {};

  if (yupError.inner) {
    if (yupError.inner.length === 0) {
      return lodash.set(errors, yupError.path, yupError.message);
    }

    yupError.inner.forEach(err => {
      if (!lodash.get(errors, err.path)) {
        errors = lodash.set(errors, err.path, err.message);
      }
    });
  }
  return errors;
}
