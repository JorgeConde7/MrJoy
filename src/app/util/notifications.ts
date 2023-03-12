import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2"

export const alertNotification = (title = "Completado!", text = '', icon: SweetAlertIcon = "success", cb: (result: SweetAlertResult) => void = () => { }) => {
  Swal.fire({
    position: 'center',
    icon,
    title,
    text,
    showConfirmButton: true,
    timer: 6000
  }).then(result => { cb(result) })
}

export const alertConfirmation = async () => {
  return await Swal.fire({
    title: 'Confirme reserva',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#28a745',
    cancelButtonColor: "#dc3545",
    reverseButtons: true
  })
}
