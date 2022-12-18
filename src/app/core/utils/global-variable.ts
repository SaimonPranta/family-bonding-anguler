import {environment} from '../../../environments/environment';

export const DATABASE_KEY = Object.freeze({
  loginToken: 'ESQUIRE_TOKEN_' + environment.VERSION,
  loggInSession: 'ESQUIRE_SESSION_' + environment.VERSION,
  loginTokenAdmin: 'ESQUIRE_ADMIN_TOKEN_' + environment.VERSION,
  loggInSessionAdmin: 'ESQUIRE_ADMIN_SESSION_' + environment.VERSION,
  encryptAdminLogin: 'ESQUIRE_USER_0_' + environment.VERSION,
  encryptUserLogin: 'ESQUIRE_USER_1_' + environment.VERSION,
  loginAdminRole: 'ESQUIRE_ADMIN_ROLE_' + environment.VERSION,
  cartsProduct: 'ESQUIRE_USER_CART_' + environment.VERSION,
  productFormData: 'ESQUIRE_PRODUCT_FORM_' + environment.VERSION,
  userCart: 'ESQUIRE_USER_CART_' + environment.VERSION,
  recommendedProduct: 'ESQUIRE_RECOMMENDED_PRODUCT_' + environment.VERSION,
  userCoupon: 'ESQUIRE_USER_COUPON_' + environment.VERSION,
  userCookieTerm: 'ESQUIRE_COOKIE_TERM' + environment.VERSION,
});
