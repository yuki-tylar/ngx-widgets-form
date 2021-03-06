import { Component, OnInit, Input, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { ColorPreset, DarkMode } from '../types';
import{ TextfieldController } from '../textfield-controller'; 


@Component({
  selector: 'ngx-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {

  @Input() id?: string | number;
  @Input() label: string = 'label';
  @Input() value: string = '';
  @Input() hint?: string;
  @Input() type: string = 'text';
  @Input() darkmode: string = 'disable';
  @Input() color: ColorPreset = 'default';

  @Input() required?: string | boolean;
  @Input() min?: string | number;
  @Input() max?: string | number;
  @Input() email?: string | boolean;

  @Input() requiredError?: string;
  @Input() minError?: string;
  @Input() maxError?: string;
  @Input() emailError?: string;

  @Output() changeValue = new EventEmitter<ChangeTextfieldEvent>();
  @Output() getController = new EventEmitter<TextfieldController>();
  
  public isFocus: boolean = false;
  public isPasswordShown: boolean = false;

  public _controller: TextfieldController = new TextfieldController();
  private timer: any;
  
  constructor() {}

  get inputType(){ return (this.type == 'password' && !!this.isPasswordShown)? 'text' : this.type; }
  get darkClass(){ return (this.darkmode == 'enable')? 'dark' : (this.darkmode=="auto")? 'dark-auto' : ''; }
  get borderClass(){ return this.isFocus? 'color-border active' : 'color-border-secondary'; }
  get withHintClass(){ return (this.hint && this.hint.length > 0)? 'with-hint' : ''; }
  get labelColorClass(){ return this.isFocus ? 'color-text accent' : 'color-text-secondary'}
  get labelShrinkClass(){ return ((this._controller.value && this._controller.value.length > 0) || this.isFocus)? 'shrink' : '' }
  get hintClass(){ return (this.isFocus || (this._controller.value && this._controller.value.length > 0))? 'color-text-secondary' : 'color-text'; }

  ngOnChanges(e: SimpleChanges){
    if(e.id && !e.id.firstChange){ this._controller.setId(this.id); }

    if((e.required && !e.required.firstChange) ||
       (e.requiredError && !e.requiredError.firstChange)
    ){ 
      this._controller.setValidatorRequired({required: this.required, message: this.requiredError}); 
      this._controller.validate();
    }

    if((e.email && !e.email.firstChange) ||
       (e.emailError && !e.emailError.firstChange)
    ){
      this._controller.setValidatorEmail({email: this.email, message: this.emailError}); 
      this._controller.validate();
    }

    if((e.min && !e.min.firstChange) ||
       (e.minError && !e.minError.firstChange)
    ){ 
      this._controller.setValidatorMin({min: this.min, message: this.minError}); 
      this._controller.validate();
    }

    if((e.max && !e.max.firstChange) ||
       (e.maxError && !e.maxError.firstChange)
    ){ 
      this._controller.setValidatorMax({max: this.max, message: this.maxError}); 
      this._controller.validate();
    }

    if(e.value && !e.value.firstChange && this._controller.value != e.value.currentValue){
      this._controller.setValue(this.value);
      this._controller.validate();
    }
  }

  ngOnInit(): void {
    this._controller.setId(this.id);
    this._controller.setValue(this.value);

    this._controller.setValidatorRequired({required: this.required, message: this.requiredError});
    this._controller.setValidatorMin({min: this.min, message: this.minError});
    this._controller.setValidatorMax({max: this.max, message: this.maxError});
    this._controller.setValidatorEmail({email: this.email, message: this.requiredError});
    this._controller.validate();
    this.emitController();
  }


  onFocus(){ 
    this.isFocus = true;
    this._controller.touch(); 
  }
  onBlur(){ 
    this.isFocus = false; 
    this._controller.dirty();
  }

  togglePassword(){ this.isPasswordShown = !this.isPasswordShown; }

  onInput(e: Event){
    if(this.timer){ clearTimeout(this.timer); }
    this._controller.setValue((e.target as HTMLInputElement).value);

    this.timer = setTimeout(()=>{
      this._controller.validate();
      this.changeValue.emit({
        id: this._controller.id,
        value: this._controller.value
      });
    }, 350);
  }

  emitController(){ this.getController.emit(this._controller); }

}

export type ChangeTextfieldEvent = {
  value: string;
  id: string;
}
