'use strict'

const showBookmarksTemplate = require('../templates/bookmarks-template.handlebars')
const bookmarkTemplate = require('../templates/bookmark-template.handlebars')
const EditbookmarkTemplate = require('../templates/edit-bookmark-template.handlebars')
const bookmarkTitleTemplate = require('../templates/bookmark-title-template.handlebars')

const requestIndexSuccess = function (response) {
  console.log(response)
  const showBookmarksHtml = showBookmarksTemplate({bookmarks: response.bookmarks})
  $('.bookmarks').html(showBookmarksHtml)
}

const requestIndexFail = function (response) {
  console.log('Fail to get all bookmarks')
}

const addBookmark = (id) => {
  const EditBookmarkHtml = EditbookmarkTemplate({
    bookmark: {
      id: id
    }
  })
  $('.bookmarks').append(EditBookmarkHtml)
}

const requestCreateSuccess = (response, id) => {
  const bookmarkHtml = bookmarkTemplate(response.bookmark)
  $('.bookmarks').append(bookmarkHtml)
  $('#' + id).remove()
  $('.bookmark-crud-message').text('Saved')
}

const requestCreateFail = (response) => {

}

const requestDeleteSuccess = (response, id) => {
  // console.log('id: ', id)
  $('#' + id).remove()
  $('.bookmark-crud-message').text('Bookmark Removed')
  $('#removeModal').modal('toggle')
}

const requestDeleteFail = (response) => {

}

const removePrompt = (target) => {
  $('#removeModal').modal('toggle')
  console.log(target)
  const data = bookmarkTitleTemplate({
    id: target.id,
    title: $('#' + target.id + ' a big').text()
  })
  $('.modal-body').html('Are you sure to remove this bookmark? ' + data)
}

const editBookmark = (target) => {
  // console.log(target.id)
  const EditBookmarkHtml = EditbookmarkTemplate({
    bookmark: {
      id: target.id,
      title: $('#' + target.id + ' a big').text(),
      url: $('#' + target.id + ' a').attr('href'),
      description: $('#' + target.id + ' p').text()
    }
  })
  $('#' + target.id).replaceWith(EditBookmarkHtml)
}

const requestUpdateSuccess = (response, id) => {
  const bookmarkHtml = bookmarkTemplate(response.bookmark)
  $('.bookmarks').append(bookmarkHtml)
  $('#' + id).remove()
  $('.bookmark-crud-message').text('Saved')
}

const requestUpdateFail = (response) => {

}

module.exports = {
  requestIndexSuccess,
  requestIndexFail,
  addBookmark,
  requestCreateSuccess,
  requestCreateFail,
  requestDeleteSuccess,
  requestDeleteFail,
  removePrompt,
  editBookmark,
  requestUpdateSuccess,
  requestUpdateFail
}
