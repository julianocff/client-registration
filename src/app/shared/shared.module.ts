import { HeightFormatPipe } from './pipes/height-format/height-format.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfFormatPipe } from './pipes/cpf-format/cpf-format.pipe';

@NgModule({
  declarations: [CpfFormatPipe, HeightFormatPipe],
  exports: [CpfFormatPipe, HeightFormatPipe],
  imports: [CommonModule],
})
export class SharedModule {}
