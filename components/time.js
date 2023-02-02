import { parseISO, format } from 'date-fns'

export default function Time({ timeString }) {

  if(timeString === null || timeString === undefined) return null;

  const date = parseISO(timeString)


  return <time dateTime={timeString}>{format(date, 'kk:mm')}</time>
}
