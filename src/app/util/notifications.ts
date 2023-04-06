import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export const alertNotification = (
  title = 'Completado!',
  text = '',
  icon: SweetAlertIcon = 'success',
  cb: (result: SweetAlertResult) => void = () => {}
) => {
  Swal.fire({
    position: 'center',
    icon,
    title,
    text,
    showConfirmButton: true,
    timer: 7000,
  }).then((result) => {
    cb(result);
  });
};

export const alertConfirmation = async (title: string = 'Confirme reserva') => {
  return await Swal.fire({
    title,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#dc3545',
    reverseButtons: true,
  });
};

export const alertPrompt = async (
  title = '',
  preConfirm: (value: string) => void = () => {},
  errorCallback: (error: unknown) => void = () => {}
) => {
  return await Swal.fire({
    title,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    showLoaderOnConfirm: true,
    preConfirm: async (value: string) => {
      try {
        preConfirm(value);
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error}`);
        errorCallback(error);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};
