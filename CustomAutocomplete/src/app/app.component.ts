import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormControl,
    Validators,
    AbstractControl,
    FormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    @ViewChild(MatAutocompleteTrigger, { static: false })
    autoCompleteTrigger: MatAutocompleteTrigger;
    title = 'CustomAutocomplete';

    dropdownList = [
        'Kerstin',
        'Sanjuanita',
        'Jami',
        'Jazmine',
        'Ollie',
        'Sylvia',
        'Noel',
        'Dillon',
        'Ramiro',
        'Nakesha',
        'Telma',
        'Tracie',
        'Sherice',
        'Russel',
        'Sharmaine',
        'Sheron',
        'Candy',
        'Krystin',
        'Laree',
        'Boyce',
    ];

    myFormGroup1: FormGroup;
    myFormGroup2: FormGroup;
    filteredOptions1: Observable<string[]>;
    filteredOptions2: Set<string>;

    constructor() {
        this.myFormGroup1 = new FormGroup({
            myControl1: new FormControl(),
        });
        this.myFormGroup2 = new FormGroup({
            myControl2: new FormControl('', [
                Validators.required,
                this.optionNotFound.bind(this),
            ]),
        });
    }

    ngOnInit() {
        // Mat Autocomplete function
        this.filteredOptions1 = this.myFormGroup1.controls.myControl1.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value))
        );
    }

    // Mat Autocomplete function
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.dropdownList.filter(
            (option) => option.toLowerCase().indexOf(filterValue) === 0
        );
    }


    // My Custom function
    optionNotFound(control: AbstractControl): { [s: string]: boolean } {
        const value = control.value;
        this.filteredOptions2 = new Set(
            this.dropdownList.filter(
                (option) =>
                    option.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
        );
        if (value && !this.filteredOptions2.size) {
            return { noOption: true };
        }
        return null;
    }
}
