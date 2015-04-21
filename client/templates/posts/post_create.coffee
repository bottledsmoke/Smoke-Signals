Template.postCreate.created = ->
  Session.set('isEditing', true)

Template.postCreate.events
  'click button': (e) ->
    e.preventDefault()

    templateName = e.target.value
    dynamic = new Iron.DynamicTemplate( template: templateName )

    dynamic.insert( el: '#template-container' )

    console.log e.target.value
