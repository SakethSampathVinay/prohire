import { Pipe, PipeTransform } from '@angular/core';
import { setCurrentInjector } from '@angular/core/primitives/di';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const time = new Date(value).getTime();
    const now = new Date().getTime();
    const seconds = Math.floor((now - time) / 1000);

    if (seconds < 29) return 'Just Now';

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const key in intervals) {
      const value = Math.floor(seconds / intervals[key]);
      if (value > 0) {
        return `${value} ${key}${value > 1 ? 's' : ''} ago`;
      }
    }
    return 'Just Now';
  }
}
