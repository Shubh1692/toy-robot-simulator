// Import angular components
import { Component } from '@angular/core';
// Import angular form components
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Import material components
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-place',
    templateUrl: 'place.component.html',
})
export class PlaceComponent {
    placeForm: FormGroup;
    faces = [{
        name: 'North',
        value: 0
    },
    {
        name: 'South',
        value: 180
    },
    {
        name: 'East',
        value: 90
    },
    {
        name: 'West',
        value: 270
    }];
    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<PlaceComponent>) {
        this.placeForm = this.fb.group({
            x: this.fb.control('', [Validators.required, Validators.min(0), Validators.max(5)]),
            y: this.fb.control('', [Validators.required, Validators.min(0), Validators.max(5)]),
            face: this.fb.control('', [Validators.required])
        });
    }

    /**
     * This method used to cancel place popup
     */
    onCancel(): void {
        this.dialogRef.close();
    }
    /**
     * This method used to submit form value and pass to parent component
     */
    onSubmit(): void {
        if (this.placeForm.valid) {
            this.dialogRef.close(this.placeForm.value);
        }
    }
}
