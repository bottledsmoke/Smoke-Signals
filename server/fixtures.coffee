if Posts.find().count() is 0

  hero = {
    image: 'images/surfers.jpg'
    header:
      text: 'Yolo'
      textAlignment: 'center'
      gridAlignment: 'center-left'
      caption: 'Tee hee'
    caption:
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      textAlignment: 'center'
      gridAlignment: 'center-left'
  }

  blockText = {text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}

  exampleTextPostContents = [ { hero: hero }, { blockText: blockText } ]

  exampleTextPost = {
    title: 'Example Text Post'
    content: exampleTextPostContents
  }

  Posts.insert exampleTextPost