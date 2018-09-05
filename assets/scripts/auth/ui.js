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
  $('.state-credientials').addClass('d-none')
  $('.state-bookmarks').removeClass('d-none')
  $('.state-folders').removeClass('d-none')
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
  $('.state-credientials').removeClass('d-none')
  $('.state-bookmarks').addClass('d-none')
}

const signOutFail = function () {
  $('.auth-message').text('Failed to Sign Out')
}

const switchToSignIn = function (event) {
  $('.card').addClass('flip')
  $('.card').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function (e) {
      // code to execute after transition ends
      $('.card .front').hide()
    }
  )
}

const switchToSignUp = function (event) {
  $('.card .front').show()
  $('.card').removeClass('flip')
}

module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  changePasswordSuccess,
  changePasswordFail,
  signOutSuccess,
  signOutFail,
  switchToSignIn,
  switchToSignUp
}
