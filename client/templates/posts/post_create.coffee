# used by Schema Blocks
ss = Posts._c2._simpleSchema
# for ease of reference
@schema = Posts._c2._simpleSchema

# schema._schema["content.$.gallery.items"].type.name -> "Array"


# G L O B A L  F U N C T I O N S -----------------------------------------------


#
# compileBlockSchema
#
# So far, this guy takes in the block name from the data attribute on the
# buttons, creates an array of the firstLevelKeys in the block, and then returns
# an object in the dataContext which contains an object containing the first
# level schema keys and some junk data.
#
# This is probably not a good way to do this whole thing, as meddling with the
# data context for edits could possibly break the data of a post. Time will
# tell.
#

# Get first level keys, then get the type for each of the keys. If it's an
# object, then re-run the function recursively until it is not.

# testCases - createSchemaRecursive(null) -> ss._schema['content.$.']

getKeys = (blockName) ->
    if blockName
      # adds dot to the end, because that's just how _objectKeys is structured
      # If block is null, then we just get the firstLevelKeys for the schema.
      blockDot = blockName + '.'
    else
      blockDot = ''

    # -> returns the keys for the current block
    # -> on next loop, block = blockCurrent + '.' blockNext
    return ss._objectKeys['content.$.' + blockDot]

logKeyType = (object, key, keyType) ->
  return object[key] = keyType

blockSchema = (blockName, callback) ->
  ss = Posts._c2._simpleSchema
  output = {}

  # get current loop level keys in an array
  keys = getKeys blockName

  # loop through the keys
  for key in keys
    keyType = ss._schema["content.$." + blockName + '.' + key].type.name

    # Generate the structure of the schema
    if keyType is "Object"
      output[key] = blockSchema(blockName + '.' + key, callback)
    else if keyType is "Array"
      console.log blockName + '.' + key + ".$"
      output[key] = [blockSchema(blockName + '.' + key + ".$", callback)]
    else
      # Perform the callback on the values when an endpoint is reached
      callback output, key, keyType

  console.log output

  return output


# I N I T I A L I Z A T I O N --------------------------------------------------

Template.postCreate.created = ->
  Session.set('isEditing', true)


# H E L P E R S ----------------------------------------------------------------

Template.postCreate.helpers
  #
  # schemaBlocks: Returns an array of all possible block types in the schema.
  #               Used to build the template adding interface in the template.
  #
  schemaBlocks: ->
    blocks = ss._objectKeys['content.$.']
    return blocks

  #
  # deCamelCase: converts camelCase block definitions to gramatically correct
  #              titles for use in template adding interface.
  #
  deCamelCase: (source) ->
    output = source
               .replace /([A-Z])/g, ' $1'
               .replace /^./, (str) ->
                 return str.toUpperCase()
    return output


# E V E N T S ------------------------------------------------------------------

Template.postCreate.events
  'click button': (event) ->
    event.preventDefault()

    # Get template name
    templateName = $(event.target).data('schema-block')

    console.log templateName

    # Use template name to construct the data context from schema
    data = {}
    data['schema'] = blockSchema(templateName, logKeyType)

    dynamic = new Iron.DynamicTemplate( template: templateName, data: data)
    dynamic.insert( el: '#template-container' )

    console.log dynamic


  'click #save': (e) ->
    e.preventDefault()

    blocks = $('.block-container').innerHTML

    console.log blocks