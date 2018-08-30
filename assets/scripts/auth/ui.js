'use strict'

const store = require('../store.js')

const signUpSuccess = function () {
  $('.message').text('Successfully Sign Up')
  $('#sign-up input').val('')
}

const signUpFail = function () {
  $('.message').text('Failed to Sign Up')
  $('#sign-up input').val('')
}

const signInSuccess = function (response) {
  store.user = response.user
  $('.message').text('Login Successfully')
  $('#sign-in input').val('')
}

const signInFail = function () {
  $('.message').text('Failed to Login')
  $('#sign-in input').val('')
}

const changePasswordSuccess = function () {
  $('.message').text('Password Changed')
  $('#change-password input').val('')
}

const changePasswordFail = function () {
  $('.message').text('Failed to Change Password')
  $('#change-password input').val('')
}

const signOutSuccess = function () {
  $('.message').text('Signed Out')
}

const signOutFail = function () {
  $('.message').text('Failed to Sign Out')
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
