ss = Posts._c2._simpleSchema
# for ease of reference
@schema = Posts._c2._simpleSchema


# G L O B A L  F U N C T I O N S -----------------------------------------------

# -> C A L L B A C K S
#
# logDataPath: used to set data attribute on the input element.
#
logDataPath = (pathToField) ->
  return "content.$." + pathToField
#
# evalInputType: used to render the correct input type for the current field in a
#            template.
#
evalInputType = (keyOfField) ->
  settings =
    header:  "input"
    text:    "textarea"
    caption: "textarea"
    image:   "imageBlock"
    default: "userSet"
  if settings[keyOfField]
    return settings[keyOfField]
  else
    return settings.default
#
# logKeyType: used as a callback for blockSchema
#
logKeyType = (objectName, key, keyType, blockName) ->
  output =
    type: keyType
    dataPath: logDataPath(blockName + '.' + key)
    inputType: evalInputType(key)
  return objectName[key] = output


# -> H E L P E R S
#
# getKeys: Gets the object keys for the current block. The utility of this
#          this helper is due to the additional '.' in the keys of the
#          _objectKeys array compared to the _schema array.
#
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

#
# blockSchema: Takes in a blockName and compiles a schema for it recursively.
#              When it reaches a schema endpoint, it performs callback() on the
#              values and outputs an object as the result. The data object is
#              later extended with these values.
#
blockSchema = (blockName, callback) ->
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
      # Issue: This is only working if the keys of arrays are objects.
      output[key] = [blockSchema(blockName + '.' + key + ".$", callback)]
    else
      # Perform the callback on the values when an endpoint is reached
      console.log 'BlockName: ', blockName,
                  'Key: ', key
      callback output, key, keyType, blockName

  console.log "Schema: ", output
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

    # Use template name to construct the data context from schema
    data = {}
    data['schema'] = blockSchema(templateName, logKeyType)

    dynamic = new Iron.DynamicTemplate( template: templateName, data: data)
    dynamic.insert( el: '#template-container' )

  'click #save': (e) ->
    e.preventDefault()

    blocks = $('.block-container').innerHTML

    console.log blocks