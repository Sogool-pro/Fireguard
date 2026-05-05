export function formatRecentAlertTime(timestamp) {
  if (!timestamp) return "-";

  const text = String(timestamp).trim();
  const candidates = [
    text,
    text.includes("T") ? text : text.replace(" ", "T"),
    text.replace(/-/g, "/"),
  ];
  const date = candidates
    .map((candidate) => new Date(candidate))
    .find((candidateDate) => !Number.isNaN(candidateDate.getTime()));

  if (!date) return text;

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  return `${datePart}  ${timePart}`;
}
