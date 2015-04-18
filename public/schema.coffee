@Posts = new Mongo.Collection('posts')

Schema = {}
Blocks = {}
Fields = {}

listTypes = ['ol', 'ul']
textAlignment = [ 'center', 'left', 'right', 'justified' ]
gridAlignment = [ 'top-left',    'top-center',    'top-right',
                  'center-left', 'center-center', 'center-right',
                  'bottom-left', 'bottom-center', 'bottom-right' ]


# F I E L D S ------------------------------------------------------------------

Fields.Header = new SimpleSchema
  text:
    type: String
    label: 'Header text.'
    max: 200
  textAlignment:
    type: String
    label: 'Inline alignment of the header text.'
    defaultValue: 'left'
    allowedValues: textAlignment
  gridAlignment:
    type: String
    label: 'Alignment of the header relative to the block container.'
    defaultValue: 'center-center'
    allowedValues: gridAlignment
  caption:
    type: String
    label: 'Caption text that appears below the header in the same div.'
    optional: true

Fields.Caption = new SimpleSchema
  text:
    type: String
    label: 'Header text'
    max: 200
  textAlignment:
    type: String
    label: 'Inline alignment of the header text.'
    defaultValue: 'left'
    allowedValues: textAlignment
  gridAlignment:
    type: String
    label: 'Alignment of the header relative to the block container.'
    defaultValue: 'center-center'
    allowedValues: gridAlignment

Fields.ListItem = new SimpleSchema
  item:
    type: [String]
    minLength: 1

# Validating a gallery item should check if there is an image.
# If not, there must be a text block.

Fields.GalleryItem = new SimpleSchema
  image:
    type: String
    optional: true
  text:
    type: Object
    optional: true
  'text.header':
    type: String
    optional: true
  'text.caption':
    type: String
    optional: true


# B L O C K S ------------------------------------------------------------------

Blocks.Hero = new SimpleSchema
  type:
    type: String
    autoValue: ->
      return 'hero'
  image:
    type: String
  header:
    type: Fields.Header
    optional: true
  caption:
    type: Fields.Caption
    optional: true

Blocks.Text = new SimpleSchema
  quote:
    type: Boolean
    label: 'Quote is true when the text block is a block quote'
    defaultValue: false
  text:
    type: String

Blocks.List = new SimpleSchema
  type:
    autoValue: ->
      return 'list'
  class:
    type: String
    allowedValues: listTypes
  content:
    type: [Fields.ListItem]
    minLength: 1

Blocks.Gallery = new SimpleSchema
  header:
    type: String
    optional: true
  items:
    type: Fields.GalleryItem
    minLength: 1


# P O S T S --------------------------------------------------------------------

Schemas.Post = new SimpleSchema
  title:
    type: String
    maxLength: 200
  content:
    type: [Blocks]
    minLength: 1
  createdAt:
    type: Date
    autoValue: ->
      if @isInsert
        return new Date()
      else if @isUpsert
        return { $setOnInsert: new Date() }
      else
        return @unset()
      return
  updatedAt:
    type: Date
    optional: true
    autoValue: ->
      if @isUpdate
        return new Date()
      return

@Posts.attachSchema(Schemas.Post)