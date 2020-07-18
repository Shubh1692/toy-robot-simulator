// Import angular components
import { Component, ViewChild } from '@angular/core';
// Import material components
import { MatGridList } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
// Import custom components
import { PlaceComponent } from './place/place.component';
import { ReportComponent } from './report/report.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  totalTableToyCards = Array(25); // variable for create table platform for toy
  toyPosition = { // Initial position of toy hide on table before place
    left: '0px',
    bottom: '0px',
    transform: 'rotate(0deg)',
    display: 'none',
    transition: '1s'
  };
  face: number | null = null;  // Initial position of toy
  @ViewChild('toyTable') toyTableInstance: MatGridList | any; // Table toy grid instance

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private bottomSheet: MatBottomSheet) {
  }

  /**
   * This method used to move toy to  1step in current direction
   * This method also give information toy reached at max move position
   */
  // tslint:disable-next-line: typedef
  onMoveAction() {
    const toyTableHeight = this.toyTableInstance._element.nativeElement.offsetHeight;
    const toyTableWidth = this.toyTableInstance._element.nativeElement.offsetWidth;
    let left = Number(this.toyPosition.left.split('px')[0]);
    let bottom = Number(this.toyPosition.bottom.split('px')[0]);
    switch (this.face) {
      case 0:
        bottom = bottom + (toyTableHeight / 5);
        break;
      case 90:
        left = left + (toyTableWidth / 5);
        break;
      case 180:
        bottom = bottom - (toyTableHeight / 5);
        break;
      case 270:
        left = left - (toyTableWidth / 5);
        break;
    }
    if (left < 0 || bottom < 0 || left >= toyTableWidth || bottom >= toyTableHeight) {
      return this.snackBar.open('Please change face of toy', null, {
        duration: 2000,
      });
    }
    this.toyPosition = {
      ...this.toyPosition,
      ...{
        left: `${left}px`,
        bottom: `${bottom}px`,
        transition: '1s'
      }
    };
  }

  /**
   * This method used open place popup for enter placement values of popup
   * This method also used for set current state of toy after submit placement values
   */
  openPlaceDialog(): void {
    const dialogRef = this.dialog.open(PlaceComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const toyTableHeight = this.toyTableInstance._element.nativeElement.offsetHeight;
      const toyTableWidth = this.toyTableInstance._element.nativeElement.offsetWidth;
      this.face = result.face;
      const left = `${(toyTableWidth / 5) * (result.x - 1)}px`;
      const bottom = `${(toyTableHeight / 5) * (result.y - 1)}px`;
      this.toyPosition = {
        ...this.toyPosition,
        ...{
          left,
          bottom,
          transition: '1s',
          display: 'flex',
          transform: `rotate(${this.face}deg)`,
        }
      };
    });
  }

  /**
   * This method used to set direction based on current direction
   */
  // tslint:disable-next-line: typedef
  onLeftRight(indicator: string) {
    switch (indicator) {
      case 'R':
        this.face = this.face + 90;
        break;
      case 'L':
        this.face = this.face - 90;
        break;
    }
    const rotationFactor = (this.face / 90);
    if (rotationFactor >= 4) {
      this.face = (rotationFactor - 4) * 90;
    } else if (rotationFactor < 0) {
      this.face = (rotationFactor + 4) * 90;
    }
    this.toyPosition = {
      ...this.toyPosition,
      ...{
        transition: '1s',
        transform: `rotate(${this.face}deg)`,
      }
    };
  }

  /**
   * This method used to show current state of toy in action sheet
   */
  // tslint:disable-next-line: typedef
  showReport() {
    let face = '';
    const toyTableHeight = this.toyTableInstance._element.nativeElement.offsetHeight;
    const toyTableWidth = this.toyTableInstance._element.nativeElement.offsetWidth;
    const left = Number(this.toyPosition.left.split('px')[0]);
    const bottom = Number(this.toyPosition.bottom.split('px')[0]);
    const xPosition = (((left * 100) / toyTableWidth) / 20) + 1;
    const yPosition = (((bottom * 100) / toyTableHeight) / 20) + 1;
    switch (this.face) {
      case 0:
        face = 'North';
        break;
      case 90:
        face = 'East';
        break;
      case 180:
        face = 'South';
        break;
      case 270:
        face = 'West';
        break;
    }
    this.bottomSheet.open(ReportComponent, {
      data: { face, xPosition, yPosition },
    });
  }
}
