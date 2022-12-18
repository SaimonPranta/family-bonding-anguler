import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UiService} from '../../../../../services/core/ui.service';
import {Variation} from '../../../../../interfaces/common/variation.interface';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {VariationService} from '../../../../../services/common/variation.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-variations',
  templateUrl: './add-variations.component.html',
  styleUrls: ['./add-variations.component.scss']
})
export class AddVariationsComponent implements OnInit, OnDestroy {

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  valuesDataArray?: FormArray;

  // Store Data
  id?: string;
  variation?: Variation;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;


  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private variationService: VariationService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getVariationById();
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
      name: [null, Validators.required],
      values: this.fb.array([
        this.createStringElement()
      ]),
    });

    this.valuesDataArray = this.dataForm.get('values') as FormArray;
  }
  private setFormValue() {
    this.dataForm.patchValue(this.variation);

    // Remove First Value
    this.valuesDataArray.removeAt(0);
    this.variation.values.forEach(f => {
      const ctrl = this.fb.control(f, Validators.required);
      (this.dataForm?.get('values') as FormArray).push(ctrl);
    });
  }
  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    console.log(this.dataForm.value)

    if (this.variation) {
      this.updateVariationById();
    } else {
      this.addVariation();

    }

  }

  /**
   * FORM ARRAY BUILDER
   * createStringElement()
   * onAddNewFormObject()
   * removeFormArrayField()
   */
  createStringElement(){
    return this.fb.control('', Validators.required);
  }

  onAddNewFormString(formControl: string) {
    (this.dataForm?.get(formControl) as FormArray).push(this.createStringElement());
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'values': {
        formDataArray = this.valuesDataArray;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }
  /**
   * HTTP REQ HANDLE
   * getVariationById
   * addVariation
   * updateVariationById
   */
  private getVariationById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.variationService.getVariationById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.variation = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addVariation() {
    this.spinnerService.show();
    this.subDataOne = this.variationService.addVariation(this.dataForm.value)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private updateVariationById() {
    this.spinnerService.show();
    this.subDataThree = this.variationService.updateVariationById(this.variation._id, this.dataForm.value)
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
