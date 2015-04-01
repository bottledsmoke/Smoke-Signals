Router.configure
  layoutTemplate: 'layout'

ROOT = exports ? this


# C O N T R O L L E R S --------------------------------------------------------


# R O U T E S ------------------------------------------------------------------

Router.route '/',
  name: 'postsList'
  data: ->
    Meteor.subscribe('posts')

Router.route '/create',
  name: 'postCreate'

Router.route '/:_id',
  name: 'postShow'
  waitOn: ->
    Meteor.subscribe('singlePost', @params._id)
  data: ->
    Posts.findOne(@params._id)
