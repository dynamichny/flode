// Generate random ids.
export default function randomId(length = 10) {
  return Math.random().toString(36).substr(2, length);
}
