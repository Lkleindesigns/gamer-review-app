/* global $ */
/* global gameId */
/* global replaceEle */

$(document).ready(() => {
  $.getJSON("/api/traits/" + gameId + "/all")
  .then(addTraits)
})

function addTraits(traitsObj) {
  $.each(traitsObj, (key) => {
    var hr = $('<hr></hr>')
    var newTraitHeader = $('<div style="display: block;">' + key + '</div>')
    var newTraitList = $('<div class="trait-list" style="padding: 0; list-style-type: none;"></div>')

    $('.genre-lists').append(newTraitHeader)
    $(newTraitHeader).append(newTraitList)
    $(newTraitHeader).append(hr)

    traitsObj[key].forEach((genreTrait) => {
      addTrait(genreTrait, newTraitList)
    })
  })
}

function addTrait(trait, tList) {
  var newTrait = $( '<div class="trait" style="display: block;">' + trait.name + ': ' +
                      '<div class="upScore" style="display: inline;">' + trait.upvoteScore  +
                      '</div>' +
                      '<i class="vote upvote-btn fa fa-arrow-up" aria-hidden="true"></i>' +
                      '<div class="downScore" style="display: inline;">' + trait.downvoteScore  +
                      '</div>' +
                      '<i class="vote downvote-btn fa fa-arrow-down" aria-hidden="true"></i>' +
                    '</div>')
  newTrait.data('id', trait._id)
  $(tList).append(newTrait)
  upvoteTrait(newTrait)
  downvoteTrait(newTrait)
}

function upvoteTrait(trait) {
  $((trait).find(trait.children('.upvote-btn'))).on('click', () => {
    var traitId = $(trait).data('id')
    var putUrl = '/api/traits/' + traitId + '/upvote'
    $.ajax({
      method: 'PUT',
      url: putUrl
    })
    .then((data) => {
      console.log('Success')
      replaceEle = $('div').find(trait.children('.upScore'))
      $(replaceEle).replaceWith('<div class="upScore" style="display: inline;">' + data.upvoteScore  + '</div>')
    })
    .catch((err) => {
      console.log(err.responseJSON.error)
      fadeMessage(err)
    })
  })
}

function downvoteTrait(trait) {
  $((trait).find(trait.children('.downvote-btn'))).on('click', () => {
    var traitId = $(trait).data('id')
    var putUrl = '/api/traits/' + traitId + '/downvote'
    $.ajax({
      method: 'PUT',
      url: putUrl,
      success: function(data) {
        replaceEle = $('div').find(trait.children('.downScore'))
        $(replaceEle).replaceWith('<div class="downScore" style="display: inline;">' + data.downvoteScore  + '</div>')
      },
      error: function(err) {
        console.log("FAIL!")
      }
    })
  })
}

function fadeMessage(err) {
  $('.flash-msg').text(err.responseJSON.error).delay(0).fadeIn(300, function() {
    $(this).delay(2500).fadeOut(700)
  })
}