import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormatPipe',
})
export class CpfFormatPipe implements PipeTransform {
  public transform(value: string): string {
    if (value?.length === 11) {
      return `(${value.slice(0, 2)}).${value.slice(2, 4)}.${value.slice(4,6)}-${value.slice(6,8)}`;
    } else {
      return value;
    }
  }
}
