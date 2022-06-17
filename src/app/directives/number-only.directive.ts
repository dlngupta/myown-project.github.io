import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector:'[numbersOnly]'
})

export class NumberOnly{
    private readonly regEx=new RegExp('^[0-9]*$');
    constructor(private el:ElementRef){

    }
    @Input() maxLength:number=5;
    @Input() onlyNumber:boolean=false;

    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if ( initalValue !== this.el.nativeElement.value) {
          event.stopPropagation();
        }
      }
        
    
    }
    

    
    
    
