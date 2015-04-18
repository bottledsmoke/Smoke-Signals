# Le Petit Secret
<!-- By [Tyler Hellner](http://www.tylerhellner.com) -->
##### By Tyler Hellner

## A B S T R A C T

Le Petit Secret is a blog where the user utilizes a drag and drop interface to arrange content blocks. Inside each block, there is a robust inline text editor for content writing. For hero and gallery block types, background images can be set by dragging and dropping them directly on the container.

## S I T E . S T R U C T U R E

- Home
- About
- Posts
  - Comments
  - Share Buttons
- RSS Feed
- Live Search

> note: this is an outward facing struture. This is not how it looks to an admin user.

<!-- ## H O M E . S T R U C T U R E

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus totam eligendi officia, reprehenderit dolores nobis ut porro vitae iste voluptas sint voluptates a eius placeat aut ullam nulla excepturi fuga. -->

## P O S T . S T R U C T U R E

**Content blocks** come grouped into categories that help the creator structure their app by theme. Content blocks are defined by the fields which they wrap.

**Fields** are filled in by content.

**Posts** are constructed from content blocks, block which ultimate define what kind of post it is when abstracted into a post type.

## F I E L D . T Y P E S

Fields provide the necessary interface to store and edit values in each content block. Each field can

- **Single-Line Input -** [ input type='text' ]
  - Inputs function as single-line inputs and are used for headers and subheaders.
- **Text Areas -** [ input type='textarea' ]
  - Text Areas are used for blobs of text, bodies, and multi-line aside captions.
- **Blockquote -** [ input type='textarea' class='block quote' ]
  - Block Quotes are different in that they simply trigger a different CSS styling to stand out on the page. They can either have a wider or narrower margin when compared to the body container, depending on visual taste.
- **List -** [ ordered and unordered. The user selects which when editing ]
  - An input list consists of a set of single-line inputs wrapped in a div. They start out as one input that is in focus and two more inputs down the line, each of which grow increasingly less-contrasted with the background. I.E. they are progressively more and more greyed-out.
- **Image container -**
- **Background image -**

## B L O C K . T Y P E S

### External Representation
We can think of block types as a group of content encapsulated by a single container that spans the width of the page.

#### Text

**Simple Paragraph:** A simple paragraph will yield just that, a long paragraph of text in a text area that is padded equally on both sides so that it is centered in the page.

    block = {
      quote: false
      textarea: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                 Deleniti odit, quibusdam nihil est nisi voluptates autem
                 perferendis architecto, minus nesciunt rerum aliquid ea fugit
                 inventore provident incidunt ducimus cumque vero.'
    }

**Block Quote:**

    block = {
      quote: true
      textarea: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                 Deleniti odit, quibusdam nihil est nisi voluptates autem
                 perferendis architecto, minus nesciunt rerum aliquid ea fugit
                 inventore provident incidunt ducimus cumque vero.'
    }

**List:** Lists can be either ordered or unordered. When making the list, the user can select which type it is from a modal.

    block = {
      type: 'ol || ul',
      content: [
        'list-item',
        'list-item',
        'list-item',
        'list-item' ,
        ['list-item', 'list-item', 'list-item'] # -> nested list
      ]
    }

#### Photo

**Photo Hero:** A photo hero is a photo which spans the entire width of the page with a caption at the bottom; however, it may be able to be split up into a grid (see next paragraph). The hero may also contain a large h1 text element that is aligned on the top left, top center, top right, center left, center center, center right, bottom left, bottom center, bottom right. This h1 may have an h4-h5 caption below it, or you may be able to place another h4-h5 caption in another area of the photo.

The hero can also be potentially split up into a grid, effectively creating a 1x1 photo hero grid, a 2x1 photo hero grid, a 2x2 photo hero grid, a 3x3 photo hero grid, and so on, with the header and caption potentially fitting into one of the caption slots. A test case will determine whether or not it would be good to create one massive Photo Hero object that can be busted up into grids, or if I should create several different Photo Hero objects that inherit from a prototype.

A test case will determine whether or not the header may be optional. A good candidate for the text to be optional is just a full-screen photo. However, this would be bad if the hero is the first block in the system, as it could potentially push the header to far down as to push it below the fold.

Another test case will determine whether or not the photo may have another image overlaid on top of it. A good case is to put some sort of logo or another image in the hero, as to break up the hero into a grid.

    block = { # -> this is a single photo hero that spans the width of the page.
      type: 'hero',
      img: '.../path/to/image.png',
      header: { # -> idea: optional unless it is the first element in the page.
        text: 'Header Text',
        align: 'top-left || top-center || top-right || center-left || center-center || center-right || bottom-left || bottom-center || bottom-right', # -> each corresponds to a css class.
        text-align: 'center || left || right || justified', # -> each corresponds to a css class
        caption: 'I am a caption inline with the header. I'm optional.'
      },
      caption: {
        text: 'I am an caption that is separated from the header. I also may not be necessary, so really consider if you want this in the schema, Tyler.',
        align: 'bottom left' # 9 possible directions.,
        text-align: 'center || left || right || justified', # -> each corresponds to a css class
      }
    }

---

**9/12 Hero with 3/12 Caption:** This form takes a photo and makes it span the 9/12 of the width of the page and places a caption next to it. Given that the photo is still the primary element, it is allowed to be there.

    block = {
      img: '../path/to/image.png',
      side: 'left || right' # -> which side the image aligns to.
      caption: {
        header: 'This is a header'
        text: 'Lorem ipsum...'
      }
    }

This, however, may be easier if it simply shares a schema with the hero schema and then specifies a column width for the photo. What is below simply removes all unnecessary fields from the hero schema until we get what we want. It adds a column and side field. Note: with all these optional fields in a shared schema, the constructor for each of these different blocks must be able to verify that it is what it says it is. Perhaps, the type field is where we change things up to assure which verification suite to run on each block.

    block = {
      type: 'hero',
      img: '.../path/to/image.png',
      column: 9,
      side: 'left || right'
      header: {
        text: 'Header Text',
        caption: 'I am a caption inline with the header. I'm optional.'
      },
    }

**Gallery:**

    block = {
      header: 'Hey baby, I'm the header of the gallery' # -> optional
      [ square, square, square, ...]
    }

    square = {
      img: '../path/to/image.png',
      text: {
        header: 'Header',
        caption: 'Lorem ipsum lorem ipsum lorem ipsum',
      } # -> length must be === 1 so that either an image or text is specified, but not both.
    }

#### Internal Structure

Each block is stored as an object, as the order of the fields does not matter. When creating or editing a new block, values are loaded into buffer objects that hold each field value. After each block loses focus, validation is performed if Session.get('autoValidate') is true, and if there is any error with a field, it will write that error to the page.

For images, they will need to be edited down to the correct size and filtered (if need be). For filtering, [CamanJS](http://camanjs.com/examples/) will give Instagram-style image editing. For cropping and resizing, [ImageAreaSelect](http://odyniec.net/projects/imgareaselect/) will do just fine. [RetinaJS](http://imulus.github.io/retinajs/) may help with resizing images to 2x versions, however, it would be best to just upload as large as an image as possible and then downsize it to their various low-res counterparts.

[Meteor CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS) seems to be a wonderful way to manipulate and store images; however, it requires that software be installed on the deployment server. Whether or not this can be done using Heroku, I do not know. There is a [Stack Overflow](http://stackoverflow.com/questions/28939105/call-image-processing-function-before-image-upload-in-meteor) topic on this, and it seems handy as all hell.

## P O S T . T Y P E S

#### External Representation

##### Basic Article
Text blocks, photo blocks, block quotes

##### Image Gallery
Photo blocks

#### Internal Storage

Upon submission of the new or edited post, each block is recursively added to an array in the order which they appear on the page. From here, if the post is a new post, the full array is inserted into the database after validation. If the user is editing a post, we can either fully update the entire post (inefficient), or only update the parts which have been changed (more efficient, but more error prone).

## H I G H E R - O R D E R . C O N T E N T

Higher order content is that which utilizes a curated collection of posts to transform into something greater and singular, just as a magazine is a combination of advertisements, articles, galleries, features, exhibitions, and so on which, when separate, are all content spanning pages that exist as a single thing. When combined, they create a magazine.

There need not be just a single layer of abstraction above the normal post. We can think of a post as an absraction of blocks, with each post type being labeled as the collection of which blocks were specifically chosen for it. From there, a higher order collection of posts creates a magazine, a triptych, an ebook -- a browsable theme of content.


## F I L T E R I N G . A N D . S E A R C H I N G

##### Ideas

Features
> Display: I have seen features as a hero, a hero with a slider, a Gawker-style sidebar where the most popular articles of the last 30-14-7-3-1 days are displayed depending on the amount of traffic the site receives, and tag-based features, which are generally selected from the nav bar. Think 'Creators Picks'; This, however, is more of a filtering for features, but there may be featured articles of the week - month - season that outline certain concepts that may be important to this time period that are key to have stamped. There also may be ongoing promotions or multi-post articles that can have their own splash page as each chunk comes out on its day. The unpublished articles can be greyed out and have their 'available on:' date displayed on them.

  - Feature (admin selected)
  - Feature for registered user (algorithm selected)
  - Feature (most popular in last 30-14-7-1 days, depending on amount of traffic)

Search

## T O . D O

- Create a way to organize content. Tags, categories, etc. should be abstracted from posts later on. (Would fit in under Browsing Methods category.)

## E X A M P L E . P O S T

    {
      title: 'Example Post',
      _id: 'CZubB2DyFSawWCZYh',
      createdAt: ISODate("2015-04-14T20:13:03.127Z"),
      updatedAt: ISODate("2015-04-14T20:39:42.774Z"),
      content: [
        {
         block: ...
          ...
        },
        {
         block: ...
          ...
        },
        {
         block: ...
          ...
        },
        {
         block: ...
          ...
        },
      ]
    };