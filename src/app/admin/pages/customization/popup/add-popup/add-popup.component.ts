import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {PopupService} from '../../../../../services/common/popup.service';
import {UtilsService} from '../../../../../services/core/utils.service';
import {Popup} from '../../../../../interfaces/common/popup.interface';
import {AllImagesDialogComponent} from '../../../gallery/image/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';
import {defaultUploadImage} from '../../../../../core/utils/app-data';
import {Select} from '../../../../../interfaces/core/select';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss']
})
export class AddPopupComponent implements OnInit, OnDestroy {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  popup?: Popup;

  // Static data
  popupTypes: Select[] = [
    {value: 'main', viewValue: 'Main Popup'},
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
    private popupService: PopupService,
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
        this.getPopupById();
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
    if (this.popup && this.popup.image) {
      this.pickedImage = this.popup.image;
    }
    this.dataForm.patchValue({...this.popup});
  }
  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    // Create Angular Route Url from Url
    const mUrl = this.utilsService.urlToRouter(this.dataForm.value.url, true);
    const mData = {...this.dataForm.value, ...{url: mUrl}};

    if (this.popup) {
      this.updatePopupById(mData);
    } else {
      this.addPopup(mData);

    }

  }

  /**
   * HTTP REQ HANDLE
   * getPopupById
   * addPopup
   * updatePopupById
   */
  private getPopupById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.popupService.getPopupById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.popup = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addPopup(data: any) {
    this.spinnerService.show();
    this.subDataOne = this.popupService.addPopup(data)
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

  private updatePopupById(data: any) {
    this.spinnerService.show();
    this.subDataThree = this.popupService.updatePopupById(this.popup._id, data)
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
