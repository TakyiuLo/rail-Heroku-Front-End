'use strict'

const loadingSignUp = function () {
  $('.sign-up-button').addClass('diy-became-loading')
  console.log('ok')
}

const signUpSuccess = function () {
  $('.auth-message').text('Successfully Sign Up')
  $('#sign-up input').val('')
  $('.sign-up-button').removeClass('diy-became-loading')
}

const signUpFail = function () {
  $('.sign-up-button').removeClass('diy-became-loading')
  $('.auth-message').text('Failed to Sign Up')
  $('#sign-up input').val('')
}

const loadingSignIn = function () {
  $('.sign-in-button').addClass('diy-became-loading')
}

const signInSuccess = function (response) {
  $('.sign-in-button').removeClass('diy-became-loading')
  $('.auth-message').text('Login Successfully')
  $('#sign-in input').val('')
  $('.state-credientials').addClass('d-none')
  $('.state-bookmarks').removeClass('d-none')
  $('.state-bookmarks').addClass('diy-slide-in')
  $('.state-folders').addClass('diy-slide-in')
  $('.state-folders').removeClass('d-none')
}

const signInFail = function () {
  $('.sign-in-button').removeClass('diy-became-loading')
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
  $('.state-bookmarks').addClass('diy-slide-out')
  $('.state-folders').addClass('diy-slide-out')
  setTimeout(() => {
    $('.state-bookmarks').addClass('d-none')
    $('.state-folders').addClass('d-none')
    $('.state-bookmarks').removeClass('diy-slide-out')
    $('.state-folders').removeClass('diy-slide-out')
    $('.state-credientials').removeClass('d-none', 'diy-slide-in')
    $('.state-credientials').addClass('diy-slide-in')
  }, 400)

  $('.state-bookmarks').removeClass('diy-slide-in')
  $('.state-folders').removeClass('diy-slide-in')
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
  loadingSignUp,
  loadingSignIn,
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
