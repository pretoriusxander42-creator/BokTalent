export function niceAge(birthYear: number, now = new Date()){
  return now.getFullYear() - birthYear
}
