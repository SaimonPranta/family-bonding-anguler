import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ContinentService} from '../../../../../services/common/continent.service';
import {UtilsService} from '../../../../../services/core/utils.service';

// import {AllImagesDialogComponent} from '../../../gallery/image/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';
import {defaultUploadImage} from '../../../../../core/utils/app-data';
import {MatCheckboxChange} from '@angular/material/checkbox';

import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import {Continent} from '../../../../../interfaces/common/continent.interface';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-add-continent',
  templateUrl: './add-continent.component.html',
  styleUrls: ['./add-continent.component.scss']
})
export class AddContinentComponent implements OnInit {
// Ngx Quill
  modules: any = null;

// Store Data
  slug: string = null;
  pageInfo: Continent = null;
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;

  // Store Data
  id?: string;
  continent?: Continent;

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
    private continentService: ContinentService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initQuillModule();
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getcontinentById();
      }
    });
  }


  /**
   * QUILL CONFIG
   * initQuillModule()
   */
  private initQuillModule() {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      },
      'toolbar': {
        container: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{'header': 1}, {'header': 2}],               // custom button values
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
          [{'direction': 'rtl'}],                         // text direction

          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
          [{'header': [1, 2, 3, 4, 5, 6, false]}],

          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          [{'font': []}],
          [{'align': []}],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video'],                         // link and image, video
          ['emoji'],
        ],
      }
    }


  }


  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      image: [null],
      serial: [null],
      description: [null],
      shortDesc: [null],
      isHtml: [null],
      htmlBase: [null],
    });
  }

  // private setFormValue() {
  //   if (this.continent && this.continent.image) {
  //     this.pickedImage = this.continent.image;
  //   }
  //   if (this.continent.isHtml) {
  //     this.dataForm.patchValue({htmlBase: this.continent.description});
  //   }
  //   this.dataForm.patchValue({...this.continent});
  // }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.continent) {
      this.updatecontinentById();
    } else {
      this.addcontinent();

    }

  }


  /**
   * HTTP REQ HANDLE
   * getcontinentById
   * addcontinent
   * updatecontinentById
   */
  private getcontinentById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.continentService.getContinentById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.continent = res.data;
            // this.setFormValue();
            this.dataForm.patchValue(this.continent)
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private addcontinent() {
    this.spinnerService.show();
    this.subDataOne = this.continentService.addContinent(this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
            this.pickedImage = defaultUploadImage;
          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private updatecontinentById() {
    this.spinnerService.show();
    this.subDataThree = this.continentService.updateContinentById(this.continent._id, this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  /**
   * COMPONENT DIALOG
   * openGalleryDialog
   */

  // public openGalleryDialog() {
  //   const dialogRef = this.dialog.open(AllImagesDialogComponent, {
  //     data: {type: 'single', count: 1},
  //     panelClass: ['theme-dialog', 'full-screen-modal-lg'],
  //     width: '100%',
  //     minHeight: '100%',
  //     autoFocus: false,
  //     disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     if (dialogResult) {
  //       if (dialogResult.data && dialogResult.data.length > 0) {
  //         const image: Gallery = dialogResult.data[0] as Gallery;
  //         this.dataForm.patchValue({image: image.url});
  //         this.pickedImage = image.url;
  //       }
  //     }
  //   });
  // }

  /**
   * HTML EDIT FUNCTIONS
   * onChangeBaseHtml()
   * onCheckChange()
   */
  onChangeBaseHtml(event: string) {
    this.dataForm.patchValue({
      description: event
    })
  }

  onCheckChange(event: MatCheckboxChange) {
    this.dataForm.patchValue({
      description: null,
      htmlBase: null
    })
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
