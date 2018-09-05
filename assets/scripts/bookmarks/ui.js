'use strict'

const bookmarksTemplate = require('../templates/bookmarks-template.handlebars')
const bookmarkTemplate = require('../templates/bookmark-template.handlebars')
const EditbookmarkTemplate = require('../templates/edit-bookmark-template.handlebars')
const bookmarkTitleTemplate = require('../templates/bookmark-title-template.handlebars')
// ui folders handlebars template
const foldersTemplate = require('../templates/folders-templates/folders-template.handlebars')
const folderTemplate = require('../templates/folders-templates/folder-template.handlebars')
const store = require('../store')

const messageModal = (message, status) => {
  // status: normal, success, fail
  $('#messageModal .modal-body').text(message)
  $('#messageModal').modal('toggle')
  $('#messageModal').attr('status', status)
  setTimeout(() => {
    $('#messageModal').modal('toggle')
  }, 1500)
}

const requestIndexSuccess = function (response) {
  // console.log(response)
  const showBookmarksHtml = bookmarksTemplate({bookmarks: response.bookmarks})
  $('.bookmarks').html(showBookmarksHtml)
  // $('.bookmark-crud-message').text('All are revealed')
  messageModal('Reveal All', 'success')
  $('#get-folders').addClass('d-none')
  store.bookmarks = response.bookmarks
}

const requestIndexFail = function (response) {
  // $('.bookmark-crud-message').text('Fail to show all bookmarks')
  messageModal('Fail to reveal', 'fail')
  $('#get-folders').removeClass('d-none')
}

const addBookmarkPrompt = (id, folderId) => {
  // hide new folder modal and show the new bookmark modal if it is not a root
  $('#newFolderModal').modal('toggle')
  $('#newBookmarkModal').modal('toggle')
  // id for appending to when created
  const EditBookmarkHtml = EditbookmarkTemplate({
    bookmark: {
      id: id,
      folderId: folderId
    }
  })
  $('#newBookmarkModal').find('.modal-body').html(EditBookmarkHtml)
}

const requestCreateSuccess = (response, id) => {
  console.log('The ok id: ', id)
  const bookmarkHtml = bookmarkTemplate(response.bookmark)
  $('.bookmarks').append(bookmarkHtml) // version 1 only
  $('#' + id).remove()
  $('#newBookmarkModal').modal('toggle')
  // $('.bookmark-crud-message').text('Saved')

  // append root bookmark to the root folder
  if (id.includes('empty_form-null')) {
    $('.all-folders').append(bookmarkHtml)
  }
  messageModal('Saved', 'success')

  // append a new bookmark to store
  store.bookmarks.push(response.bookmark)
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

  // remove bookmark from store
  const index = store.bookmarks.map((bookmark) => { return bookmark.id }).indexOf(id)
  store.bookmarks.splice(index, 1)
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

  // update store bookmarks
  const index = store.bookmarks.map((bookmark) => { return bookmark.id }).indexOf(id)
  store.bookmarks[index] = response.bookmark
}

const requestUpdateFail = (response) => {
  // $('.bookmark-crud-message').text('Fail to save')
  messageModal('Fail to save', 'fail')
}

// UI folders handlers
const requestFoldersIndexSuccess = (response) => {
  const rootFolders = response.folders.filter((folder) => {
    return folder.parent_id === null
  })
  const rootFoldersTemplateHtml = foldersTemplate({folders: rootFolders})
  $('.all-folders').html(rootFoldersTemplateHtml)
  messageModal('Reveal All', 'success')
  addBookmarksToFolder(null)
}

const requestFoldersIndexFail = (response) => {
  messageModal('Fail to retreive folders', 'fail')
}

const appendSubFolders = (folderId) => {
  const folders = store.folders
  console.log(folders)
  const subFolders = folders.filter((folder) => {
    return folder.parent_id === folderId
  })
  console.log(subFolders)
  const foldersTemplateHtml = foldersTemplate({folders: subFolders})
  // add bookmarks here for later
  $('#sub-folder-' + folderId).html(foldersTemplateHtml)
}

const newFolderPrompt = (id) => {
  // console.log($('#folder-' + id))
  const parentFolderName = $('#folder-name-' + id).text()
  const prompt = 'Appending to: '
  $('#newFolderForm legend').text(prompt + parentFolderName)
  $('#newFolderForm').attr('data-id', id)
  $('#newFolderModal').modal('toggle')
}
const requestFolderCreateSuccess = (response) => {
  const folder = response.folder
  const folderTemplateHtml = folderTemplate(folder)
  console.log('parent folder', folder.parent_id)
  if (folder.parent_id === null) {
    $('.all-folders').append(folderTemplateHtml)
  } else {
    $('#sub-folder-' + folder.parent_id).append(folderTemplateHtml)
  }
  store.folders.push(folder)
  $('#newFolderModal').modal('toggle')
  $('#newFolderForm legend').text('')
  $('#newFolderForm input').val('')
  $('#newFolderForm').attr('data-id', 'null')
  messageModal('Save', 'success')
}
const requestFolderCreateFail = (response) => {
  const responseBody = response.responseJSON
  console.log(responseBody)
  messageModal(Object.keys(responseBody)[0] + ' ' + responseBody.name[0], 'fail')
}
const deleteFolderPrompt = (id) => {
  const parentFolderName = $('#folder-name-' + id).text()
  const prompt = 'Are you sure to remove this folder? '
  $('#removeFolderModal .modal-body').text(prompt + parentFolderName)
  $('#removeFolderModal').attr('data-id', id)
  $('#removeFolderModal').modal('toggle')
}
const requestFolderDeleteSuccess = (response, id) => {
  // console.log('id: ', id)
  $('#folder-' + id).remove()
  $('#removeFolderModal').modal('toggle')
  messageModal('Deleted', 'success')
}
const requestFolderDeleteFail = (response) => {
  messageModal('Fail to Delete', 'fail')
}
const editFolderPrompt = (id, name) => {
  $('#editFolderModal').attr('data-id', id)
  $('#editFolderModal .edit-form-input-name').attr('value', name)
  $('#editFolderModal').modal('toggle')
}
const requestUpdateFolderSuccess = (response, id) => {
  $('#editFolderModal').modal('toggle')
  const folder = response.folder
  $('#folder-name-' + id).text(folder.name)
  // console.log('folder-name-', id)

  // update store folder using id
  store.folders = store.folders.map((folderItem) => {
    if (folderItem.id === id) {
      folderItem.name = folder.name
    }
    return folderItem
  })
  // console.log(store.folders)
  messageModal('Save', 'success')
}
const requestUpdateFolderFail = (response) => {
  messageModal('Fail to Save', 'fail')
}

const addBookmarksToFolder = (id) => {
  // get bookmarks that are in this folder with id
  const bookmarks = store.bookmarks.filter(bookmark => bookmark.folder_id === id)
  const bookmarksTemplateHtml = bookmarksTemplate({bookmarks})
  console.log(id)
  if (id === null) {
    $('#folder-bookmarks-' + id).append(bookmarksTemplateHtml)
  } else {
    $('#folder-bookmarks-' + id).html(bookmarksTemplateHtml)
  }
}
const onCreateRootBookmark = () => {
  // id for appending to when created
  const EditBookmarkHtml = EditbookmarkTemplate({
    bookmark: {
      id: 'empty_form_id_' + ++store.emptyBookmarkNumber
    }
  })
  $('#newBookmarkModal').find('.modal-body').html(EditBookmarkHtml)
  $('#newBookmarkModal').modal('toggle')
}
const onCreateRootFolder = () => {
  $('#newFolderForm').attr('data-id', null)
  $('#newFolderForm legend').text('')
  $('#newFolderModal').modal('toggle')
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
  requestUpdateFail,
  requestFoldersIndexSuccess,
  requestFoldersIndexFail,
  appendSubFolders,
  newFolderPrompt,
  requestFolderCreateSuccess,
  requestFolderCreateFail,
  deleteFolderPrompt,
  requestFolderDeleteSuccess,
  requestFolderDeleteFail,
  editFolderPrompt,
  requestUpdateFolderSuccess,
  requestUpdateFolderFail,
  addBookmarksToFolder,
  onCreateRootBookmark,
  onCreateRootFolder
}
