const HTML5ToPDF = require("html5-to-pdf");
const path = require("path");
 
const run = async () => {
  const html5ToPDF = new HTML5ToPDF({
    inputPath: path.join(__dirname,  "index.html"),
    outputPath: path.join(__dirname, "output.pdf"),
    templatePath: path.join(__dirname, "templates", "basic"),
    
  });

  await html5ToPDF.start();
  await html5ToPDF.build();
  await html5ToPDF.close();
  process.exit(0);
}


module.exports = run;