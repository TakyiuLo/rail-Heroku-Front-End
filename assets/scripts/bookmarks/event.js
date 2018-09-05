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
  ui.addBookmarkPrompt(id)
}

const onCreateBookmark = (event) => {
  event.preventDefault()
  // console.log($(event.target).find('button').attr('name'))
  const target = $(event.target).find('button')
  if (target.attr('value') === 'create') {
    const data = getFormFields(event.target)
    console.log('create data:', data)
    api.requestCreate(data)
      .then((response) => {
        ui.requestCreateSuccess(response, event.target.id)
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
    })
    .catch(ui.requestDeleteFail)
}

const onEditBookmark = (event) => {
  ui.editBookmark($(event.target).closest('.bookmark')[0])
}

const onSaveBookmark = (event) => {
  event.preventDefault()
  const target = $(event.target).find('button')
  if (target.attr('value') === 'save') {
    const data = getFormFields(event.target)
    console.log('save data:', data)
    api.requestUpdate(data, event.target.id)
      .then((response) => {
        ui.requestUpdateSuccess(response, event.target.id)
      })
      .catch(ui.requestUpdateFail)
  }
}

// Folders handlers
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
const appendSubFolders = (event) => {
  // const exceptions = ['btn', 'oi']
  // // not going to expend for buttons, or span icons
  // if (!exceptions.some((exception) => {
  //   return $(event.target).hasClass(exception)
  // })) {}

  // append folders
  // const id = parseInt($(event.target).closest('.folder')[0].id.substring(7), 10)
  const id = parseInt($(event.target).closest('.folder').attr('data-id'), 10)
  // console.log(id)
  ui.appendSubFolders(id)
}
const onCreateFolderPrompt = (event) => {
  const id = parseInt($(event.target).closest('.folder').attr('data-id'), 10)
  ui.newFolderPrompt(id)
}
const onCreateFolder = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)

  data.folder.folder_id = parseInt($(event.target).attr('data-id'))
  console.log(data)
  api.requestFolderCreate(data)
    .then(ui.requestFolderCreateSuccess)
    .catch(ui.requestFolderCreateFail)
}
const onDeleteFolderPrompt = (event) => {
  const id = parseInt($(event.target).closest('.folder').attr('data-id'), 10)
  ui.deleteFolderPrompt(id)
}
const onRemoveFolder = (event) => {
  const id = $('#removeFolderModal').attr('data-id')
  api.requestFolderDelete(id)
    .then((response) => {
      ui.requestFolderDeleteSuccess(response, id)
    })
    .catch(ui.requestFolderDeleteFail)
}

const addHandlers = function () {
  // get all Bookmarks
  store.loadBookmarks = onGetAllBookmarks
  store.emptyBookmarkNumber = 0
  // bookmark handlers
  $('.add-bookmark-btn').on('click', onCreatePrompt)
  $('#newBookmarkModal').on('submit', '.create-btn', onCreateBookmark)
  $('.bookmarks').on('click', '.remove-btn', onRemovePrompt)
  $('#removeModal .btn-primary').on('click', onRemoveBookmark)
  $('.bookmarks').on('click', '.edit-btn', onEditBookmark)
  $('.bookmarks').on('submit', '.save-btn', onSaveBookmark)
  // folder handlers
  $('#get-folders').on('click', onGetAllFolders)
  $('.all-folders').on('click', '.folder-header', appendSubFolders)
  $('.all-folders').on('click', '.add-folder-btn', onCreateFolderPrompt)
  $('#newFolderForm').on('submit', onCreateFolder)
  $('.all-folders').on('click', '.remove-folder-btn', onDeleteFolderPrompt)
  $('#removeFolderModal .btn-primary').on('click', onRemoveFolder)
}

module.exports = {
  addHandlers
}
