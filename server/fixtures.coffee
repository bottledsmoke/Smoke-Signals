if Posts.find().count() is 0

  hero = {
    image: 'images/surfers.jpg'
    header:
      text: 'HERO HEADER'
      textAlignment: 'center'
      gridAlignment: 'center-left'
      caption: 'HERO HEADER - HEADER CAPTION Tee hee'
    caption:
      text: "HERO HEADER - CAPTION Lorem ipsum dolor sit amet,
             consectetur adipiscing elit."
      textAlignment: 'center'
      gridAlignment: 'center-left'
  }

  blockText = {text: "BLOCK TEXT: Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip
                      ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu
                      fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                      non proident, sunt in culpa qui officia deserunt mollit
                      anim id est laborum."}

  orderedList = {
    orderedList: true
    content: [ {
                 item: 'Item One'
               }
               {
                 item: 'Item Two'
                 nestedItems: [ 'Item Two.One', 'Item Two.Two' ]
               }
               {
                 item: 'Item Three'
               }
             ]
  }

  unorderedList = {
    orderedList: false
    content: [ {
                 item: 'Item One'
               }
               {
                 item: 'Item Two'
                 nestedItems: [ 'Item Two.One', 'Item Two.Two' ]
               }
               {
                 item: 'Item Three'
               }
             ]
  }

  Items = {
    One:
      image: 'images/bread.jpg'
      text:
        header: 'Gallery Item One Header'
        caption: 'Item One Caption: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor.'
    Two:
      image: 'images/cliff.jpg'
      text:
        header: 'Gallery Item Two Header'
        caption: 'Item Two Caption: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor.'
    Three:
      image: 'images/egg.jpg'
      text:
        header: 'Gallery Item Three Header'
        caption: 'Item Three Caption: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor.'
    Four:
      image: 'images/firs.jpg'
      text:
        header: 'Gallery Item Four Header'
        caption: 'Item Four Caption: Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor.'
  }

  gallery = {
    header: 'Gallery Header'
    items: [ Items.One, Items.Two, Items.Three, Items.Four ]
  }

  exampleTextPostContents = [ { hero: hero },
                              { blockText: blockText },
                              { list: orderedList },
                              { list: unorderedList },
                              { gallery: gallery }
                            ]

  exampleTextPost = {
    title: 'Example Text Post'
    content: exampleTextPostContents
  }

  Posts.insert exampleTextPost