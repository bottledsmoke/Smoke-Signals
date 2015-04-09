@Posts = new Mongo.Collection 'posts'

Schemas = {}
Blocks = {}

Schemas.Base = new SimpleSchema
  createdAt:
    type: Date
    autoValue: ->
      if (@isInsert)
        return new Date()
      else if (@isUpsert)
        return { $setOnInsert: new Date() }
      else
        @unset()
      return
  updatedAt:
    type: Date
    optional: true
    denyInsert: true
    autoValue: ->
      if (@isUpdate)
        return new Date()
      return


# B L O C K S -----------------------------------------------------------------

Blocks.Title = new SimpleSchema
  title:
    type: String
    defaultValue: 'Click me to enter a title for this post!'
    max: 200

Blocks.Body = new SimpleSchema
  body:
    type: String
    defaultValue: 'Click me to enter some body text!'
    label: 'Body'

blockMap = {
  'Title': Blocks.Title
  'Body': Blocks.Body
}


# S C H E M A S ---------------------------------------------------------------

Schemas.Block = new SimpleSchema [
  template:
    type: String
    label: 'The name of the template into which this block is rendered.'
    allowedValues: ->
      # Only allow blocks that exist to be set as templates.
      return _.keys(Blocks)
  data:
    type:
  ]

Schemas.Post = new SimpleSchema [ Schemas.Base,
  blocks:
    type: [Schemas.Block]
    label: ''
    minCount: 2
  ]

@Posts.attachSchema(Schemas.Post)