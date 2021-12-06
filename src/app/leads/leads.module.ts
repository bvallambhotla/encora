import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponentsModule } from '../common/customComponents.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    CustomComponentsModule,
  ],
  declarations: [],
})
export class LeadsModule {}
