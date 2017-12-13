/* global $ */
/* global gameId */

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
  var newTrait = $('<div class="trait" style="display: block;">' + trait.name + ': ' + '<div class="upScore" style="display: inline;">' + trait.upvoteScore  + '</div></div>')
  newTrait.data('id', trait._id)
  $(tList).append(newTrait)
  upvoteTrait(newTrait)
}

function upvoteTrait(trait) {
  $(trait).on('click', () => {
    var traitId = $(trait).data('id')
    var putUrl = '/api/traits/' + traitId + '/upvote'
    console.log(putUrl)
    $.ajax({
      method: 'PUT',
      url: putUrl
    })
    .then((data) => {
      replaceEle = $('div').find(trait.children('.upScore'))
      console.log(trait)
      console.log(replaceEle)
      $(replaceEle).replaceWith('<div class="upScore" style="display: inline;">' + data.upvoteScore  + '</div>')
    })
  })
}