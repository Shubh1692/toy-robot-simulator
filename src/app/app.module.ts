// Import angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import angular form module
import { ReactiveFormsModule } from '@angular/forms';
// Import angular browser animation module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import angular material modules
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
// Import custom component for app
import { AppComponent } from './app.component';
import { PlaceComponent } from './place/place.component';
import { ReportComponent } from './report/report.component';
@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
