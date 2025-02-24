import request from '../utils/request';
import {API_URL} from '../config';
import {stringify} from 'qs';

export const API = {
  async userRegister(payload) {
    const response = await request(`${API_URL}/api/users/register`, {
      method: 'POST',
      body: {...payload},
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },
  async userDetailsUpdate(payload, token) {
    const response = await request(`${API_URL}/api/users/details`, {
      method: 'POST',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });
    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },
  async sendOTP(token) {
    const response = await request(`${API_URL}/api/users/phone-verify`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });
    const result = {
      data: response.data,
      status: response.status,
      message:
        response.status === 'ERROR'
          ? response.error.error.message
            ? response.error.error.message
            : response.error.error.error
          : '',
    };
    return result;
  },
  async verifyOTP(payload, token) {
    const response = await request(`${API_URL}/api/users/phone-verify`, {
      method: 'POST',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },
  async userLogin(payload) {
    const response = await request(`${API_URL}/api/users/authenticate`, {
      method: 'POST',
      body: {
        ...payload,
      },
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },
  async getUserDetails(token) {
    const response = await request(`${API_URL}/api/users/details`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });
    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },

  async resetPasswordSendOTP(payload) {
    const response = await request(`${API_URL}/api/users/reset-password`, {
      method: 'POST',
      body: {...payload},
    });
    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },

  async resetPasswordConfirmOTP(payload) {
    const response = await request(`${API_URL}/api/users/reset-code-verify`, {
      method: 'POST',
      body: {...payload},
    });
    const result = {
      data: response.data ? response.data.api_token : null,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },

  async resetPassword(payload, token) {
    const response = await request(`${API_URL}/api/users/reset-password`, {
      method: 'PUT',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });
    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },

  async getAllQongfus() {
    const response = await request(`${API_URL}/api/qongfus`, {
      method: 'GET',
    });
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async updateUserDetails(payload, token, imageUpload) {
    let customHeader = {};
    imageUpload = imageUpload || false;
    if (imageUpload) {
      customHeader = {'Content-Type': 'multipart/form-data'};
    }
    const response = await request(
      `${API_URL}/api/users/details`,
      {
        method: 'POST',
        body: imageUpload ? payload : {...payload},
        headers: {Authorization: `Bearer ${token}`, ...customHeader},
      },
      imageUpload,
    );

    const result = {
      data: response.data,
      status: response.status,
      message: imageUpload
        ? ''
        : response.status === 'ERROR'
        ? response.error.error.message
        : '',
    };
    return result;
  },

  updateUserDetailsWithPhoto(token, data, uploadProgressCb) {
    return request(
      `${API_URL}/api/users/details`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgressCb,
      },
      true,
    );
  },

  async getAllLifestyles() {
    const response = await request(`${API_URL}/api/lifestyles`, {
      method: 'GET',
    });
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async getPlaces(payload) {
    const response = await request(
      `${API_URL}/api/places?${stringify(payload)}`,
      {
        method: 'GET',
      },
    );
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async getPlace({slug, ...payload}) {
    const response = await request(
      `${API_URL}/api/places/${slug}?${stringify(payload)}`,
      {
        method: 'GET',
      },
    );
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async savePlaceRating(payload, token) {
    const response = await request(`${API_URL}/api/places/ratings`, {
      method: 'POST',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },

  async userLogout(token) {
    const response = await request(`${API_URL}/api/users/logout`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async addMissingEntity(payload) {
    const response = await request(`${API_URL}/api/feedbacks`, {
      method: 'POST',
      body: {...payload},
    });
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async getAllLanguages() {
    const response = await request(`${API_URL}/api/languages`, {
      method: 'GET',
    });
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async getAllCountries() {
    const response = await request(`${API_URL}/api/countries`, {
      method: 'GET',
    });
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async changeUserPassword(payload, token) {
    const response = await request(`${API_URL}/api/users/password`, {
      method: 'PUT',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response.data,
      status: response.status,
      message:
        response.status === 'ERROR'
          ? response.error.error.message
            ? response.error.error.message
            : response.error.error.errors
          : '',
    };
    return result;
  },

  async searchPlaces(payload) {
    const response = await request(
      `${API_URL}/api/rocket-search?${stringify(payload)}`,
      {
        method: 'GET',
      },
    );
    const result = {
      data: response.data.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async fetchMapPlaces(queryParams) {
    const response = await request(
      `${API_URL}/api/places?${stringify(queryParams)}`,
      {
        method: 'GET',
      },
    );

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async getPlaceRating(slug, queryParams) {
    const response = await request(
      `${API_URL}/api/places/ratings/${slug}?${stringify(queryParams)}`,
      {
        method: 'GET',
      },
    );
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async searchSuggestions(payload) {
    const response = await request(
      `${API_URL}/api/suggestions/search?${stringify(payload)}`,
      {
        method: 'GET',
      },
    );
    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async getAllAmenities() {
    const response = await request(`${API_URL}/api/amenities`, {
      method: 'GET',
    });
    const result = {
      data: response.data,
      status: response.status,
    };
    return result;
  },

  async getAccountStatus(token) {
    const response = await request(`${API_URL}/api/users/account-status?`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  savePlaceMedias(token, data, uploadProgressCb) {
    return request(
      `${API_URL}/api/users/galleries`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgressCb,
      },
      true,
    );
  },

  updatePlaceMedia(id, token, data, uploadProgressCb) {
    return request(
      `${API_URL}/api/users/galleries/${id}`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgressCb,
      },
      true,
    );
  },

  async deactivateAccount(payload, token) {
    const response = await request(`${API_URL}/api/users/deactivate`, {
      method: 'POST',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async fetchPlaceMedias(payload, token) {
    const response = await request(
      `${API_URL}/api/users/galleries?${stringify(payload)}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },

  async getGlobalConfiguration(payload) {
    const response = await request(
      `${API_URL}/api/globals/configurations?${stringify(payload)}`,
      {
        method: 'GET',
        // headers: {Authorization: `Bearer ${token}`},
      },
    );

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };

    return result;
  },

  async deletePlaceMedia(payload, token) {
    const response = await request(
      `${API_URL}/api/users/galleries/${payload}`,
      {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },
  async updateDocumentsTitle(payload, token) {
    const response = await request(`${API_URL}/api/change-document-title`, {
      method: 'PUT',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async createUserPlace(payload, token) {
    const response = await request(`${API_URL}/api/users/places`, {
      method: 'POST',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async updatePlace(id, payload, token, imageUpload) {
    let customHeader = {};
    imageUpload = imageUpload || false;
    if (imageUpload) {
      customHeader = {'Content-Type': 'multipart/form-data'};
    }
    const response = await request(
      `${API_URL}/api/users/places/${id}`,
      {
        method: 'POST',
        body: imageUpload ? payload : {...payload},
        headers: {Authorization: `Bearer ${token}`, ...customHeader},
      },
      imageUpload,
    );

    const result = {
      data: response.data,
      status: response.status,
      message: imageUpload
        ? ''
        : response.status === 'ERROR'
        ? response.error.error.message
        : '',
    };
    return result;
  },

  updatePlaceWithMedia(id, token, data, uploadProgressCb) {
    return request(
      `${API_URL}/api/users/places/${id}`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgressCb,
      },
      true,
    );
  },

  async fetchUserPlaces(token) {
    const response = await request(`${API_URL}/api/users/places`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async getUserPlace(placeId, queryParams, token) {
    const response = await request(
      `${API_URL}/api/users/places/${placeId}?${stringify(queryParams)}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    const result = {
      data: response.data.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },
  createUserPlaceWithMedia(token, data, uploadProgressCb) {
    return request(
      `${API_URL}/api/users/places`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgressCb,
      },
      true,
    );
  },
  createClaimMedia(token, data, uploadProgressCb) {
    return request(
      `${API_URL}/api/places/claims`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgressCb,
      },
      true,
    );
  },
  async fetchUserClaims(token) {
    const response = await request(`${API_URL}/api/users/claims`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async reportAReview(payload, token) {
    const {id, type, notes} = payload;
    const response = await request(
      `${API_URL}/api/users/ratings/${id}/report`,
      {
        method: 'POST',
        body: {type, notes},
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async fetchReportedReviews(token) {
    const response = await request(`${API_URL}/api/users/reported-ratings`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  updateClaimMedia(id, token, data, uploadProgressCb) {
    return request(
      `${API_URL}/api/users/claims/${id}`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgressCb,
      },
      true,
    );
  },
  async deleteReportedReview(payload, token) {
    const response = await request(
      `${API_URL}/api/users/reported-ratings${stringify(payload)}`,
      {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.error.error.message : '',
    };
    return result;
  },

  async reportAPost(payload, token) {
    const response = await request(`${API_URL}/api/users/reports`, {
      method: 'POST',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async getMediaPost(payload, token) {
    const response = await request(
      `${API_URL}/api/users/galleries/${payload}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async searchUnclaimed(payload) {
    const response = await request(
      `${API_URL}/api/places?${stringify(payload)}`,
      {
        method: 'GET',
      },
    );
    const result = {
      data: response.data.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async updateMediaPosition(payload, token) {
    const response = await request(
      `${API_URL}/api/users/galleries/change-media-position/${payload.gallery_id}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },
  async deleteGalleryMedia(id, payload, token) {
    const response = await request(
      `${API_URL}/api/users/galleries/${id}/delete-media`,
      {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
        body: {ids: [...payload]},
      },
    );

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },
  async changePositionsGalleryMedia(id, payload, token) {
    const response = await request(
      `${API_URL}/api/users/galleries/change-media-position/${id}`,
      {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
        body: [...payload],
      },
    );

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async createCalenderSchedule(placeId, payload, token) {
    const response = await request(
      `${API_URL}/api/users/places/${placeId}/calendars`,
      {
        method: 'POST',
        body: {...payload},
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async updateCalenderSchedule(id, placeId, payload, token) {
    const response = await request(
      `${API_URL}/api/users/places/${placeId}/calendars/${id}`,
      {
        method: 'PUT',
        body: {...payload},
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },
  async deleteCalenderSchedule(id, placeId, token) {
    const response = await request(
      `${API_URL}/api/users/places/${placeId}/calendars/${id}`,
      {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async fetchContactStatus(payload, token) {
    const response = await request(
      `${API_URL}/api/users/check-invited-contacts`,
      {
        method: 'POST',
        body: {...payload},
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async sendInvitation(payload, token) {
    const response = await request(`${API_URL}/api/users/send-invitations`, {
      method: 'POST',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });
    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async fetchFriends(queryParams, token) {
    const response = await request(
      `${API_URL}/api/users/friends?${stringify(queryParams)}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async createFriend(payload, token) {
    const response = await request(`${API_URL}/api/users/friends`, {
      method: 'POST',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async updateFriend(payload, token) {
    const response = await request(
      `${API_URL}/api/users/friends/${payload.id}`,
      {
        method: 'PUT',
        body: {...payload},
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async getFriend(payload, token) {
    const response = await request(
      `${API_URL}/api/users/friends/${payload.id}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async deleteFriend(payload, token) {
    const response = await request(
      `${API_URL}/api/users/friends/${payload.id}`,
      {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    const result = {
      data: response,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },
  async createUserBioMetrics(payload, token) {
    const response = await request(`${API_URL}/api/users/details/biometrics`, {
      method: 'POST',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async updateUserBioMetrics(payload, token) {
    const response = await request(`${API_URL}/api/users/details/biometrics`, {
      method: 'PUT',
      body: {...payload},
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async getUserBiometrics(queryParams, token) {
    const response = await request(`${API_URL}/api/users/details/biometrics`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });

    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },

  async fetchSessions(queryParams, token) {
    const response = await request(
      `${API_URL}/api/users/sessions?${stringify(queryParams)}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    const result = {
      data: response.data,
      status: response.status,
      message: response.status === 'ERROR' ? response.data.message : '',
    };
    return result;
  },
};
