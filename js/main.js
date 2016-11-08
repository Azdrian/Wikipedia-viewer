$(function() {
    
  $("#search-button").on("click", function() {
    
    $(".search-results").empty();
    
     var $searchWord = $("#search-box").val(),

         $url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + encodeURI($searchWord) +
         "&limit=8&format=json&callback=?",

         $searchTitle = '<h2 class="search-title"> Search results for: ' + ' " ' + $searchWord + ' " ' + '</h2>';

    $(".search-results").append($searchTitle);

    //makes request to mediawiki API and display the results
    $.ajax({
      url: $url,
      type: 'GET',
      dataType: 'jsonp',
      success: function($data) {
        //retrieve the data and format it to display
        for (var i = 0, len = $data[1].length; i < len; i++) {
          var $title = $data[1][i],
            $description = $data[2][i],
            $link = $data[3][i];

          if ($data[2][i] === "") {
            $data[2][i] = "No description";
          }

          $(".search-results").append(
            '<div class="result"><h3>Title: ' + $title + '</h3>' +
            '<p>Description: ' + $description + '</p>' +
            '<a href="' + $link + '" target="_blank">See full article here..</a></div>');
        }

      }
    });
  });

});
