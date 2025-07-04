export interface RouteGroup {
  all: (pages?: number, limit?: number) => string;
  allFormatted?: (pages?: number, limit?: number) => string;
  byId?: (id: string | number) => string;
  byIdFormatted?: (id: string | number) => string;
  create?: () => string;
  update?: (id: string | number) => string;
  remove?: (id: string | number) => string;
}

export interface RouteObject {
  businessPartner: RouteGroup;
  paymentRequest: RouteGroup;
  chartOfAccount: RouteGroup;
  bank: {
    all: () => string;
  };
  purchaseInvoice: {
    all: (pages?: number, limit?: number) => string;
    byCardCode: (cardCode: string | number) => string;
  };
  root: {
    hello: () => string;
  };
}


const route: RouteObject = {
  businessPartner: {
    all: (pages = 1, limit = 20, keyword = "") => `/api/v1/business-partners-formatted?pages=${pages}&limit=${limit}${keyword ? `&keyword=${keyword}` : ""}`,
    allFormatted: (pages = 1, limit = 20) => `/api/v1/business-partners-formatted?pages=${pages}&limit=${limit}`,
    byId: (id) => `/api/v1/business-partners/${id}`,
    byIdFormatted: (id) => `/api/v1/business-partners-formatted/${id}`,
  },
  paymentRequest: {
    all: (pages = 1, limit = 20) => `/api/v1/payment-request?pages=${pages}&limit=${limit}`,
    byId: (id) => `/api/v1/payment-request/${id}`,
    create: () => `/api/v1/payment-request`,
    update: (id) => `/api/v1/payment-request/${id}`,
    remove: (id) => `/api/v1/payment-request/${id}`,
  },
  chartOfAccount: {
    all: (pages = 1, limit = 20) => `/api/v1/chart-of-account?pages=${pages}&limit=${limit}`,
    allFormatted: (pages = 1, limit = 20) => `/api/v1/chart-of-account-formatted?pages=${pages}&limit=${limit}`,
    byId: (id) => `/api/v1/chart-of-account/${id}`,
    byIdFormatted: (id) => `/api/v1/chart-of-account-formatted/${id}`,
  },
  bank: {
    all: () => `/api/v1/bank`
  },
  purchaseInvoice: {
    all: (pages = 1, limit = 20) => `/api/v1/purchase-invoice?pages=${pages}&limit=${limit}`,
    byCardCode: (cardCode) => `/api/v1/purchase-invoice/${cardCode}`
  },
  root: {
    hello: () => `/`
  }
};

export default route;
