'use strict'

const config = require('../config.js')
const store = require('../store.js')

const requestIndex = function () {
  return $.ajax({
    url: config.apiUrl + '/bookmarks',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const requestCreate = function (data) {
  return $.ajax({
    url: config.apiUrl + '/bookmarks',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const requestUpdate = function (data, id) {
  return $.ajax({
    url: config.apiUrl + '/bookmarks/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const requestDelete = function (id) {
  // console.log('store in signOut', store)
  // console.log(config.apiUrl)
  return $.ajax({
    url: config.apiUrl + '/bookmarks/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

// folder ajax calls api
const requestFoldersIndex = function () {
  return $.ajax({
    url: config.apiUrl + '/folders',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}
const requestFolderCreate = function (data) {
  return $.ajax({
    url: config.apiUrl + '/folders',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const requestFolderUpdate = function (data, id) {
  return $.ajax({
    url: config.apiUrl + '/folders/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const requestFolderDelete = function (id) {
  return $.ajax({
    url: config.apiUrl + '/folders/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  requestIndex,
  requestCreate,
  requestUpdate,
  requestDelete,
  requestFoldersIndex,
  requestFolderCreate,
  requestFolderUpdate,
  requestFolderDelete
}
