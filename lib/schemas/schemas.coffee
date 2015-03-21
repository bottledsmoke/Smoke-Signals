@Posts = new Mongo.Collection 'posts'

Schemas = {}

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

  updatedAt:
    type: Date
    optional: true
    denyInsert: true
    autoValue: ->
      if (@isUpdate)
        return new Date()

Schemas.Post = new SimpleSchema [ Schemas.Base,
  title:
    type: String
    label: 'Post title'
    max: 200

  body:
    type: String
    label: 'Body'
  ]

@Posts.attachSchema(Schemas.Post)