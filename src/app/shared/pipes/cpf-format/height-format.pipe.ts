import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heightFormat'
})
export class HeightFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
