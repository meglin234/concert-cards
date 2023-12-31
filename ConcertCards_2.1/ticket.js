// Specify the path to your CSV file
    const csvFilePath = 'data/ProcessedTicketData.csv';

    // Read and process the CSV file
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvContent => {
        const rows = csvContent.split('\n');

        // Remove the existing tickets
        document.getElementById('tickets-container').innerHTML = '';

        // Process each row
        rows.forEach((row, index) => {
          const values = row.split('/');

          // Skip the header row
          if (index > 0) {
            createTicket(values);
          }
        });
      });

    // Create tickets
    function createTicket(data) {
      const ticketContainer = document.getElementById('tickets-container');

      // Create a ticket div
      const ticketDiv = document.createElement('div');
      ticketDiv.className = 'ticket';

      // Create ticket main div
      const ticketMainDiv = document.createElement('div');
      ticketMainDiv.className = 'ticket-main';
      ticketMainDiv.style.backgroundImage = `url('images/${data[0]}')`;
      ticketMainDiv.style.backgroundSize = "cover";

      // Create other ticket elements
      const elements = ['artist', 'show', 'opener', 'datevenue'];
      elements.forEach((element, index) => {
        const div = document.createElement('div');
        div.className = element;
        div.textContent = data[index + 1];
        ticketMainDiv.appendChild(div);
        
      });
        

      // Append ticket main div to ticket div
      ticketDiv.appendChild(ticketMainDiv);

      // Create ticket stub div
      const ticketStubDiv = document.createElement('div');
      ticketStubDiv.className = 'ticket-stub';

      // Create seats divs
      const seatLabels = ['date-content', 'date-content', 'date-content', 'seats-content', 'seats-content', 'seats-content', 'seats-info-content', 'seats-info-content', 'seats-info-content'];
      seatLabels.forEach((label, index) => {
        const div = document.createElement('div');
        div.className = 'seats';
        div.innerHTML = `<div class="seats-header"><div class="${label}">${data[index + 5]}</div></div>`;
        ticketStubDiv.appendChild(div);
      });

      // Append ticket stub div to ticket div
      ticketDiv.appendChild(ticketStubDiv);

      // Append ticket div to the container
      ticketContainer.appendChild(ticketDiv);
    }

    

    