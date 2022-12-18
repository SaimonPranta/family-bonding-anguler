import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ImageCropComponent} from './image-crop/image-crop.component';
import {FileData} from '../../../interfaces/gallery/file-data';
import {FileUploadService} from '../../../services/gallery/file-upload.service';
import {AdminDataService} from '../../../services/admin/admin-data.service';
import {Admin} from '../../../interfaces/admin/admin';
import {ReloadService} from '../../../services/core/reload.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UiService} from '../../../services/core/ui.service';
import {AdminChangePasswordComponent} from './admin-change-password/admin-change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Image Upload
  imageChangedEvent: any = null;
  staticImage = '/assets/images/avatar/user-young.jpg';
  imgPlaceHolder = '/assets/images/avatar/user-young.jpg';

  pickedImage?: any;
  file: any = null;
  newFileName: string;

  imgBlob: any = null;


  // Store data
  admin?: Admin;

  // Data Form
  dataForm?: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fileUploadService: FileUploadService,
    private adminDataService: AdminDataService,
    private reloadService: ReloadService,
    private fb: FormBuilder,
    private uiService: UiService,
  ) {
  }

  ngOnInit(): void {

    // INIT FORM
    this.initFormGroup();

    // OBSERVABLE
    this.reloadService.refreshAdmin$
      .subscribe(() => {
        this.getLoginAdminInfo();
      });

    // GET
    this.getLoginAdminInfo();
  }


  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
   private initFormGroup() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      email: [null],
      username: [null, Validators.required],
      phoneNo: [null]
    });

  }
  private setData() {
    this.dataForm.patchValue(this.admin);
    this.imgPlaceHolder = this.admin?.profileImg ? this.admin?.profileImg : this.staticImage;
  }
     onSubmit() {
      if (this.pickedImage) {
        this.imageUploadOnServer();
      } else {
        this.updateLoggedInAdminInfo();
      }
    }


  private removeImageFiles() {
    this.file = null;
    this.newFileName = null;
    this.pickedImage = null;
    this.imgBlob = null;
  }

  /**
   * ON IMAGE PICK
   */

  fileChangeEvent(event: any) {
    this.file = (event.target as HTMLInputElement).files[0];
    // File Name Modify...
    const originalNameWithoutExt = this.file.name.toLowerCase().split(' ').join('-').split('.').shift();
    const fileExtension = this.file.name.split('.').pop();
    // Generate new File Name..
    this.newFileName = `${Date.now().toString()}_${originalNameWithoutExt}.${fileExtension}`;

    const reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = () => {
      // this.imgPlaceHolder = reader.result as string;
    };

    // Open Upload Dialog
    if (event.target.files[0]) {
      this.openComponentDialog(event);
    }

    // NGX Image Cropper Event..
    this.imageChangedEvent = event;
  }


  /**
   * IMAGE UPLOAD HTTP REQ HANDLE
   */

  imageUploadOnServer() {
    const data: FileData = {
      fileName: this.newFileName,
      file: this.imgBlob,
      folderPath: 'admins'
    };
    this.fileUploadService.uploadSingleImage(data)
      .subscribe(res => {
        this.removeImageFiles();
        if (this.admin.profileImg) {
          this.removeOldImageFromServer(this.admin.profileImg);
        }
        this.updateLoggedInAdminInfo(res.downloadUrl);
      }, error => {
        console.log(error);
      });
  }

  /**
   * REMOVE IMAGE STORE DATA
   */
  removeOldImageFromServer(imgUrl: string) {
    this.fileUploadService.removeSingleFile(imgUrl)
      .subscribe(res => {
        console.log(res.message);
      }, error => {
        console.log(error);
      });
  }



  /**
   * HTTP REQ HANDLE
   *  getLoginAdminInfo()
   *  updateLoggedInAdminInfo()
   */
  private getLoginAdminInfo() {
    this.adminDataService.getLoggedInAdminData()
      .subscribe(res => {
        this.admin = res.data;
        this.setData();
      }, error => {
        console.log(error);
      });
  }

  private updateLoggedInAdminInfo(image?: string) {
    const formData = {
      name: this.dataForm.value.name,
      phoneNo: this.dataForm.value.phoneNo,
      email: this.dataForm.value.email,
    } as Admin;

    const data = image ? {...formData, ...{profileImg: image}} : formData;
    this.adminDataService.updateLoggedInAdminInfo(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshAdmin$();
      }, error => {
        console.log(error);
      });
  }
  /**
   * OPEN COMPONENT DIALOG
   */
   public openComponentDialog(data?: any) {
    const dialogRef = this.dialog.open(ImageCropComponent, {
      data,
      panelClass: ['theme-dialog'],
      autoFocus: false,
      disableClose: true,
      width: '680px',
      minHeight: '400px',
      maxHeight: '600px'
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.imgBlob) {
          this.imgBlob = dialogResult.imgBlob;
        }
        if (dialogResult.croppedImage) {
          this.pickedImage = dialogResult.croppedImage;
          this.imgPlaceHolder = this.pickedImage;
        }
      }
    });
  }

  /**
   * OPEN CHANGE COMPONENT DIALOG
   */
  public openChangePasswordDialog() {
    this.dialog.open(AdminChangePasswordComponent, {
      data: this.admin,
      panelClass: ['theme-dialog'],
      autoFocus: false,
      disableClose: false,

    });
  }


}
