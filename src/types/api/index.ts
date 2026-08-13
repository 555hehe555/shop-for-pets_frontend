/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Cart {
  product: number;
  product_data: Product;
  /**
   * @format int64
   * @min 0
   * @max 9223372036854776000
   */
  quantity?: number;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface CartRequest {
  product: number;
  /**
   * @format int64
   * @min 0
   * @max 9223372036854776000
   */
  quantity?: number;
}

export interface CreateCustomUser {
  id: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string;
}

export interface CreateCustomUserRequest {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string;
}

export interface GetCustomUser {
  id: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Опис користувача
   * @maxLength 500
   */
  description?: string | null;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string;
  /** @format date-time */
  date_joined?: string;
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
  /** @format date-time */
  last_login?: string | null;
  /**
   * Active
   * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
   */
  is_active?: boolean;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /**
   * Superuser status
   * Designates that this user has all permissions without explicitly assigning them.
   */
  is_superuser?: boolean;
}

export interface GetMe {
  id: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /** @format date-time */
  date_joined?: string;
  /** @format date-time */
  last_login?: string | null;
  /**
   * Active
   * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
   */
  is_active?: boolean;
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
}

export interface PatchedCartPatchRequest {
  /**
   * @format int64
   * @min 0
   * @max 9223372036854776000
   */
  quantity?: number;
}

export interface PatchedProductImageRequest {
  /** @format binary */
  image?: File;
  /** @maxLength 255 */
  alt?: string;
  is_main?: boolean;
}

export interface PatchedProductRequest {
  /**
   * @minLength 1
   * @maxLength 70
   */
  title?: string;
  description?: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  price?: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  discount?: string;
  is_available?: boolean;
}

export interface PatchedUpdateCustomUserRequest {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username?: string;
  /**
   * Опис користувача
   * @minLength 1
   * @maxLength 500
   */
  description?: string | null;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string;
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
  /**
   * @minLength 1
   * @maxLength 128
   */
  password?: string;
}

export interface Product {
  id: number;
  /** @maxLength 70 */
  title: string;
  description?: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  price: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  discount: string;
  is_available?: boolean;
  images: ProductImage[];
}

export interface ProductImage {
  id: number;
  /** @format uri */
  image: string;
  /** @maxLength 255 */
  alt?: string;
  is_main?: boolean;
}

export interface ProductImageRequest {
  /** @format binary */
  image: File;
  /** @maxLength 255 */
  alt?: string;
  is_main?: boolean;
}

export interface ProductRequest {
  /**
   * @minLength 1
   * @maxLength 70
   */
  title: string;
  description?: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  price: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  discount: string;
  is_available?: boolean;
}

export interface TokenObtainPair {
  access: string;
  refresh: string;
}

export interface TokenObtainPairRequest {
  /** @minLength 1 */
  username: string;
  /** @minLength 1 */
  password: string;
}

export interface TokenRefresh {
  access: string;
}

export interface TokenRefreshRequest {
  /** @minLength 1 */
  refresh: string;
}

export interface UpdateCustomUser {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Опис користувача
   * @maxLength 500
   */
  description: string | null;
  /**
   * @format email
   * @maxLength 254
   */
  email: string;
  /** @maxLength 150 */
  first_name: string;
  /** @maxLength 150 */
  last_name: string;
}

export interface UpdateCustomUserRequest {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Опис користувача
   * @minLength 1
   * @maxLength 500
   */
  description: string | null;
  /**
   * @format email
   * @maxLength 254
   */
  email: string;
  /** @maxLength 150 */
  first_name: string;
  /** @maxLength 150 */
  last_name: string;
  /**
   * @minLength 1
   * @maxLength 128
   */
  password?: string;
}

export namespace Api {
  /**
   * @description Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
   * @tags api
   * @name ApiAccountsLoginCreate
   * @request POST:/api/accounts/login/
   * @secure
   */
  export namespace ApiAccountsLoginCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TokenObtainPairRequest;
    export type RequestHeaders = {};
    export type ResponseBody = TokenObtainPair;
  }

  /**
   * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
   * @tags api
   * @name ApiAccountsRefreshCreate
   * @request POST:/api/accounts/refresh/
   * @secure
   */
  export namespace ApiAccountsRefreshCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TokenRefreshRequest;
    export type RequestHeaders = {};
    export type ResponseBody = TokenRefresh;
  }

  /**
   * @description Returns a list of shopping cart items for the selected product.
   * @tags Carts
   * @name ApiCartList
   * @summary Get cart items
   * @request GET:/api/cart/
   * @secure
   */
  export namespace ApiCartList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Cart[];
  }

  /**
   * @description Creates a new cart item for the authenticated user.
   * @tags Carts
   * @name ApiCartCreate
   * @summary Add product to cart
   * @request POST:/api/cart/
   * @secure
   */
  export namespace ApiCartCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CartRequest;
    export type RequestHeaders = {};
    export type ResponseBody = Cart;
  }

  /**
   * @description Returns detailed information about a specific cart item.
   * @tags Carts
   * @name ApiCartRetrieve
   * @summary Retrieve cart item
   * @request GET:/api/cart/{product_id}
   * @secure
   */
  export namespace ApiCartRetrieve {
    export type RequestParams = {
      productId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Cart;
  }

  /**
   * @description Patch the selected item from the shopping cart.
   * @tags Carts
   * @name ApiCartPartialUpdate
   * @summary Patch cart item
   * @request PATCH:/api/cart/{product_id}
   * @secure
   */
  export namespace ApiCartPartialUpdate {
    export type RequestParams = {
      productId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = PatchedCartPatchRequest;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * @description Removes the selected item from the shopping cart.
   * @tags Carts
   * @name ApiCartDestroy
   * @summary Delete cart item
   * @request DELETE:/api/cart/{product_id}
   * @secure
   */
  export namespace ApiCartDestroy {
    export type RequestParams = {
      productId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * @description get all products
   * @tags Products
   * @name ApiProductsList
   * @request GET:/api/products/
   * @secure
   */
  export namespace ApiProductsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** A search term. */
      search?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Product[];
  }

  /**
   * @description create product
   * @tags Products
   * @name ApiProductsCreate
   * @request POST:/api/products/
   * @secure
   */
  export namespace ApiProductsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductRequest;
    export type RequestHeaders = {};
    export type ResponseBody = Product;
  }

  /**
   * @description get info about one product
   * @tags Products
   * @name ApiProductsRetrieve
   * @request GET:/api/products/{id}
   * @secure
   */
  export namespace ApiProductsRetrieve {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Product;
  }

  /**
   * @description Update product
   * @tags Products
   * @name ApiProductsUpdate
   * @request PUT:/api/products/{id}
   * @secure
   */
  export namespace ApiProductsUpdate {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = ProductRequest;
    export type RequestHeaders = {};
    export type ResponseBody = Product;
  }

  /**
   * @description Update product
   * @tags Products
   * @name ApiProductsPartialUpdate
   * @request PATCH:/api/products/{id}
   * @secure
   */
  export namespace ApiProductsPartialUpdate {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = PatchedProductRequest;
    export type RequestHeaders = {};
    export type ResponseBody = Product;
  }

  /**
   * @description Delete product
   * @tags Products
   * @name ApiProductsDestroy
   * @request DELETE:/api/products/{id}
   * @secure
   */
  export namespace ApiProductsDestroy {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {
      /** A search term. */
      search?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Product[];
  }

  /**
   * @description add image to product
   * @tags Product image
   * @name ApiProductsImagesCreate
   * @summary add image to product
   * @request POST:/api/products/{id}/images/
   * @secure
   */
  export namespace ApiProductsImagesCreate {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = ProductImageRequest;
    export type RequestHeaders = {};
    export type ResponseBody = ProductImage;
  }

  /**
   * @description patch image to product
   * @tags Product image
   * @name ApiProductsImagesPartialUpdate
   * @summary patch image to product
   * @request PATCH:/api/products/{id}/images/{image_id}/
   * @secure
   */
  export namespace ApiProductsImagesPartialUpdate {
    export type RequestParams = {
      id: number;
      imageId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = PatchedProductImageRequest;
    export type RequestHeaders = {};
    export type ResponseBody = ProductImage;
  }

  /**
   * @description delete image to product
   * @tags Product image
   * @name ApiProductsImagesDestroy
   * @summary delete image to product
   * @request DELETE:/api/products/{id}/images/{image_id}/
   * @secure
   */
  export namespace ApiProductsImagesDestroy {
    export type RequestParams = {
      id: number;
      imageId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ProductImage;
  }

  /**
   * @description Get paginated list of users.
   * @tags Users
   * @name ApiUsersList
   * @request GET:/api/users/
   * @secure
   */
  export namespace ApiUsersList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCustomUser[];
  }

  /**
   * @description Create user.
   * @tags Users
   * @name ApiUsersCreate
   * @request POST:/api/users/
   * @secure
   */
  export namespace ApiUsersCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCustomUserRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CreateCustomUser;
  }

  /**
   * @description Get user details by id.
   * @tags Users
   * @name ApiUsersRetrieve
   * @request GET:/api/users/{id}/
   * @secure
   */
  export namespace ApiUsersRetrieve {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCustomUser;
  }

  /**
   * @description Fully update user.
   * @tags Users
   * @name ApiUsersUpdate
   * @request PUT:/api/users/{id}/
   * @secure
   */
  export namespace ApiUsersUpdate {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateCustomUserRequest;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateCustomUser;
  }

  /**
   * @description Partially update user.
   * @tags Users
   * @name ApiUsersPartialUpdate
   * @request PATCH:/api/users/{id}/
   * @secure
   */
  export namespace ApiUsersPartialUpdate {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = PatchedUpdateCustomUserRequest;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateCustomUser;
  }

  /**
   * @description Delete user.
   * @tags Users
   * @name ApiUsersDestroy
   * @request DELETE:/api/users/{id}/
   * @secure
   */
  export namespace ApiUsersDestroy {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * @description Get current authenticated user.
   * @tags Users
   * @name ApiUsersMeRetrieve
   * @request GET:/api/users/me/
   * @secure
   */
  export namespace ApiUsersMeRetrieve {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMe;
  }
}
