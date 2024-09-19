const express = require('express');
const chroma = require('chroma-js');
const path = require('path');
const app = express();
const PORT = 3001;
app.use(express.static(__dirname));

// Function to generate a color palette with 5 shades/variants of a base color
function generatePalette(baseColor) {
   // Define the lightness steps for the shades
   const lightnessSteps = [0.9, 0.7, 0.5, 0.3, 0.1]; // From lightest to darkest

   // Generate the palette with shades/variants of the base color
   const palette = lightnessSteps.map(step => chroma(baseColor).set('hsl.l', step).hex());

   return palette;
}

// Route to get a new 5-color palette and id
app.get('/palette', (req, res) => {
   const baseColor = chroma.random().hex(); // Generate a random base color
   const palette = generatePalette(baseColor); // Generate a 5-shade palette

   // Create the ID by removing '#' from the colors and concatenating them
   const id = palette.map(color => color.replace('#', '')).join('-');

   res.json({
      id,
      palette
   });
});

// Route to get a palette by its id
app.get('/palette/:id', (req, res) => {
   const {
      id
   } = req.params;
   const colorArray = id.split('-').map(color => `#${color}`);

   if (colorArray.length !== 5) {
      return res.status(400).json({
         error: 'Invalid ID format'
      });
   }

   res.json({
      id,
      palette: colorArray
   });
});

//Serve index.html for all other routes except API routes
app.get('/:id', (req, res) => {
   const idPattern = /^[0-9a-fA-F-]{29,}$/; // Pattern to match the color palette ID format
   const {
      id
   } = req.params;

   if (idPattern.test(id)) {
      res.sendFile(path.join(__dirname, 'index.html'));
   } else {
      res.status(404).json({
         status: 404,
         error: 'Not Found',
         marvelly: 'why are you here?',
      });
   }
});


app.listen(PORT, () => {
   console.log(`Color palette by Marvelly is running on Port:${PORT}`);
});