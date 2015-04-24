Template.postShow.created = ->
  Session.set('isEditing', false)

Template.postShow.onRendered( ->
  console.log @data
  )

Template.postShow.helpers
  isEditing: ->
    return Session.get('isEditing')
  blocks: ->
    return @content
  blockTemplate: ->
    return _.keys(this)[0]
  dataContext: ->
    # extend the current data context here when editing to prevent the schema
    # from polluting or overriding the data already on the page.
    return _.values(this)[0]
  loggit: (t) ->
    console.log t

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