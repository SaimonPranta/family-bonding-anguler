import {Component, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UiService} from '../../../services/core/ui.service';
import {Review} from '../../../interfaces/common/review.interface';
import {ReviewService} from '../../../services/common/review.service';
import {ReloadService} from '../../../services/core/reload.service';

// @ts-ignore
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  allReviews: Review[] = [];

  constructor(
    private dialog: MatDialog,
    private reviewService: ReviewService,
    private uiService: UiService,
    private reloadService: ReloadService,
  ) {
  }

  ngOnInit(): void {
    this.reloadService.refreshData$
      .subscribe(() => {
        this.getAllReviews();
      });
    this.getAllReviews();
  }

  /**
   * COMPONENT DIALOG VIEW
   */
  public openConfirmDialog(data?: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this category?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteReviewByReviewId(data);
      }
    });
  }

  // openComponentDialog(product: string) {
  //
  // }

  /**
   * HTTP REQ HANDLE
   */

  private getAllReviews() {
    this.reviewService.getAllReviews()
      .subscribe(res => {
        this.allReviews = res.data;
        console.log("ge all ", this.allReviews)
      }, error => {
        console.log(error);
      });
  }

  /**
   * DELETE METHOD HERE
   */
  private deleteReviewByReviewId(id: string) {
    this.reviewService.deleteReviewByReviewId(id)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshData$();
      }, error => {
        console.log(error);
      });
  }
}
