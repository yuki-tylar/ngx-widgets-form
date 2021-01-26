import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { DirectiveModule } from '@takayuki-h/ngx-directive';
import { TextfieldComponent } from './textfield/textfield.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';

@NgModule({
  declarations: [CheckboxComponent, SelectboxComponent, TextfieldComponent, CheckboxGroupComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DirectiveModule,
  ],
  exports: [CheckboxComponent, SelectboxComponent, TextfieldComponent]
})
export class FormModule { }
