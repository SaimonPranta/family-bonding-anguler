import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SubDistrictService} from '../../../../../services/common/sub-district.service';
import {UtilsService} from '../../../../../services/core/utils.service';
import {SubDistrict} from '../../../../../interfaces/common/sub-district.interface';
// import {AllImagesDialogComponent} from '../../../gallery/image/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';
import {defaultUploadImage} from '../../../../../core/utils/app-data';
import {MatCheckboxChange} from '@angular/material/checkbox';

import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import {FilterData} from '../../../../../interfaces/core/filter-data';
import {MatSelectChange} from '@angular/material/select';
import {CountryService} from '../../../../../services/common/country.service';
import {DistrictService} from '../../../../../services/common/district.service';
import {DivisionService} from '../../../../../services/common/division.service';
import {Country} from '../../../../../interfaces/common/country.interface';
import {Division} from '../../../../../interfaces/common/division.interface';
import {District} from '../../../../../interfaces/common/district.interface';
import {Continent} from '../../../../../interfaces/common/continent.interface';
import {ContinentService} from '../../../../../services/common/continent.service';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-add-sub-district',
  templateUrl: './add-sub-district.component.html',
  styleUrls: ['./add-sub-district.component.scss']
})
export class AddSubSubDistrictComponent implements OnInit {
// Ngx Quill
  country?: Country[] = [];
  modules: any = null;
  continent:Continent[]=[];
// Store Data
  slug: string = null;
  pageInfo: SubDistrict = null;
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;

  // Store Data
  id?: string;
  subDistrict?: SubDistrict;
  countries?: Country[] = [];
  division?: Division[] = [];
  district?: District[] = [];

  // Image Picker
  pickedImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private continentService: ContinentService,
    private subDistrictService: SubDistrictService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private countryService: CountryService,
    private districtService: DistrictService,
    private divisionService: DivisionService,
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
        this.getSubDistrictById();
      }
      else {
        // Base Data
        this.getAllCountries();
        this.getAllContinents()
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
   * ON CATEGORY SELECT
   */
  onContinentSelect(event: MatSelectChange) {
    if (event.value) {
      this.getCountryByContinentId(event.value);
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
      country: [null],
      division: [null],
      continent:[null],
      district: [null],
    });
  }

  // private setFormValue() {
  //   if (this.subDistrict && this.subDistrict.image) {
  //     this.pickedImage = this.subDistrict.image;
  //   }
  //   if (this.subDistrict.isHtml) {
  //     this.dataForm.patchValue({htmlBase: this.subDistrict.description});
  //   }
  //   this.dataForm.patchValue({...this.subDistrict});
  // }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.subDistrict) {
      this.updateSubDistrictById();
    } else {
      this.addSubDistrict();

    }

  }

  /**
   * ON CATEGORY SELECT
   */
  onCountrySelect(event: MatSelectChange) {
    if (event.value) {
      this.getDivisionByCountryId(event.value);
    }
  }

  onDivisionSelect(event: MatSelectChange) {
    if (event.value) {
      this.getDistrictByDivisionId(event.value);
    }
  }

  /**
   * HTTP REQ HANDLE
   * getSubDistrictById
   * addSubDistrict
   * updateSubDistrictById
   * getAllContinents
   * getCountryByContinentId
   */
  private getCountryByContinentId(continentId: string) {
    console.log('continentId', continentId)
    this.subDataFour = this.countryService.getCountryIdByContinentId(continentId)
      .subscribe(res => {
        this.country = res.data;
        console.log('country', this.country)
      }, error => {
        console.log(error);
      });
  }

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

          // if (this.id){
          //   const continent = this.continent.find(f => f.name ==this.division?.continent?.name)
          //   console.log("stt dtat",continent)
          //   this.dataForm.patchValue({continent:continent?._id})
          // }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private getAllCountries() {
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
    this.subDataFour = this.countryService.getAllCountrys(filterData, null)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          this.countries = res.data;
          console.log('countries', this.countries)
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }


  private getDivisionByCountryId(countryId: string) {
    console.log('countryId', countryId)
    this.subDataFive = this.divisionService.getDivisionByCountryId(countryId)
      .subscribe(res => {
        this.division = res.data;
        console.log('division', this.division)
      }, error => {
        console.log(error);
      });
  }

  private getDistrictByDivisionId(countryId: string) {
    console.log('countryId', countryId)
    this.subDataFive = this.districtService.getDistrictByDivisionId(countryId)
      .subscribe(res => {
        this.district = res.data;
        console.log('division', this.division)
      }, error => {
        console.log(error);
      });
  }


  private getSubDistrictById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.subDistrictService.getSubDistrictById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.subDistrict = res.data;
            this.setFormValue();
            if(this.id){
              this.getAllContinents();
              this.getAllCountries();
            }
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private addSubDistrict() {
    this.spinnerService.show();
    this.subDataOne = this.subDistrictService.addSubDistrict(this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            // this.formElement.resetForm();
            this.dataForm.get('name').reset()
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

  private updateSubDistrictById() {
    this.spinnerService.show();
    this.subDataThree = this.subDistrictService.updateSubDistrictById(this.subDistrict._id, this.dataForm.value)
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

  private setFormValue() {

    this.dataForm.patchValue({...this.subDistrict});

    // Get Sub Category By Category
    if (this.subDistrict.country) {
      this.dataForm.patchValue({
        country: this.subDistrict.country._id,
        continent: this.subDistrict.continent._id,
        division: this.subDistrict.division._id,
        district: this.subDistrict.district._id,
      })
    }

    if (this.subDistrict.division) {
      this.getDivisionByCountryId(this.subDistrict.country._id)
    }

    if (this.subDistrict.district) {
      this.getDistrictByDivisionId(this.subDistrict.division._id)
    }
    if (this.subDistrict.continent) {
      this.getCountryByContinentId(this.subDistrict.continent._id)
    }
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
