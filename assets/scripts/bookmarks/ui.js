'use strict'

const showBookmarksTemplate = require('../templates/bookmarks-template.handlebars')
const bookmarkTemplate = require('../templates/bookmark-template.handlebars')
const EditbookmarkTemplate = require('../templates/edit-bookmark-template.handlebars')
const bookmarkTitleTemplate = require('../templates/bookmark-title-template.handlebars')

const messageModal = (message, status) => {
  $('#messageModal .modal-body').text(message)
  $('#messageModal').modal('toggle')
  $('#messageModal').attr('status', status)
  setTimeout(() => {
    $('#messageModal').modal('toggle')
  }, 1500)
}

const requestIndexSuccess = function (response) {
  // console.log(response)
  const showBookmarksHtml = showBookmarksTemplate({bookmarks: response.bookmarks})
  $('.bookmarks').html(showBookmarksHtml)
  // $('.bookmark-crud-message').text('All are revealed')
  messageModal('Reveal All', 'success')
}

const requestIndexFail = function (response) {
  // $('.bookmark-crud-message').text('Fail to show all bookmarks')
  messageModal('Fail to reveal', 'fail')
}

const addBookmarkPrompt = (id) => {
  $('#newBookmarkModal').modal('toggle')
  const EditBookmarkHtml = EditbookmarkTemplate({
    bookmark: {
      id: id
    }
  })
  $('#newBookmarkModal').find('.modal-body').html(EditBookmarkHtml)
}

const requestCreateSuccess = (response, id) => {
  const bookmarkHtml = bookmarkTemplate(response.bookmark)
  $('.bookmarks').append(bookmarkHtml)
  $('#' + id).remove()
  $('#newBookmarkModal').modal('toggle')
  // $('.bookmark-crud-message').text('Saved')
  messageModal('Saved', 'success')
}

const requestCreateFail = (response) => {
  // $('.bookmark-crud-message').text('Fail to create bookmark')
  messageModal('Fail to create', 'fail')
}

const requestDeleteSuccess = (response, id) => {
  // console.log('id: ', id)
  $('#' + id).remove()
  $('#removeModal').modal('toggle')
  // $('.bookmark-crud-message').text('Bookmark Removed')
  messageModal('Deleted', 'success')
}

const requestDeleteFail = (response) => {
  // $('.bookmark-crud-message').text('Fail to remove bookmark')
  messageModal('Fail to remove', 'fail')
}

const removePrompt = (target) => {
  $('#removeModal').modal('toggle')
  const data = bookmarkTitleTemplate({
    id: target.id,
    title: $('#' + target.id).find('.title').val()
  })
  $('#removeModal').find('.modal-body').html('Are you sure to remove this bookmark? ' + data)
}

const editBookmark = (target) => {
  // console.log(target.id)
  const EditBookmarkHtml = EditbookmarkTemplate({
    bookmark: {
      id: target.id,
      title: $('#bookmark-title-' + target.id).text(),
      url: $('#bookmark-title-' + target.id).attr('href'),
      description: $('#bookmark-description-' + target.id).text()
    }
  })
  $('#' + target.id).replaceWith(EditBookmarkHtml)
}

const requestUpdateSuccess = (response, id) => {
  const bookmarkHtml = bookmarkTemplate(response.bookmark)
  $('#' + id).replaceWith(bookmarkHtml)
  // $('.bookmark-crud-message').text('Saved')
  messageModal('Saved', 'success')
}

const requestUpdateFail = (response) => {
  // $('.bookmark-crud-message').text('Fail to save')
  messageModal('Fail to save', 'fail')
}

module.exports = {
  requestIndexSuccess,
  requestIndexFail,
  addBookmarkPrompt,
  requestCreateSuccess,
  requestCreateFail,
  requestDeleteSuccess,
  requestDeleteFail,
  removePrompt,
  editBookmark,
  requestUpdateSuccess,
  requestUpdateFail
}
