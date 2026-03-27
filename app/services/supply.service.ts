import { apiFetch } from './api';
import type { ApiResponse } from '../types/api.types';
import type {
  SupplyRequest, CreateSupplyRequestReq, UpdateSupplyRequestReq,
  SupplyOffer, CreateSupplyOfferReq, UpdateSupplyOfferReq,
  SupplyMatch, CreateSupplyMatchReq, UpdateSupplyMatchStatusReq
} from '../types/supply.types';

export const supplyRequestService = {
  getAll(): Promise<ApiResponse<SupplyRequest[]>> {
    return apiFetch('/supply-requests', { method: 'GET' });
  },

  getById(id: number): Promise<ApiResponse<SupplyRequest>> {
    return apiFetch(`/supply-requests/${id}`, { method: 'GET' });
  },

  getByBusiness(businessId: number): Promise<ApiResponse<SupplyRequest[]>> {
    return apiFetch(`/supply-requests/business/${businessId}`, { method: 'GET' });
  },

  create(payload: CreateSupplyRequestReq): Promise<ApiResponse<SupplyRequest>> {
    return apiFetch('/supply-requests', { method: 'POST', body: payload });
  },

  update(id: number, payload: UpdateSupplyRequestReq): Promise<ApiResponse<SupplyRequest>> {
    return apiFetch(`/supply-requests/${id}`, { method: 'PUT', body: payload });
  },

  delete(id: number): Promise<ApiResponse<null>> {
    return apiFetch(`/supply-requests/${id}`, { method: 'DELETE' });
  }
};

export const supplyOfferService = {
  getAll(): Promise<ApiResponse<SupplyOffer[]>> {
    return apiFetch('/supply-offers', { method: 'GET' });
  },

  getById(id: number): Promise<ApiResponse<SupplyOffer>> {
    return apiFetch(`/supply-offers/${id}`, { method: 'GET' });
  },

  getByBusiness(businessId: number): Promise<ApiResponse<SupplyOffer[]>> {
    return apiFetch(`/supply-offers/business/${businessId}`, { method: 'GET' });
  },

  create(payload: CreateSupplyOfferReq): Promise<ApiResponse<SupplyOffer>> {
    return apiFetch('/supply-offers', { method: 'POST', body: payload });
  },

  update(id: number, payload: UpdateSupplyOfferReq): Promise<ApiResponse<SupplyOffer>> {
    return apiFetch(`/supply-offers/${id}`, { method: 'PUT', body: payload });
  },

  delete(id: number): Promise<ApiResponse<null>> {
    return apiFetch(`/supply-offers/${id}`, { method: 'DELETE' });
  }
};

export const supplyMatchService = {
  getAll(): Promise<ApiResponse<SupplyMatch[]>> {
    return apiFetch('/supply-matches', { method: 'GET' });
  },

  getById(id: number): Promise<ApiResponse<SupplyMatch>> {
    return apiFetch(`/supply-matches/${id}`, { method: 'GET' });
  },

  create(payload: CreateSupplyMatchReq): Promise<ApiResponse<SupplyMatch>> {
    return apiFetch('/supply-matches', { method: 'POST', body: payload });
  },

  updateStatus(id: number, payload: UpdateSupplyMatchStatusReq): Promise<ApiResponse<SupplyMatch>> {
    return apiFetch(`/supply-matches/${id}/status`, { method: 'PATCH', body: payload });
  },

  delete(id: number): Promise<ApiResponse<null>> {
    return apiFetch(`/supply-matches/${id}`, { method: 'DELETE' });
  }
};
