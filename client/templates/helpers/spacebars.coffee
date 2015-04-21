Template.registerHelper 'formatDate', (date) ->
  return moment(date).format('MMMM Do YYYY, h:mm:ss a')

Template.registerHelper 'isEditing', ->
  return Session.get('isEditing')

Template.registerHelper 'contentPresent', (content) ->
  return content or null
