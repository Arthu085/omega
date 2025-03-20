export function formatPhone(phone: string): string {
  const regex = /^(\d{2})(\d{4,5})(\d{4})$/;
  return phone.replace(regex, '($1) $2-$3');
}

export function validatePhone(phone: string): boolean {
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return regex.test(phone);
}
