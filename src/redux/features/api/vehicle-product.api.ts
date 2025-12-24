import { baseApi } from "@/redux/baseApi";

export interface VehicleProduct {
  _id: string;
  title: string;
  images: string[];
  description: string;
  price: number;
  rating?: number;
  reviews?: number;
  status: string;
  type: string;
  brand: string;
  category: string;
  sku: string;
  warranty: string;
  specifications: Record<string, string>;
  features: string[];
}

export interface VehicleProductsResponse {
  success: boolean;
  message: string;
  data: VehicleProduct[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface VehicleProductResponse {
  success: boolean;
  message: string;
  data: VehicleProduct;
}

export interface VehicleProductQueryParams {
  category?: 'CAR' | 'BIKE';
  search?: string;
  status?: string;
  brand?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export const vehicleProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicleProducts: builder.query<VehicleProductsResponse, VehicleProductQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        
        if (params.category) queryParams.append('category', params.category);
        if (params.search) queryParams.append('search', params.search);
        if (params.status) queryParams.append('status', params.status);
        if (params.brand) queryParams.append('brand', params.brand);
        if (params.type) queryParams.append('type', params.type);
        if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
        if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());

        return {
          url: `/vehicle-products?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['VEHICLE_PRODUCTS'],
    }),
    
    getVehicleProductById: builder.query<VehicleProductResponse, string>({
      query: (id) => ({
        url: `/vehicle-products/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'VEHICLE_PRODUCT', id }],
    }),
  }),
});

export const {
  useGetVehicleProductsQuery,
  useGetVehicleProductByIdQuery,
} = vehicleProductApi;
