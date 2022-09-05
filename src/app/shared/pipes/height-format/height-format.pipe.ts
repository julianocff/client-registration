import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heightFormat',
})
export class HeightFormatPipe implements PipeTransform {
  public transform(value: string): string {
    if (value?.length === 3) {
      return `${value.slice(0, 1)},${value.slice(1, 3)}`;
    } else {
      return value;
    }
  }
}
