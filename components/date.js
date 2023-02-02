import { parseISO, format } from 'date-fns'

export default function Date({ dateString, withYear }) {
  
  if(dateString === null || dateString === undefined) return null;

  const date = parseISO(dateString)

  return withYear ? 
    <time dateTime={dateString}>{format(date, 'dd.LL.yyyy')}</time>
    :
    <time dateTime={dateString}>{format(date, 'dd.LL')}</time>
  // return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}
