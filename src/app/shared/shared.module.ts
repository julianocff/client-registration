import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfFormatPipe } from './pipes/cpf-format/cpf-format.pipe';

@NgModule({
  declarations: [CpfFormatPipe],
  exports: [CpfFormatPipe],
  imports: [CommonModule],
})
export class SharedModule {}
