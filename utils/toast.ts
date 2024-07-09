import { useToast } from 'primevue/usetoast';

export function toastOk(detail: string) {
  const toast = useToast();
  toast.add({
    severity: 'success',
    summary: 'Info',
    detail,
    life: 3000,
  });
}
