const DNI = /^[0-9]{8}$/;
const PHONE = /^[0-9]{9}$/;
const JUST_LETTERS_WITH_SPACES = /^[a-záéíóúñ][a-záéíóúñ\s]+$/i
const GENDERS = /^(masculino|femenino|no binario)$/i
const USERNAME = /^[a-z0-9_áéíóúñ]{5,10}$/i
const PASSWORD = /^[a-z0-9_\-$\.#]{8,12}$/i
const INTEGER = /^[0-9]+$/
const DOUBLE = /^[0-9]+(\.)?[0-9]*$/
const PAQUETE = /^[1-9\s\.]+$/
const NOT_INICIO = /^((?!inicio).)*$/
const CVV=/^[0-9]{2}\-[0-9]{2}$/

export {
  DNI,
  PHONE,
  JUST_LETTERS_WITH_SPACES,
  GENDERS,
  USERNAME,
  PASSWORD,
  INTEGER,
  DOUBLE,
  PAQUETE,
  NOT_INICIO,
  CVV
}
