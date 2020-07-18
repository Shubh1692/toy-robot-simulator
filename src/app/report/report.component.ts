
// Import angular components
import { Component, Inject } from '@angular/core';
// Import material components
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-report-sheet',
    templateUrl: 'report.component.html',
})
export class ReportComponent {
    constructor(private bottomSheetRef: MatBottomSheetRef<ReportComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    }

    /**
     * This method used to close report action sheet on click of action sheet
     */
    onClose(): void {
        this.bottomSheetRef.dismiss();
    }
}
