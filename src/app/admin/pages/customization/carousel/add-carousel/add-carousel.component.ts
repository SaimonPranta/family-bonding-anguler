import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CarouselService} from '../../../../../services/common/carousel.service';
import {UtilsService} from '../../../../../services/core/utils.service';
import {Carousel} from '../../../../../interfaces/common/carousel.interface';
import {AllImagesDialogComponent} from '../../../gallery/image/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';
import {defaultUploadImage} from '../../../../../core/utils/app-data';
import {Select} from '../../../../../interfaces/core/select';

@Component({
  selector: 'app-add-carousel',
  templateUrl: './add-carousel.component.html',
  styleUrls: ['./add-carousel.component.scss']
})
export class AddCarouselComponent implements OnInit, OnDestroy {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  carousel?: Carousel;

  // Static data
  carouselTypes: Select[] = [
    {value: 'main', viewValue: 'Main Carousel'},
    {value: 'small', viewValue: 'Small Card'},
  ]

  // Image Picker
  pickedImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private carouselService: CarouselService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getCarouselById();
      }
    });
  }

  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
   private initDataForm() {
    this.dataForm = this.fb.group({
      title: [null, Validators.required],
      image: [null],
      url: [null],
      type: [null],
    });
  }
   private setFormValue() {
    if (this.carousel && this.carousel.image) {
      this.pickedImage = this.carousel.image;
    }
    this.dataForm.patchValue({...this.carousel});
  }
  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    // Create Angular Route Url from Url
    const mUrl = this.utilsService.urlToRouter(this.dataForm.value.url, true);
    const mData = {...this.dataForm.value, ...{url: mUrl}};

    if (this.carousel) {
      this.updateCarouselById(mData);
    } else {
      this.addCarousel(mData);

    }

  }

  /**
   * HTTP REQ HANDLE
   * getCarouselById
   * addCarousel
   * updateCarouselById
   */
  private getCarouselById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.carouselService.getCarouselById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.carousel = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addCarousel(data: any) {
    this.spinnerService.show();
    this.subDataOne = this.carouselService.addCarousel(data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.pickedImage = defaultUploadImage;
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private updateCarouselById(data: any) {
    this.spinnerService.show();
    this.subDataThree = this.carouselService.updateCarouselById(this.carousel._id, data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  /**
   * COMPONENT DIALOG
   * openGalleryDialog
   */

  public openGalleryDialog() {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'single', count: 1},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          const image: Gallery = dialogResult.data[0] as Gallery;
          this.dataForm.patchValue({image: image.url});
          this.pickedImage = image.url;
        }
      }
    });
  }
  /**
   * ON DESTROY
   */
   ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
  }

}
