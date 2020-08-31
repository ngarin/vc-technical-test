import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'dateSince',
})
export class DateSincePipe implements PipeTransform {
  transform(date: string): string {
    const now = moment()

    const years = now.diff(moment(date), 'years')

    if (years) {
      return `${years} year${years > 1 ? 's' : ''}`
    }

    const months = now.diff(moment(date), 'months')

    if (months) {
      return `${months} month${months > 1 ? 's' : ''}`
    }

    const days = now.diff(moment(date), 'days')

    return `${days} day${days > 1 ? 's' : ''}`
  }
}
