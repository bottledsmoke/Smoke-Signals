Template.registerHelper 'formatDate', (date) ->
  return moment().format('MMMM Do YYYY, h:mm:ss a')