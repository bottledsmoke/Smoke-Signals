# Le Petit Secret
<!-- By [Tyler Hellner](http://www.tylerhellner.com) -->
## By Tyler Hellner

# A B S T R A C T

Le Petit Secret is a blog where the user utilizes a drag and drop interface to arrange content blocks. Inside each block, there is a robust inline text editor for content writing. For hero and gallery block types, background images can be set by dragging and dropping them directly on the container.

# S I T E . S T R U C T U R E

- Home
- About
- Posts
  - Comments
  - Share Buttons
- RSS Feed
- Live search

> note: this is an outward facing struture. This is not how it looks to an admin user.

# H O M E . S T R U C T U R E

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus totam eligendi officia, reprehenderit dolores nobis ut porro vitae iste voluptas sint voluptates a eius placeat aut ullam nulla excepturi fuga.

# P O S T . S T R U C T U R E

**Posts** are constructed from content blocks, block which ultimate define what it is when abstracted into a post type.

**Content blocks** come grouped into categories that help the creator structure their app by theme.

# P O S T . T Y P E S

##### Basic Article
Text blocks, photo blocks, block quotes

##### Image Gallery
Photo blocks

# B L O C K . T Y P E S

We can think of block types as a group of content encapsulated by a single container that spans the width of the page.

##### Text

** Simple Paragraph: ** A simple paragraph will yield just that, a long paragraph of text in a text area that is padded equally on both sides so that it is centered in the page.

##### Photo

** Photo Hero: ** A photo hero is a photo which spans the entire width of the page with a caption at the bottom. The hero may also contain a large h1 text element that is aligned on the top left, top center, top right, center left, center center, center right, bottom left, bottom center, bottom right. This h1 may have an h4-h5 caption below it, or you may be able to place another h4-h5 caption in another area of the photo.

** 9/12 Hero with 3/12 Caption: ** This form takes a photo and makes it span the 9/12 of the width of the page and places a caption next to it. Given that the photo is still the primary element, it is allowed to be there.

# H I G H E R - O R D E R . C O N T E N T

Higher order content is that which utilizes a curated collection of posts to transform into something greater and singular, just as a magazine is a combination of advertisements, articles, galleries, features, exhibitions, and so on which, when separate, are all content spanning pages that exist as a single thing. When combined, they create a magazine.

There need not be just a single layer of abstraction above the normal post. We can think of a post as an absraction of blocks, with each post type being labeled as the collection of which blocks were specifically chosen for it. From there, a higher order collection of posts creates a magazine, a triptych, an ebook -- a browsable theme of content.

# F I L T E R I N G . A N D . S E A R C H I N G

##### Ideas

Features
> Display: I have seen features as a hero, a hero with a slider, a Gawker-style sidebar where the most popular articles of the last 30-14-7-3-1 days are displayed depending on the amount of traffic the site receives, and tag-based features, which are generally selected from the nav bar. Think 'Creators Picks'; This, however, is more of a filtering for features, but there may be featured articles of the week - month - season that outline certain concepts that may be important to this time period that are key to have stamped. There also may be ongoing promotions or multi-post articles that can have their own splash page as each chunk comes out on its day. The unpublished articles can be greyed out and have their 'available on:' date displayed on them.

  - Feature (admin selected)
  - Feature for registered user (algorithm selected)
  - Feature (most popular in last 30-14-7-1 days, depending on amount of traffic)

Search