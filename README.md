![Color Palette Generator - Preview](./meta-og.png)

# 🎨 Color Palette Generator

This is a **Color Palette Generator** built with **Node.js** using **Express.js** and **chroma-js**. It generates a beautiful 5-color palette every time, with varying shades of a randomly generated base color. Perfect for UI/UX designers looking for quick color inspiration! 🌈

## 🚀 Features

- Generates 5 matching colors as variants of a single base color 🎨.
- Each palette is assigned a unique ID, allowing users to retrieve it via the `/palette/:id` route.
- Built with **Express.js** for server-side logic and **chroma-js** for color manipulation.
- Simple and elegant UI for displaying the generated palette, with a refresh button to generate new palettes dynamically.
# Backend 😎

## 🛠️ Technologies Used

- **Node.js** & **Express.js**: Backend framework to handle routing.
- **Chroma.js**: For powerful color manipulation and palette generation.
- **HTML/CSS/Bootstrap**: For a clean, responsive UI.

## 🌟 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/color-palette-generator.git
cd color-palette-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
node app.js
```

### 4. Open the Application

Visit the app in your browser at:

```
http://localhost:3000
```

You will see an interface where you can generate a new 5-color palette. Press the **Generate** button to fetch a new color palette.

### 5. Retrieve a Palette by ID

To retrieve a specific palette, go to:

```
http://localhost:3000/palette/:id
```

Replace `:id` with the ID of the palette you want to view, for example:

```
http://localhost:3000/palette/C08552-F3E9DC-5E3023-DAB49D
```

## 🔧 How it Works

1. **Generating a Palette**: Each time you click the **Generate** button, a base color is randomly generated. From this base, 5 distinct color variants (different shades) are created.
2. **Unique ID**: Each generated palette has a unique ID made from the hexadecimal values of the colors, which can be used to retrieve the palette later.
3. **Using Chroma.js**: The power of **chroma-js** ensures that the generated colors are visually appealing, offering a variety of brightness levels.

## 🐛 Issues Encountered

Building this app wasn't without its challenges! Here are some of the problems we encountered and how we solved them:

1. **Dull Color Palettes**: Initially, we were getting dull and boring colors. The issue was due to the way we were generating shades from the base color. We switched to using `hsl.l` (lightness) adjustments for better visual results.
   
2. **Color Palette Variants**: At first, we used random colors that were too different from each other. After realizing that we needed variants of the same base color for consistency, we adjusted our approach to generate color scales with different lightness levels.

3. **Invalid Palette IDs**: When trying to retrieve a palette by ID, some IDs were invalid or incorrectly formatted. We fixed this by ensuring a strict format for the IDs and adding error handling for invalid IDs.

4. **Dynamic Palette Update**: Implementing a smooth update of the UI when a new palette was generated was tricky. By using simple JavaScript and handling the loader display correctly, we ensured a seamless experience for users when generating new palettes.

## ✨ Future Improvements

- Add support for saving favorite palettes in a database.
- Enhance the UI with animations for palette generation.
- Allow users to download the color palette in various formats like JSON, CSS, or an image.

## 🖼️ Example Palette

Here’s an example of the kind of palette the app generates:

```
Base Color: #C08552
Palette: 
#F3E9DC (Light)
#5E3023 (Dark)
#DAB49D (Neutral)
```

# Front-end🎉✨

# 🎨 Colour Palette display 

This Colour Palette Generator dynamically generates a palette of five colors and displays them in the UI. Users can interact with the palette by clicking the **Generate** button, and the palette ID is used to save and share specific color combinations. Here's how the layout works.

## 📄 HTML Layout

### Header
```html
<!-- Header -->
<header class="p-3 text-center">
   <h1>Colour Palette Generator</h1>
</header>
```
The header provides a clean and simple title for the application.

### Colour Boxes
```html
<!-- Colour Boxes -->
<section class="color-container">
   <div id="box1" class="color-box" style="background-color: #000000;">
      <span>#000000</span>
   </div>
   <div id="box2" class="color-box" style="background-color: #000000;">
      <span>#000000</span>
   </div>
   <div id="box3" class="color-box" style="background-color: #000000;">
      <span>#000000</span>
   </div>
   <div id="box4" class="color-box" style="background-color: #000000;">
      <span class="text-white">Hey!</span>
   </div>
   <div id="box5" class="color-box" style="background-color: #000000;">
      <span class="text-white"></span>
   </div>
</section>
```
This section contains the color boxes. Each box is a `div` that dynamically changes its background color based on the generated color palette. The `span` inside each `div` displays the color's hex value.

### Loader
```html
<!-- Loader -->
<section id="loader" class="loader">
   <div class="is-loading">
      <h3 id="load-text">Generating...</h3>
   </div>
</section>
```
This section contains a loader that appears when a new color palette is being generated. The loader disappears after the colors are loaded.

### Footer
```html
<!-- Footer -->
<footer class="d-flex justify-content-between align-items-center">
   <button onclick="gen()" class="btn btn-light">Generate</button>
   <button class="btn text-white" onclick="share(window.location.href)">
      <i class="fa-regular fa-share-from-square"></i>
   </button>
   <span class="">100daysofMiva-Marvelly</span>
</footer>
```
The footer contains a **Generate** button that triggers the color generation and a share button for social media sharing.

## 🚀 JavaScript Functionality

### Dynamic Color Generation
```javascript
const boxes = [
    document.getElementById('box1'),
    document.getElementById('box2'),
    document.getElementById('box3'),
    document.getElementById('box4'),
    document.getElementById('box5')
];

function updateBoxes(colors) {
    colors.forEach((color, index) => {
        boxes[index].style.backgroundColor = color;
        boxes[index].querySelector('span').textContent = color;
    });
}
```
This JavaScript code dynamically updates the colors in the color boxes when a new palette is generated. The colors are applied to each `div` element in the UI.

### Palette Generation Logic
```javascript
async function gen() {
    // Show the loader
    loader.style.display = 'block';

    try {
        const response = await fetch('/palette');
        const data = await response.json();

        // Update the boxes with the new colors
        updateBoxes(data.palette);

        // Update the URL with the new ID
        history.pushState({}, '', `/${data.id}`);

        loader.style.display = 'none';
    } catch (error) {
        console.error('Error fetching palette:', error);
        loader.style.display = 'none';
    }
}
```
The `gen()` function fetches a new color palette from the `/palette` API route, updates the color boxes, and modifies the browser URL with the new palette ID.

### Share Functionality
```javascript
function share(url) {
    Swal.fire({
        heightAuto: false,
        title: 'Share this Color Palette!',
        html: `
            <div style="display: flex; justify-content: space-around; font-size: 24px;">
                <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(url)}" target="_blank" title="Share on WhatsApp">
                    <i class="fab fa-whatsapp" style="color: #25D366;"></i>
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" title="Share on Facebook">
                    <i class="fab fa-facebook" style="color: #3b5998;"></i>
                </a>
                <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}" target="_blank" title="Share on Twitter">
                    <i class="fab fa-twitter" style="color: #1DA1F2;"></i>
                </a>
                <a href="https://www.instagram.com/?url=${encodeURIComponent(url)}" target="_blank" title="Share on Instagram">
                    <i class="fab fa-instagram" style="color: #E1306C;"></i>
                </a>
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: false,
    });
}
```
The `share()` function allows users to share the current color palette via social media platforms like WhatsApp, Facebook, Twitter, Instagram, and Telegram using SweetAlert popups.

### URL-Based Color Loading
```javascript
// Check if an id is present in the URL
const currentPath = window.location.pathname;
const paletteId = currentPath.substring(1);

if (paletteId) {
    loadPaletteById(paletteId);
} else {
    gen();
}
```
This functionality checks if there is a color palette ID in the URL when the page is loaded. If an ID is present, the corresponding palette is loaded. Otherwise, a new palette is generated.

## 🌟 Problems Encountered
- **Dull Colors**: Initially, the colors generated were too dull for UI/UX purposes. We addressed this by adjusting the brightness scale to ensure vibrant and harmonious colors.
- **Hex Values Misplacement**: At one point, the hex values were not displaying properly inside the color boxes. This was fixed by ensuring the `span` elements were correctly updated with the hex values.
- **Palette Sharing**: Creating a robust sharing mechanism for various social media platforms was a bit challenging but ultimately solved using SweetAlert for the UI and share links for each platform.


```

## 📜 License

This project is licensed under the GPL 3 License.

---
