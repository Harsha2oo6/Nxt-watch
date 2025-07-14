import { formatDistanceToNow } from "date-fns";
export function DurationFinder(prop) {
  const date = new Date(prop);
  console.log(date);
  return formatDistanceToNow(date);
}
