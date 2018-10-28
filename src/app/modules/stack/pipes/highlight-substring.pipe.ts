import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hl',
})
export class HighlightSubstringPipe implements PipeTransform {
  transform(value: string, substring: string): string {
    if (value && substring) {
      const pattern = substring
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
        .split(' ')
        .filter((t) => {
          return t.length > 0;
        }).join('[\s\t\n\r]+');

      return value.replace(
        new RegExp(pattern, 'gi'),
        (found) => `<span class="highlight">${found}</span>`
      );
    } else {
      return value;
    }
  }
}
