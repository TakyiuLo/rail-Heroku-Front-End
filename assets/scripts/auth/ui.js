'use strict'

const signUpSuccess = function () {
  $('.auth-message').text('Successfully Sign Up')
  $('#sign-up input').val('')
}

const signUpFail = function () {
  $('.auth-message').text('Failed to Sign Up')
  $('#sign-up input').val('')
}

const signInSuccess = function (response) {
  $('.auth-message').text('Login Successfully')
  $('#sign-in input').val('')
  $('.state-credientials').addClass('hidden')
  $('.state-bookmarks').removeClass('hidden')
}

const signInFail = function () {
  $('.auth-message').text('Failed to Login')
  $('#sign-in input').val('')
}

const changePasswordSuccess = function () {
  $('.auth-message').text('Password Changed')
  $('#change-password input').val('')
}

const changePasswordFail = function () {
  $('.auth-message').text('Failed to Change Password')
  $('#change-password input').val('')
}

const signOutSuccess = function () {
  $('.auth-message').text('Signed Out')
  $('.state-credientials').removeClass('hidden')
  $('.state-bookmarks').addClass('hidden')
}

const signOutFail = function () {
  $('.auth-message').text('Failed to Sign Out')
}

module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  changePasswordSuccess,
  changePasswordFail,
  signOutSuccess,
  signOutFail
}
