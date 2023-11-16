import { ValidationErrors } from '@angular/forms';


export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};


export const inputFieldOnlyNumber = (event: any): boolean => {
  const pattern = /[0-9\+\-\ ]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    return true;
  }
  return false;
}
