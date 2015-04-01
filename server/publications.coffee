Meteor.publish 'posts', ->
  return Posts.find()

Meteor.publish 'singlePost', (id) ->
  check(id, String)
  return Posts.find(id)