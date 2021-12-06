import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponentsModule } from '../common/customComponents.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule, CustomComponentsModule],
  declarations: [],
})
export class LeadsModule {}
