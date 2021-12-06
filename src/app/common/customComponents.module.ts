import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableHeader } from './directives/sortableHeader.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SortableHeader],
  exports: [SortableHeader],
})
export class CustomComponentsModule {}
