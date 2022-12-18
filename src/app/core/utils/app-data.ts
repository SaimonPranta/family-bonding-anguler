
import {Select} from '../../interfaces/core/select';
import {AdminRolesEnum} from '../../enum/admin.roles.enum';
import {AdminPermissions} from "../../enum/admin-permission.enum";
import {FileTypes} from '../../enum/file-types.enum';
import {OrderStatus} from '../../enum/order.enum';

export const ADMIN_ROLES: Select[] = [
  {value: AdminRolesEnum.SUPER_ADMIN, viewValue: 'Super Admin'},
  {value: AdminRolesEnum.ADMIN, viewValue: 'Admin'},
  {value: AdminRolesEnum.EDITOR, viewValue: 'Editor'}
];

export const ADMIN_PERMISSIONS: Select[] = [
  {value: AdminPermissions.CREATE, viewValue: 'Create'},
  {value: AdminPermissions.GET, viewValue: 'Get'},
  {value: AdminPermissions.EDIT, viewValue: 'Edit'},
  {value: AdminPermissions.DELETE, viewValue: 'Delete'},
];

export const GENDERS: Select[] = [
  {value: 'male', viewValue: 'Male'},
  {value: 'female', viewValue: 'Female'},
  {value: 'other', viewValue: 'Other'}
];
export const DATA_BOOLEAN: Select[] = [
  {value: true, viewValue: 'Yes'},
  {value: false, viewValue: 'No'},
];

export const PROJECT_SOURCES: Select[] = [
  {value: 'Client Reference', viewValue: 'Client Reference'},
  {value: 'Facebook', viewValue: 'Facebook'},
  {value: 'Fiverr', viewValue: 'Fiverr'},
  {value: 'Linkedin', viewValue: 'Linkedin'},
  {value: 'Local Reference', viewValue: 'Local Reference'},
  {value: 'Website', viewValue: 'Website'},
];

export const FILE_TYPES: Select[] = [
  {value: FileTypes.IMAGE, viewValue: 'Image'},
  {value: FileTypes.VIDEO, viewValue: 'Video'},
  {value: FileTypes.PDF, viewValue: 'Pdf'}
];

export const REPORT_FILTER: Select[] = [
  // {value: 0, viewValue: 'Today'},
  {value: 1, viewValue: 'Last Day'},
  {value: 7, viewValue: 'Last 7 days'},
  {value: 15, viewValue: 'Last 15 days'},
  {value: 30, viewValue: 'Last 30 days'},
  {value: 60, viewValue: 'Last 60 days'},
  {value: 90, viewValue: 'Last 90 days'}
];

export const PRODUCT_STATUS: Select[] = [
  {value: 'draft', viewValue: 'Draft'},
  {value: 'publish', viewValue: 'Publish'},
];


export const EMI_MONTHS: Select[] = [
  {
    value: 3,
    viewValue: '3 Months'
  },
  {
    value: 6,
    viewValue: '6 Months'
  },
  {
    value: 12,
    viewValue: '12 Months'
  },
];

export const DISCOUNT_TYPES: Select[] = [
  {
    value: 1,
    viewValue: 'Percentage'
  },
  {
    value: 2,
    viewValue: 'Cash'
  },
];

export const AMOUNT_TYPES: Select[] = [
  {
    value: 1,
    viewValue: 'Percentage'
  },
  {
    value: 2,
    viewValue: 'Amount'
  },
];

export const CITIES = ['Barisal', 'Bhairab', 'Bogra', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Chowmuhani', 'Chuadanga', 'Comilla', 'Cox\'s Bazar', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gazipur', 'Jamalpur', 'Jessore', 'Jhenaidah', 'Kaliakair', 'Khulna', 'Kishoreganj', 'Kushtia', 'Maijdee', 'Manikganj', 'Mymensingh', 'Naogaon', 'Narayanganj', 'Narsingdi', 'Nawabganj', 'Pabna', 'Rajshahi', 'Rangpur', 'Saidpur', 'Satkhira', 'Savar', 'Siddhirganj', 'Sirajganj', 'Sreepur', 'Sylhet', 'Tangail', 'Tongi'];

export const PAYMENT_TYPES: Select[] = [
  { value: 'cash_on_delivery', viewValue: 'Cash On Delivery'},
  { value: 'bkash', viewValue: 'Bkash'},
  { value: 'rocket', viewValue: 'Rocket'},
  { value: 'nagad', viewValue: 'Nagad'},
  { value: 'credit_card', viewValue: 'Visa/Mastercard'},
];

export const  PAYMENT_STATUS: Select[] = [
  { value: 'unpaid', viewValue: 'Unpaid'},
  { value: 'paid', viewValue: 'Paid'},
];

export const ORDER_STATUS: Select[] = [
  { value: OrderStatus.PENDING, viewValue: 'Pending'},
  { value: OrderStatus.CONFIRM, viewValue: 'Confirm'},
  { value: OrderStatus.PROCESSING, viewValue: 'Processing'},
  { value: OrderStatus.SHIPPING, viewValue: 'Shipping'},
  { value: OrderStatus.DELIVERED, viewValue: 'Delivered'},
  { value: OrderStatus.CANCEL, viewValue: 'Cancel'},
  { value: OrderStatus.REFUND, viewValue: 'Refund'},
];

export const defaultUploadImage = '/assets/images/avatar/image-upload.jpg';
export const VARIATION_IMG_PLACEHOLDER = '/assets/images/placeholder/image-pick-placeholder.png';
export const PDF_MAKE_LOGO = 'https://api.ekrate.softlabit.com/api/upload/images/meekago.png';

