const DNI = /^[0-9]{8}$/;
const PHONE = /^[0-9]{9}$/;
const JUST_LETTERS_WITH_SPACES = /^[a-záéíóúñ\s]+$/i
const GENDERS = /^(masculino|femenino|no binario)$/i
const USERNAME = /^[a-z0-9_áéíóúñ]{5,10}$/i
const PASSWORD = /^[a-z0-9_\-$\.#]{8,12}$/i



export {
  DNI,
  PHONE,
  JUST_LETTERS_WITH_SPACES,
  GENDERS,
  USERNAME,
  PASSWORD,
}
