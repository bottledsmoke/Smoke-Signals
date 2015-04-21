Template.postCreate.created = ->
  Session.set('isEditing', true)

Template.postCreate.events
  'click button': (e) ->
    e.preventDefault()

    templateName = e.target.value
    dynamic = new Iron.DynamicTemplate( template: templateName )

    console.log dynamic

    dynamic.insert( el: '#template-container' )
  'click #save': (e) ->
    e.preventDefault()

    blocks = $('.block-container').innerHTML

    console.log blocks

