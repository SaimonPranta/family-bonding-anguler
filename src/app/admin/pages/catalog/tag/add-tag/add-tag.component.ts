import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Select} from '../../../../../interfaces/core/select';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TagService} from '../../../../../services/common/tag.service';
import {UtilsService} from '../../../../../services/core/utils.service';
import {Tag} from '../../../../../interfaces/common/tag.interface';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit, OnDestroy {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  tag?: Tag;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private tagService: TagService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getTagById();
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
    });
  }

   private setFormValue() {
    this.dataForm.patchValue({...this.tag});
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.tag) {
      this.updateTagById();
    } else {
      this.addTag();

    }

  }


  /**
   * HTTP REQ HANDLE
   * getTagById
   * addTag
   * updateTagById
   */
  private getTagById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.tagService.getTagById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.tag = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addTag() {
    this.spinnerService.show();
    this.subDataOne = this.tagService.addTag(this.dataForm.value)
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

  private updateTagById() {
    this.spinnerService.show();
    this.subDataThree = this.tagService.updateTagById(this.tag._id, this.dataForm.value)
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
