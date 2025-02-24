import {
  FETCH_CONTACT_STATUS,
  FETCH_CONTACT_STATUS_RECEIVE,
  FETCH_CONTACT_STATUS_ERROR,
  SEND_INVITATION,
  SEND_INVITATION_RECEIVE,
  SEND_INVITATION_ERROR,
  RESET_INVITATION_FLAG,
  FETCH_FRIENDS,
  FETCH_FRIENDS_RECEIVE,
  FETCH_FRIENDS_ERROR,
  CREATE_FRIEND,
  CREATE_FRIEND_RECEIVE,
  CREATE_FRIEND_ERROR,
  UPDATE_FRIEND,
  UPDATE_FRIEND_RECEIVE,
  UPDATE_FRIEND_ERROR,
  RESET_REQUEST_ACCEPTED_FLAG,
  GET_FRIEND,
  GET_FRIEND_RECEIVE,
  GET_FRIEND_ERROR,
  DELETE_FRIEND,
  DELETE_FRIEND_RECEIVE,
  DELETE_FRIEND_ERROR,
  RESET_DELETE_FLAG,
  SAVE_LOCAL_CONTACTS,
} from '../actionTypes';

export const fetchContactStatus = (payload, token) => {
  return {type: FETCH_CONTACT_STATUS, payload, token};
};

export const fetchContactStatusReceive = payload => {
  return {type: FETCH_CONTACT_STATUS_RECEIVE, payload};
};

export const fetchContactStatusError = error => {
  return {type: FETCH_CONTACT_STATUS_ERROR, error};
};

export const sendInvitation = (payload, token) => {
  return {type: SEND_INVITATION, payload, token};
};

export const sendInvitationReceive = () => {
  return {type: SEND_INVITATION_RECEIVE};
};

export const sendInvitationError = error => {
  return {type: SEND_INVITATION_ERROR, error};
};

export const resetInvitationFlag = () => {
  return {type: RESET_INVITATION_FLAG};
};

export const fetchFriends = (payload, pagination, token) => {
  return {type: FETCH_FRIENDS, payload, pagination, token};
};

export const fetchFriendsReceive = payload => {
  return {type: FETCH_FRIENDS_RECEIVE, payload};
};

export const fetchFriendsError = error => {
  return {type: FETCH_FRIENDS_ERROR, error};
};

export const createFriend = (payload, token) => {
  return {type: CREATE_FRIEND, payload, token};
};

export const createFriendReceive = payload => {
  return {type: CREATE_FRIEND_RECEIVE, payload};
};

export const createFriendError = error => {
  return {type: CREATE_FRIEND_ERROR, error};
};

export const updateFriend = (payload, token) => {
  return {type: UPDATE_FRIEND, payload, token};
};

export const updateFriendReceive = payload => {
  return {type: UPDATE_FRIEND_RECEIVE, payload};
};

export const updateFriendError = error => {
  return {type: UPDATE_FRIEND_ERROR, error};
};

export const resetRequestAcceptedFlag = () => {
  return {type: RESET_REQUEST_ACCEPTED_FLAG};
};

export const getFriend = (payload, token) => {
  return {type: GET_FRIEND, payload, token};
};

export const getFriendReceive = payload => {
  return {type: GET_FRIEND_RECEIVE, payload};
};

export const getFriendError = error => {
  return {type: GET_FRIEND_ERROR, error};
};

export const deleteFriend = (payload, token) => {
  return {type: DELETE_FRIEND, payload, token};
};

export const deleteFriendReceive = () => {
  return {type: DELETE_FRIEND_RECEIVE};
};

export const deleteFriendError = error => {
  return {type: DELETE_FRIEND_ERROR, error};
};

export const resetDeleteFlag = () => {
  return {type: RESET_DELETE_FLAG};
};

export const saveLocalContacts = payload => {
  return {type: SAVE_LOCAL_CONTACTS, payload};
};
