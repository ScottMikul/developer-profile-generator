const HTML5ToPDF = require("html5-to-pdf");
const path = require("path");
 
const run = async () => {
  const html5ToPDF = new HTML5ToPDF({
    inputPath: path.join(__dirname,  "index.html"),
    outputPath: path.join(__dirname, "output.pdf"),
    templatePath: path.join(__dirname, "templates", "basic"),
    
  });
  console.log("starting");
  await html5ToPDF.start();
  console.log("building");
  await html5ToPDF.build();
  console.log("closing");
  await html5ToPDF.close();
  console.log("exiting");
  process.exit(0);
}


module.exports = run;