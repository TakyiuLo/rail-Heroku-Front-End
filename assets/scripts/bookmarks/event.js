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

const addEmptyBookmark = () => {
  // Create an id for the specify EditBookmarkHtml
  const id = 'empty_form_id_' + ++store.emptyBookmarkNumber
  ui.addBookmark(id)
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
  ui.removePrompt($(event.target).parent()[0])
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
  ui.editBookmark($(event.target).parent()[0])
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

const addHandlers = function () {
  // get all Bookmarks
  store.loadBookmarks = onGetAllBookmarks
  store.emptyBookmarkNumber = 0
  $('.add-bookmark-btn').on('click', addEmptyBookmark)
  $('.bookmarks').on('submit', '.create-btn', onCreateBookmark)
  $('.bookmarks').on('click', '.remove-btn', onRemovePrompt)
  $('.modal-footer .btn-primary').on('click', onRemoveBookmark)
  $('.bookmarks').on('click', '.edit-btn', onEditBookmark)
  $('.bookmarks').on('submit', '.save-btn', onSaveBookmark)
}

module.exports = {
  addHandlers
}
