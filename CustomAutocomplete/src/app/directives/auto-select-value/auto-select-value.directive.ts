import {
    Directive,
    Input,
    ElementRef,
    Renderer2,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[appAutoSelectValue]',
})
export class AutoSelectValueDirective {
    topValue: string;

    @Input() dropdownList: Set<string>;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('blur') AutoSelectValue() {
        const value = this.el.nativeElement.value;
        this.topValue = this.dropdownList.values().next().value;
        if (!this.topValue || !value) {
            (this.el.nativeElement as HTMLInputElement).value = null;
        } else {
            (this.el.nativeElement as HTMLInputElement).value = this.topValue;
        }
    }
}
