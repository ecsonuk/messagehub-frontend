export function formatDateTime(
  value?: string | Date | null,
) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    },
  ).format(new Date(value));
}
