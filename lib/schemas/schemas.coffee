@Posts = new Mongo.Collection('posts')

Schemas = {}
Blocks = {}
Fields = {}

textAlignment = [ 'center', 'left', 'right', 'justified' ]
gridAlignment = [ 'top-left',    'top-center',    'top-right',
                  'center-left', 'center-center', 'center-right',
                  'bottom-left', 'bottom-center', 'bottom-right' ]

isDefined = ->
  if (@field('text') and !@isSet and (!@operator or (@value is null or @value is "")))
    console.log('hi')
    return 'required'


# F I E L D S ------------------------------------------------------------------

Fields.Header = new SimpleSchema
  text:
    type: String
    label: 'Header text.'
    max: 200
  textAlignment:
    type: String
    label: 'Inline alignment of the header text.'
    allowedValues: textAlignment
  gridAlignment:
    type: String
    label: 'Alignment of the header relative to the block container.'
    allowedValues: gridAlignment
  caption:
    type: String
    label: 'Caption text that appears below the header in the same div.'
    optional: true

Fields.Caption = new SimpleSchema
  text:
    type: String
    label: 'Caption text'
    max: 200
  textAlignment:
    type: String
    label: 'Inline alignment of the caption text.'
    allowedValues: textAlignment
  gridAlignment:
    type: String
    label: 'Alignment of the caption relative to the block container.'
    allowedValues: gridAlignment

Fields.ListItem = new SimpleSchema
  item:
    type: String
    label: 'List item'
    minCount: 1
  nestedItems:
    type: [Object]
    label: 'Nested List Items'
    optional: true
  "nestedItems.$.item":
    type: String
    optional: true

# Validating a gallery item should check if there is an image.
# If not, there must be a text block.

Fields.GalleryItem = new SimpleSchema
  image:
    type: String
    label: 'Gallery Item Image'
    optional: true
  text:
    type: Object
    label: 'Gallery Item Text'
    optional: true
  'text.header':
    type: String
    label: 'Gallery Item Text Header'
    optional: true
  'text.caption':
    type: String
    label: 'Gallery Item Text Caption'
    optional: true


# B L O C K S ------------------------------------------------------------------

Blocks.Hero = new SimpleSchema
  image:
    type: String
    label: 'Block.Hero Image'
  header:
    type: Fields.Header
    label: 'Block.Hero Header'
    optional: true
  caption:
    type: Fields.Caption
    label: 'Block.Hero Caption'
    optional: true

Blocks.BlockText = new SimpleSchema
  text:
    type: String
    label: 'Block.BlockText text'
  quote:
    type: Boolean
    label: 'Block.Text Quote (bool)'
    optional: true

Blocks.List = new SimpleSchema
  orderedList:
    type: Boolean
    label: 'Blocks.List is ordered list'
  content:
    type: [Fields.ListItem]
    label: 'Blocks.List Content'
    minCount: 1

Blocks.Gallery = new SimpleSchema
  header:
    type: String
    label: 'Blocks.Gallery Header'
    optional: true
  items:
    type: [Fields.GalleryItem]
    label: 'Blocks.Gallery Items'
    minCount: 1


# B L O C K S  C O L L E C T E D -----------------------------------------------

Blocks.Collected = new SimpleSchema
  hero:
    type: Blocks.Hero
    label: 'Blocks.Collected Hero Block'
    optional: true
  blockText:
    type: Blocks.BlockText
    label: 'Blocks.Collected Text Block'
    optional: true
  list:
    type: Blocks.List
    label: 'Blocks.Collected List Block'
    optional: true
  gallery:
    type: Blocks.Gallery
    label: 'Blocks.Collected Gallery Block'
    optional: true


# P O S T S --------------------------------------------------------------------

Schemas.Post = new SimpleSchema
  title:
    type: String
    max: 200
  content:
    type: [Blocks.Collected]
    minCount: 1
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