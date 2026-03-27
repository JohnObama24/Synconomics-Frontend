import { ref } from 'vue';
import { businessService } from '../services/business.service';
import { supplyRequestService, supplyOfferService, supplyMatchService } from '../services/supply.service';
import type { Business } from '../types/business.types';
import type {
  SupplyRequest, CreateSupplyRequestReq, UpdateSupplyRequestReq,
  SupplyOffer, CreateSupplyOfferReq, UpdateSupplyOfferReq,
  SupplyMatch, CreateSupplyMatchReq, UpdateSupplyMatchStatusReq
} from '../types/supply.types';

export const useSupplyNetwork = () => {
  // Existing state
  const businesses = ref<Business[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Supply state
  const supplyRequests = ref<SupplyRequest[]>([]);
  const supplyOffers = ref<SupplyOffer[]>([]);
  const supplyMatches = ref<SupplyMatch[]>([]);
  const isLoadingSupply = ref(false);
  const supplyError = ref<string | null>(null);

  // ── Businesses ──
  const fetchPublicBusinesses = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await businessService.getAllPublic();
      businesses.value = response.data;
    } catch (err: any) {
      error.value = err.message || err.data?.message || 'Gagal memuat data network bisnis.';
    } finally {
      isLoading.value = false;
    }
  };

  // ── Supply Requests ──
  const fetchSupplyRequests = async (businessId?: number) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      const response = businessId
        ? await supplyRequestService.getByBusiness(businessId)
        : await supplyRequestService.getAll();
      supplyRequests.value = response.data;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal memuat supply requests.';
    } finally {
      isLoadingSupply.value = false;
    }
  };

  const createSupplyRequest = async (payload: CreateSupplyRequestReq) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      await supplyRequestService.create(payload);
      return true;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal membuat supply request.';
      return false;
    } finally {
      isLoadingSupply.value = false;
    }
  };

  const updateSupplyRequest = async (id: number, payload: UpdateSupplyRequestReq) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      await supplyRequestService.update(id, payload);
      return true;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal memperbarui supply request.';
      return false;
    } finally {
      isLoadingSupply.value = false;
    }
  };

  const deleteSupplyRequest = async (id: number) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      await supplyRequestService.delete(id);
      supplyRequests.value = supplyRequests.value.filter(r => r.id !== id);
      return true;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal menghapus supply request.';
      return false;
    } finally {
      isLoadingSupply.value = false;
    }
  };

  // ── Supply Offers ──
  const fetchSupplyOffers = async (businessId?: number) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      const response = businessId
        ? await supplyOfferService.getByBusiness(businessId)
        : await supplyOfferService.getAll();
      supplyOffers.value = response.data;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal memuat supply offers.';
    } finally {
      isLoadingSupply.value = false;
    }
  };

  const createSupplyOffer = async (payload: CreateSupplyOfferReq) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      await supplyOfferService.create(payload);
      return true;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal membuat supply offer.';
      return false;
    } finally {
      isLoadingSupply.value = false;
    }
  };

  const updateSupplyOffer = async (id: number, payload: UpdateSupplyOfferReq) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      await supplyOfferService.update(id, payload);
      return true;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal memperbarui supply offer.';
      return false;
    } finally {
      isLoadingSupply.value = false;
    }
  };

  const deleteSupplyOffer = async (id: number) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      await supplyOfferService.delete(id);
      supplyOffers.value = supplyOffers.value.filter(o => o.id !== id);
      return true;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal menghapus supply offer.';
      return false;
    } finally {
      isLoadingSupply.value = false;
    }
  };

  // ── Supply Matches ──
  const fetchSupplyMatches = async () => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      const response = await supplyMatchService.getAll();
      supplyMatches.value = response.data;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal memuat supply matches.';
    } finally {
      isLoadingSupply.value = false;
    }
  };

  const createSupplyMatch = async (payload: CreateSupplyMatchReq) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      await supplyMatchService.create(payload);
      return true;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal membuat supply match.';
      return false;
    } finally {
      isLoadingSupply.value = false;
    }
  };

  const updateMatchStatus = async (id: number, payload: UpdateSupplyMatchStatusReq) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      await supplyMatchService.updateStatus(id, payload);
      // Update local state
      const idx = supplyMatches.value.findIndex(m => m.id === id);
      const match = supplyMatches.value[idx];
      if (idx !== -1 && match) {
        match.status = payload.status;
      }
      return true;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal memperbarui status match.';
      return false;
    } finally {
      isLoadingSupply.value = false;
    }
  };

  const deleteSupplyMatch = async (id: number) => {
    isLoadingSupply.value = true;
    supplyError.value = null;
    try {
      await supplyMatchService.delete(id);
      supplyMatches.value = supplyMatches.value.filter(m => m.id !== id);
      return true;
    } catch (err: any) {
      supplyError.value = err.message || err.data?.message || 'Gagal menghapus supply match.';
      return false;
    } finally {
      isLoadingSupply.value = false;
    }
  };

  return {
    // Businesses
    businesses,
    isLoading,
    error,
    fetchPublicBusinesses,

    // Supply shared state
    isLoadingSupply,
    supplyError,

    // Supply Requests
    supplyRequests,
    fetchSupplyRequests,
    createSupplyRequest,
    updateSupplyRequest,
    deleteSupplyRequest,

    // Supply Offers
    supplyOffers,
    fetchSupplyOffers,
    createSupplyOffer,
    updateSupplyOffer,
    deleteSupplyOffer,

    // Supply Matches
    supplyMatches,
    fetchSupplyMatches,
    createSupplyMatch,
    updateMatchStatus,
    deleteSupplyMatch
  };
};
