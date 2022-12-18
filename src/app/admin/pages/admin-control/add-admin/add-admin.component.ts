import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {UiService} from "../../../../services/core/ui.service";
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../../services/admin/admin.service";
import {ADMIN_PERMISSIONS, ADMIN_ROLES, GENDERS} from "../../../../core/utils/app-data";
import {Select} from "../../../../interfaces/core/select";
import {AdminDataService} from "../../../../services/admin/admin-data.service";
import {Admin} from "../../../../interfaces/admin/admin";
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit, OnDestroy {

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  user?: Admin;

  // Static Data
  roles: Select[] = ADMIN_ROLES;
  permissions: Select[] = ADMIN_PERMISSIONS;
  genders: Select[] = GENDERS;
  hasAccess: Select[] = [
    {value: true, viewValue: 'Yes'},
    {value: false, viewValue: 'No'},
  ];
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminDataService: AdminDataService,
    private adminService: AdminService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  /**
   * GENERATE USER NAME
   */
  public get generateUsername(): string {
    if (this.dataForm && this.dataForm.value.username) {
      // const rs = this.dataForm.value.username.replace(/[^a-zA-Z ]/g, '');
      const rs = this.dataForm.value.username.replace(/[^A-Za-z0-9]/g, '');
      return rs.trim().toLowerCase();
    } else {
      return '';
    }
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getAdminById();
      }
    });
  }

  /**
   * ON SUBMIT FORM
   */
  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.user) {
      this.updateAdminById();
    } else {
      this.adminRegistration();

    }

  }


  /**
   * INIT FORM
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.email],
      username: [null, Validators.required],
      phoneNo: [null, Validators.required],
      gender: [null, Validators.required],
      role: [null, Validators.required],
      permissions: [null, Validators.required],
      hasAccess: [null, Validators.required],
      password: [null],
      newPassword: [null]
    });
  }

  /**
   * SET FORM DATA
   */

  private setFormValue() {
    this.dataForm.patchValue({...this.user, ...{password: null}});
  }


  /**
   * HTTP REQ HANDLE
   * getAdminById
   * adminRegistration
   * updateAdminById
   */
  private getAdminById() {
    this.spinnerService.show();
    const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.adminDataService.getAdminById(this.id, select)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.user = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private adminRegistration() {
    this.spinnerService.show();
    const finalData = {
      ...this.dataForm.value,
      ...{username: this.generateUsername}
    };

    this.subDataOne = this.adminService.adminRegistration(finalData)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
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

  private updateAdminById() {
    this.spinnerService.show();
    // Delete Bad Field
    const mData = this.dataForm.value;
    delete mData.password;

    this.subDataThree = this.adminDataService.updateAdminById(this.user._id, mData)
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
