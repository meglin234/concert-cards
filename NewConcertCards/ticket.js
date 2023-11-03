function createDivsFromCSV(csv) {
  var lines = csv.split("\n");
  var headers = lines[0].split(",");
  var cssClasses = ["artist", "show", "opener", "datevenue"]; // Array of CSS class names
  var imageUrl = "path/to/image.jpeg"; // Variable holding the image URL


  for (var i = 1; i < lines.length; i++) {
    var cells = lines[i].split(",");
    var div = document.createElement("div");
    div.classList.add("ticket");
  

    for (var j = 0; j < cells.length; j++) {
      var span = document.createElement("span");

        if (j < 4) {
          span.textContent = cells[j];
        }

        if (cssClasses[j]) {
          span.classList.add(cssClasses[j]);
        }
      
      
      // Assign the last column to be the image url
      if (j === 4) { 
        div.style.backgroundImage = `url(${cells[j]})`;
        div.style.backgroundSize = "cover";
        
      }
      
      div.appendChild(span);
    }

    document.body.appendChild(div);
  }
}

// Get the data 
fetch('data/ConcertTicketData.csv') 
  .then(response => response.text())
  .then(csvData => createDivsFromCSV(csvData));




  // backend preprocessing in python - go straight from sheets/database to website //