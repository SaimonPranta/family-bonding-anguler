import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CountryService} from '../../../../../services/common/country.service';
import {UtilsService} from '../../../../../services/core/utils.service';
import {Country} from '../../../../../interfaces/common/country.interface';
// import {AllImagesDialogComponent} from '../../../gallery/image/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';
import {defaultUploadImage} from '../../../../../core/utils/app-data';
import {MatCheckboxChange} from '@angular/material/checkbox';

import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import {Pagination} from '../../../../../interfaces/core/pagination';
import {FilterData} from '../../../../../interfaces/core/filter-data';
import {ContinentService} from '../../../../../services/common/continent.service';
import {Continent} from '../../../../../interfaces/common/continent.interface';
import {MatSelectChange} from '@angular/material/select';

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  continent: Continent[] = [];
// Ngx Quill
  modules: any = null;

// Store Data
  slug: string = null;
  pageInfo: Country = null;
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;

  // Store Data
  id?: string;
  country?: Country;
  //  country?: any;
  continentName?: any;

  // Image Picker
  pickedImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private countryService: CountryService,
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
    console.log('see c', this.country)

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getCountryById();
      } else {
        this.getAllContinents();
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
      continent: [null],
      name: [null, Validators.required],
    });
  }

  // private setFormValue() {
  //   if (this.country && this.country.image) {
  //     this.pickedImage = this.country.image;
  //   }
  //   if (this.country.isHtml) {
  //     this.dataForm.patchValue({htmlBase: this.country.description});
  //   }
  //   this.dataForm.patchValue({...this.country});
  // }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.country) {
      console.log('update')
      this.updateCountryById();
    } else {
      console.log('add')
      this.addCountry();

    }

  }


  /**
   * ON CATEGORY SELECT
   */
  // onContainentSelect(event: MatSelectChange) {
  //   if (event.value) {
  //     this.getCountryIdByContinentId(event.value);
  //   }
  // }


  /**
   * HTTP REQ HANDLE
   * getCountryById
   * addCountry
   * updateCountryById
   * getAllContinents
   * getDivisionByCountryId
   */

  // private getCountryIdByContinentId(continentId: string) {
  //   console.log('countryId', continentId)
  //   this.subDataFour = this.countryService.getCountryIdByContinentId(continentId)
  //     .subscribe(res => {
  //       this.country = res.data;
  //       console.log('country', this.country)
  //     }, error => {
  //       console.log(error);
  //     });
  // }
  private getAllContinents() {
    this.spinnerService.show();
    // Select
    const mSelect = {
      name: 1,

    }

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {name: 1}
    }
    this.subDataFour = this.continentService.getAllContinents(filterData, null)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          this.continent = res.data;
          console.log('continent', this.continent)
          if (this.id){
            const continent = this.continent.find(f => f.name ==this.country.continent?.name)
            console.log("stt dtat",continent)
            this.dataForm.patchValue({continent:continent?._id})
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }


  private setFormValue() {

    this.dataForm.patchValue({...this.country});

    // Get Sub Category By Category
    if (this.country?.continent) {
      this.dataForm.patchValue({
        country: this.country._id,
        continent: this.country.continent._id,
      })
    }

    // if (this.country.continent) {
    //   this.getCountryIdByContinentId(this.country.continent._id)
    // }
  }

  private getCountryById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.countryService.getCountryById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.country = res.data;

            console.log('country', this.country)

            this.setFormValue();
            this.dataForm.patchValue(this.country)
            if (this.id) {
              this.getAllContinents();
            }

          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private addCountry() {
    this.spinnerService.show();
    this.subDataOne = this.countryService.addCountry(this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.dataForm.get('name').reset();
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

  private updateCountryById() {
    this.spinnerService.show();
    this.subDataThree = this.countryService.updateCountryById(this.country._id, this.dataForm.value)
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
