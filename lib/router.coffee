Router.configure
  layoutTemplate: 'layout'

ROOT = exports ? this


# C O N T R O L L E R S --------------------------------------------------------


# R O U T E S ------------------------------------------------------------------

Router.route '/',
  name: 'postsList'
  waitOn: ->
    Meteor.subscribe('posts')
