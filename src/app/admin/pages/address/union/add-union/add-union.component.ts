import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UnionService} from '../../../../../services/common/union.service';
import {UtilsService} from '../../../../../services/core/utils.service';
import {Union} from '../../../../../interfaces/common/union.interface';
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
import {SubDistrictService} from '../../../../../services/common/sub-district.service';
import {Country} from '../../../../../interfaces/common/country.interface';
import {Division} from '../../../../../interfaces/common/division.interface';
import {District} from '../../../../../interfaces/common/district.interface';
import {SubDistrict} from '../../../../../interfaces/common/sub-district.interface';
import {Continent} from '../../../../../interfaces/common/continent.interface';
import {ContinentService} from '../../../../../services/common/continent.service';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-add-union',
  templateUrl: './add-union.component.html',
  styleUrls: ['./add-union.component.scss']
})
export class AddUnionComponent implements OnInit {
// Ngx Quill
  country?: Country[] = [];
  modules: any = null;
  continent:Continent[]=[];

// Store Data
  slug: string = null;
  pageInfo: Union = null;
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;

  // Store Data
  id?: string;
  union?: Union;
  countries?: Country[] = [];
  division?: Division[] = [];
  district?: District[] = [];
  subDistrict?: SubDistrict[] = [];

  // Image Picker
  pickedImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subDataSeven: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private unionService: UnionService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private continentService: ContinentService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private countryService: CountryService,
    private districtService: DistrictService,
    private divisionService: DivisionService,
    private subDistrictService: SubDistrictService,
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
        this.getUnionById();
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
      subDistrict: [null],
    });
  }

  // private setFormValue() {
  //   if (this.union && this.union.image) {
  //     this.pickedImage = this.union.image;
  //   }
  //   if (this.union.isHtml) {
  //     this.dataForm.patchValue({htmlBase: this.union.description});
  //   }
  //   this.dataForm.patchValue({...this.union});
  // }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.union) {
      this.updateUnionById();
    } else {
      this.addUnion();

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

  onDistrictSelect(event: MatSelectChange) {
    if (event.value) {
      this.getSubDistrictByDistrictId(event.value);
    }
  }


  /**
   * HTTP REQ HANDLE
   * getUnionById
   * addUnion
   * updateUnionById
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

  private getDistrictByDivisionId(divisionId: string) {
    this.subDataSix = this.districtService.getDistrictByDivisionId(divisionId)
      .subscribe(res => {
        this.district = res.data;
      }, error => {
        console.log(error);
      });
  }


  private getSubDistrictByDistrictId(countryId: string) {
    console.log('countryId', countryId)
    this.subDataSeven = this.subDistrictService.getSubDistrictByDistrictId(countryId)
      .subscribe(res => {
        this.subDistrict = res.data;
        console.log('division', this.division)
      }, error => {
        console.log(error);
      });
  }


  private getUnionById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.unionService.getUnionById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.union = res.data;
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

  private addUnion() {
    this.spinnerService.show();
    this.subDataOne = this.unionService.addUnion(this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            // this.formElement.resetForm();
            this.dataForm.get('name').reset()
            this.pickedImage = defaultUploadImage;
          } else {
            console.log('res.message', res.message);

            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private updateUnionById() {
    this.spinnerService.show();
    this.subDataThree = this.unionService.updateUnionById(this.union._id, this.dataForm.value)
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

    this.dataForm.patchValue({...this.union});

    // Get Sub Category By Category
    if (this.union.country) {
      this.dataForm.patchValue({
        country: this.union.country._id,
        continent: this.union.continent._id,
        division: this.union.division._id,
        district: this.union.district._id,
        subDistrict: this.union.subDistrict._id,
      })
    }

    if (this.union.division) {
      this.getDivisionByCountryId(this.union.country._id)
    }

    if (this.union.district) {
      this.getDistrictByDivisionId(this.union.division._id)
    }

    if (this.union.subDistrict) {
      this.getSubDistrictByDistrictId(this.union.district._id)
    }
    if (this.union.continent) {
      this.getCountryByContinentId(this.union.continent._id)
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
