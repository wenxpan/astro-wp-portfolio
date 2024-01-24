---
title: How to create a responsive image slider in vanilla CSS
date: "2023-06-01"
author: Wenxuan Pan
description: Create a responsive image slider in vanilla CSS
image:
  url: https://images.unsplash.com/photo-1589409514187-c21d14df0d04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80
  alt: "an astronaunt in the space"
tags:
  - css
  - slider
  - ui component
---

## Creating an image slider in HTML and CSS

In the world of web development, image sliders are a common feature on many websites, allowing the display of multiple images in a sleek, smooth, and visually appealing manner. They're an effective tool for showcasing products, portfolio pieces, or for adding a dynamic, visual touch to your site.

Today, we're going to create an image slider using only HTML and CSS - no JavaScript required!

Let's look at the final result first:

<p class="codepen" data-height="470" data-default-tab="html,result" data-slug-hash="VwVYyyz" data-user="rycbar42" style="box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/rycbar42/pen/VwVYyyz">
  Responsive image slider in vanilla css</a> by Wenxuan Pan (<a href="https://codepen.io/rycbar42">@rycbar42</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## HTML Structure

The HTML for the image slider is relatively simple and straightforward. We use **radio buttons** to keep track of which image is currently being displayed, and labels for user interaction. We wrap all images with the `<figure>` tag, with optional `<figcaption>` for adding captions to the images. Here's the basic structure:

```html
<div class="slider">
  <!-- radio buttons for CSS states; will not display -->
  <input type="radio" name="pic" id="pic1" checked />
  <input type="radio" name="pic" id="pic2" />
  <input type="radio" name="pic" id="pic3" />
  <input type="radio" name="pic" id="pic4" />
  <!-- label buttons -->
  <div class="labels">
    <label for="pic1"></label>
    <label for="pic2"></label>
    <label for="pic3"></label>
    <label for="pic4"></label>
  </div>
  <!-- images -->
  <div class="image-list">
    <figure class="slide">
      <img src="https://picsum.photos/id/16/600/400" />
      <figcaption>caption text-1</figcaption>
    </figure>
    <figure class="slide">
      <img src="https://picsum.photos/id/18/600/400" />
      <figcaption>caption text-2</figcaption>
    </figure>
    <figure class="slide">
      <img src="https://picsum.photos/id/20/600/400" />
      <figcaption>caption text-3</figcaption>
    </figure>
    <figure class="slide">
      <img src="https://picsum.photos/id/22/600/400" />
      <figcaption>caption text-4</figcaption>
    </figure>
  </div>
</div>
```

## CSS Styling

Now, let's break down the CSS involved in making this image slider work.

```css
.slider {
  width: clamp(10rem, 100%, 30rem);
  aspect-ratio: 3 / 2;
  overflow: hidden;
  position: relative;
  border-radius: 0.5rem;
}

.image-list {
  width: 500%;
  display: flex;
  height: inherit;
  position: relative;
  transition: 1s;
}

.slide {
  width: 20%;
  position: relative;
}

.slide img {
  width: 100%;
}

.slide figcaption {
  z-index: 2;
  background-color: #0980a7;
  color: #eff1f5;
  font-style: italic;
  position: absolute;
  text-align: center;
  bottom: 0%;
  width: 100%;
  padding: 0.5rem 0 1rem 0;
}
```

The .slider class is our main container. We set overflow to hidden to ensure any content that doesn't fit within the box isn't shown.
The .image-list class contains all our images. We make it five times the width of the .slider to accommodate five slides and make them appear inline using display: flex.
Each .slide is set to be 20% of the total width of the .image-list, hence allowing five slides to fit perfectly across the width.
The img inside each slide is set to fill the entire width of its parent slide.
The figcaption inside each slide is absolutely positioned at the bottom of each slide and has some basic styling applied for presentation.
The secret sauce to the image slide transition is the following block of CSS:

```css
input[id="pic1"]:checked ~ .image-list {
  transform: translate(0);
}

input[id="pic2"]:checked ~ .image-list {
  transform: translate(-20%);
}

input[id="pic3"]:checked ~ .image-list {
  transform: translate(-40%);
}

input[id="pic4"]:checked ~ .image-list {
  transform: translate(-60%);
}
```

Whenever an input with the id pic1, pic2, etc., is checked, it applies a transform: translate() to the .image-list. This creates a smooth slide transition as the images move from one to the next.

The rest of the CSS involves general styles and styles for the custom radio buttons (the labels for the hidden input radio buttons). The magic behind this interaction lies in the following CSS rules:

```css
input {
  display: none;
}

.labels label {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: transparent;
  border: 3px solid #eff1f5;
  cursor: pointer;
  display: inline-block;
  margin: 0 0.5rem;
}

/* change radio button checked style */
input[id="pic1"]:checked ~ .labels label[for="pic1"],
input[id="pic2"]:checked ~ .labels label[for="pic2"],
input[id="pic3"]:checked ~ .labels label[for="pic3"],
input[id="pic4"]:checked ~ .labels label[for="pic4"] {
  background-color: #eff1f5;
}
```

Here we are using the `:checked` pseudo-class in conjunction with the General sibling combinator (`~`) to target the corresponding label for the selected radio button. When a radio button is selected, its corresponding label gets a new background color.

And there you have it! A fully functional, responsive image slider created with only HTML and CSS. This can be easily modified and expanded as needed to suit your website and its style.
