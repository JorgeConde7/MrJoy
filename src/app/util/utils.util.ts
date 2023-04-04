import { FormGroup } from "@angular/forms";

/**
 * Algoritmo simple de luhn que permite validar los digitos  de tarjetas de credito
 */
const checkLuhn = (num: string) => {
  const isEmpty = !num.trim().length
  if (isEmpty) return false;

  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
  sum += lastDigit;
  return sum % 10 === 0;
};


const getCurrentDate = () => {
  const dateTime = new Date();
  const dateCurrent = String(dateTime.getDate()).padStart(2, "0")
  const monthCurrent = String(dateTime.getMonth() + 1).padStart(2, "0")
  const yearCurrent = String(dateTime.getFullYear())

  return [dateCurrent, monthCurrent, yearCurrent, dateTime]
}

const  markFormGroupTouched = (formGroup: FormGroup) => {
  (<any>Object).values(formGroup.controls).forEach((control:any) => {
    control.markAsTouched();

    if (control.controls) { markFormGroupTouched(control); }
  });
}
const  markFormGroupUnTouched = (formGroup: FormGroup) => {
  (<any>Object).values(formGroup.controls).forEach((control:any) => {
    control.markAsUntouched();

    if (control.controls) { markFormGroupTouched(control); }
  });
}

export {
  checkLuhn,
  getCurrentDate,
  markFormGroupTouched,
  markFormGroupUnTouched
}
