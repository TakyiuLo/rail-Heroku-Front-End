'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onGetAllBookmarks = () => {
  api.requestIndex()
    .then(ui.requestIndexSuccess)
    .catch(ui.requestIndexFail)
}

const onCreatePrompt = () => {
  // Create an id for the specify EditBookmarkHtml
  const id = 'empty_form_id_' + ++store.emptyBookmarkNumber
  // for folder-bookmarks
  const folderId = parseInt($('#newFolderForm').attr('data-id'), 10)
  ui.addBookmarkPrompt(id, folderId)
}

const onCreateBookmark = (event) => {
  event.preventDefault()
  // console.log($(event.target).find('button').attr('name'))
  const target = $(event.target).find('button')
  if (target.attr('value') === 'create') {
    const data = getFormFields(event.target)

    // add folder_id from here rather than in handlebars because request with
    // handlebars template doesn't work
    const folderId = parseInt($(event.target).attr('data-folder-id'))
    // console.log('folderId ', folderId)
    if (folderId) {
      data.bookmark.folder_id = folderId
    }
    // console.log('create data:', data)
    api.requestCreate(data)
      .then((response) => {
        ui.requestCreateSuccess(response, event.target.id)
        return response
      })
      .catch(ui.requestCreateFail)
  }
}

const onRemovePrompt = (event) => {
  if ($(event.target).val() === 'remove') {
    ui.removePrompt($(event.target).closest('form.remove-btn')[0])
  }
}

const onRemoveBookmark = (event) => {
  event.preventDefault()
  // console.log('removing this bookmark')
  // console.log($('#removeModal').find('a').attr('data-id'))
  const id = $('#removeModal').find('a').attr('data-id')

  api.requestDelete(id)
    .then((response) => {
      ui.requestDeleteSuccess(response, id)
      return response
    })
    .catch(ui.requestDeleteFail)
}

const onEditBookmark = (event) => {
  ui.editBookmark($(event.target).closest('.bookmark')[0])
  // console.log($(event.target).closest('.bookmark')[0])
}

const onSaveBookmark = (event) => {
  event.preventDefault()
  const target = $(event.target).find('button')
  if (target.attr('value') === 'save') {
    const data = getFormFields(event.target)
    // console.log('save data:', data)
    api.requestUpdate(data, event.target.id)
      .then((response) => {
        ui.requestUpdateSuccess(response, event.target.id)
        return response
      })
      .catch(ui.requestUpdateFail)
  }
}

// Folders handlers
const onGetAll = (event) => {
  onGetAllBookmarks(event)
  onGetAllFolders(event)
}
const requestFolderIndexSuccess = (response) => {
  store.folders = JSON.parse(JSON.stringify(response.folders))
  return response
}
const onGetAllFolders = (event) => {
  api.requestFoldersIndex()
    .then(requestFolderIndexSuccess)
    .then(ui.requestFoldersIndexSuccess)
    .catch(ui.requestFoldersIndexFail)
}
const appendSubFoldersBookmarks = (event) => {
  // console.log('who:', $(event.target))
  const exceptions = ['btn', 'oi']
  // prevent to append to both sub and root folder
  if (!exceptions.some(exception => $(event.target).hasClass(exception))) {
    // get parent id
    const folderId = parseInt($(event.target).closest('.folder').attr('data-id'), 10)
    // append folders
    ui.appendSubFolders(folderId)
    // append bookmarks
    ui.appendBookmarksToFolder(folderId)
  }
  // console.log('store.folders: ', store.folders)
  // console.log('store.bookmarks: ', store.bookmarks)
}
const onCreateFolderPrompt = (event) => {
  // console.log('ok we are here')
  const id = $(event.target).closest('.folder').attr('data-id')
  ui.newFolderPrompt(id)
}
const onCreateFolder = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)

  const folderId = parseInt($(event.target).attr('data-id'))
  // console.log('folderId ', folderId)
  if (folderId) {
    // when folder is appending to non root folder
    data.folder.folder_id = folderId
  }

  // console.log(data)
  api.requestFolderCreate(data)
    .then(ui.requestFolderCreateSuccess)
    .catch(ui.requestFolderCreateFail)
}
const onDeleteFolderPrompt = (event) => {
  const id = parseInt($(event.target).closest('.folder').attr('data-id'), 10)
  ui.deleteFolderPrompt(id)
}
const onRemoveFolder = (event) => {
  event.preventDefault()
  const id = $('#removeFolderModal').attr('data-id')
  api.requestFolderDelete(id)
    .then((response) => {
      ui.requestFolderDeleteSuccess(response, id)
      return response
    })
    .catch(ui.requestFolderDeleteFail)
}
const onEditFolderPrompt = (event) => {
  const id = parseInt($(event.target).closest('.folder').attr('data-id'), 10)
  const name = $('#folder-name-' + id).text()
  ui.editFolderPrompt(id, name)
}
const onUpdateFolder = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const id = parseInt($('#editFolderModal').attr('data-id'), 10)
  api.requestFolderUpdate(data, id)
    .then((response) => {
      ui.requestUpdateFolderSuccess(response, id)
      return response
    })
    .catch(ui.requestUpdateFolderFail)
}
const onCreateRootBookmark = (event) => {
  ui.onCreateRootBookmark()
}
const onCreateRootFolder = (event) => {
  ui.onCreateRootFolder()
}

const addHandlers = function () {
  // get all Bookmarks
  store.loadBookmarks = onGetAllBookmarks
  store.loadFolders = onGetAllFolders
  store.emptyBookmarkNumber = 0
  // bookmark handlers
  // $('.add-bookmark-btn').on('click', onCreatePrompt)
  // $('#newBookmarkModal').on('submit', '.create-btn', onCreateBookmark)
  // $('.bookmarks').on('click', '.remove-btn', onRemovePrompt)
  // $('#removeModal .btn-primary').on('click', onRemoveBookmark)
  // $('.bookmarks').on('click', '.edit-btn', onEditBookmark)
  // $('.bookmarks').on('submit', '.save-btn', onSaveBookmark)
  // folder handlers
  $('#get-folders').on('click', onGetAll)
  $('.all-folders').on('click', '.folder-header', appendSubFoldersBookmarks)
  $('.all-folders').on('click', '.add-folder-btn', onCreateFolderPrompt)
  $('#newFolderForm').on('submit', onCreateFolder)
  $('.all-folders').on('click', '.remove-folder-btn', onDeleteFolderPrompt)
  $('#removeFolderModal .btn-primary').on('click', onRemoveFolder)
  $('.all-folders').on('click', '.edit-folder-btn', onEditFolderPrompt)
  $('#editFolderForm').on('submit', onUpdateFolder)
  // folder-bookmarks handlers
  $('.add-bookmark-btn').on('click', onCreatePrompt)
  $('#newBookmarkModal').on('submit', '.create-btn', onCreateBookmark)
  $('.all-folders').on('click', '.remove-btn', onRemovePrompt)
  $('#removeModal .btn-primary').on('click', onRemoveBookmark)
  $('.all-folders').on('click', '.edit-btn', onEditBookmark)
  $('.all-folders').on('submit', '.save-btn', onSaveBookmark)
  $('.add-root-bookmark-btn').on('click', onCreateRootBookmark)
  $('.add-root-folder-btn').on('click', onCreateRootFolder)
}

module.exports = {
  addHandlers
}
