import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ProductService} from '../../../../services/common/product.service';
import {Product} from '../../../../interfaces/common/product.interface';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {Variation, VariationOption} from '../../../../interfaces/common/variation.interface';

@Component({
  selector: 'app-test-variations-product',
  templateUrl: './test-variations-product.component.html',
  styleUrls: ['./test-variations-product.component.scss']
})
export class TestVariationsProductComponent implements OnInit, OnDestroy {

  @ViewChild('searchForm') searchForm: NgForm;
  dataForm: FormGroup

  // Data Store
  product?: Product;

  // Variation Data
  variationCombination = {};
  selectVariationOption: VariationOption = null;

  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  /**
   * FORMS METHODS
   * initDataForm()
   * onSubmit()
   */
  private initFormGroup() {
    this.dataForm = this.fb.group({
      id: [null]
    })
  }
  onSubmit() {
    this.getProductById();
  }


  /**
   * HTTP REQ HANDLE
   */
  private getProductById() {
    this.spinnerService.show();
    this.subDataOne = this.productService.getProductById(this.dataForm.value.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.product = res.data;
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  /**
   * ON SELECT SINGLE VARIATION OPTION
   * onSelectVariation()
   */
  onSelectVariation(data: Variation, v: string) {
    // Reset selected Variation Option
    this.selectVariationOption = null;

    // Main From Here
    this.variationCombination[data.name] = v;
    this.product.variationsOptions.forEach((data, i) => {
      let count = 0;
      data.variations.forEach((variation , j) => {
        if (variation.value === this.variationCombination[variation.name] ) {
          count++;
        }
      })
      if (count === data.variations.length) {
        this.selectVariationOption = data;
      }
    })
  }

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}
