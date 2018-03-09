
      function filterTable() {
        // Declare variables 
        var input, filter, table, tr, td, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("resultsTable");
        tr = table.getElementsByTagName("tr");

          // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td");
          for (cell = 0; cell < td.length; cell++) {
            if (td[cell]) {
              if (td[cell].innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
              } else {
                tr[i].style.display = "none";
              }
            }
          } 
        }
      }
      



      function addRow(protocol,ciphersuite,supported)
      {
         if (!document.getElementsByTagName) return;
         tabBody=document.getElementsByTagName("tbody").item(0);
         row=document.createElement("tr");
         cell1 = document.createElement("td");
         cell2 = document.createElement("td");
         cell3 = document.createElement("td");
         textnode1=document.createTextNode(protocol);
         textnode2=document.createTextNode(ciphersuite);
         textnode3=document.createTextNode(supported);
         cell1.appendChild(textnode1);
         cell2.appendChild(textnode2);
         cell3.appendChild(textnode3);
         if (supported == false) {cell3.style.color='red';} else {cell3.style.color='green';}
         row.appendChild(cell1);
         row.appendChild(cell2);
         row.appendChild(cell3);
         tabBody.appendChild(row);
      }

      function callTlsChecker() {
        var host = document.getElementById("host").value;
        var port = document.getElementById("port").value;
        var url = 'https://tlschecker.azurewebsites.net/' + host + '/' + port;
        // Clean up table first
        for(var i = document.getElementById("resultsTable").rows.length; i > 1;i--)
        {
          document.getElementById("resultsTable").deleteRow(i -1);
        }


        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
       


        xhr.send();

        xhr.onload = function() {
          var text = xhr.responseText;
          var results = JSON.parse(text);

          results.Result.forEach(element => {
            if (document.getElementById('onlysupported').checked) {
              if (element.Supported == true) {
                addRow(element.Protocol, element.CipherSuite, element.Supported);
              };
            } else {
                addRow(element.Protocol, element.CipherSuite, element.Supported);
            };
          });
        };
      }


