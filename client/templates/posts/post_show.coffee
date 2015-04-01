Template.postShow.created = ->
  Session.set('isEditing', false)
  console.log(Session.get('isEditing'))

Template.postShow.helpers
  isEditing: ->
    return Session.get('isEditing')

Template.postShow.events
  'click h1': (e) ->
    e.preventDefault()

    Session.set('isEditing', true)
    console.log(Session.get('isEditing'))

  'click .submit': (e) ->
    e.preventDefault()
    currentPostId = @_id
    title = $('#title').val()
    Posts.update currentPostId, {$set: {title: title}}, ->
      Session.set('isEditing', false)