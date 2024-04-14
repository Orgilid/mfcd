fetch("http://127.0.0.1:5500/data.html")
  .then(r => {   
    return r.text();
  })
  .then(t => {    
    let j = JSON.parse(t);    
    let foodCompositionData = j.FoodComposition.FoodName;
    // let foodGroups = j.FoodComposition.FoodGroups;
   
    $(function () {
      var proximates = ['Energy','Water','Protein','Fat','Ash','Carbohydrate','Total dietary fiber'];
      var minerals = ['Calcium','Iron','Magnesium','Phosphorus','Potassium','Sodium'];
      var vitamins = ['Vitamin A','Thiamin','Riboflavin','Folic acid','Vitamin C'];
      var localFoods = ['kumis, milk, mare, from khangai','Milk, camel, fermented','Milk, yak, raw','Milk, reindeer, raw','Blueberry, wild', 'Seabuckthorn, fruit','Cranberry, wild','Cedar (pine) nut kernels','Barley, whole, raw'];
      var divResult = '#divResult';
      var divLocal = '#divLocal';
      
      // var divSearch = '#ulFoodGroup';
      
      // Цорын ганц id үүсгэхэд хэрэглэв
      var too = 0;

      // getFoodList(foodGroups);
           
      // localFoods list-д оруулсан нэрээр хайгаад #divLocal руу гаргах
      $(divLocal).empty();
      localFoods.map(el => getFood(el, divLocal, true));

      // btn дээр click хийхэд хайх
    $('#btnSearch').on('click', function () {     
      $('input[type="checkbox"]:checked').prop( "checked", false );
      $(divResult).empty();
      let txtValue = $('#txt').val();      
      getFood(txtValue, divResult);        
    });

    // checkbox-оос сонгосон хүнсээр хайх
    $('input[type="checkbox"]').change(function () {
      $(divResult).empty();
      var chk = $('input[type="checkbox"]:checked');
      if (chk.length > 0) {
          chk.each(function () {
          let selectedValue = $(this).val();
          getFood(selectedValue, divResult); 
        });        
      }
    });

    // Хүнсний нэрээр хайгаад article үүсгэх
    function getFood(foodName, div, img = false) {
      $.each(foodCompositionData, function (index, element) {

        var fnData = editTxt(index);
        var fnTxt = editTxt(foodName);

        if (fnData == fnTxt)
        {
          too = too + 1;
          var articleId = fnData.replace(/ /gi, "_") + '-' + too.toString();          
          $(div).append('<article id=' + articleId + ' class="card"></article>');

          if (img == true)
          {
            var imgId = articleId + '-img';          
            $('#'+ articleId).append('<img id="' + imgId + '" src="img/food/' + fnData.replace(/ /gi, "_") + ".jpg" + '" alt="">');
          }
       
          $('#'+ articleId).append('<h3 class="listHeading">' + firstUpperCase(index) + '</h3>');

          getNutrition('proximates', element, proximates, articleId, too);
          getNutrition('minerals', element, minerals, articleId, too);
          getNutrition('vitamins', element, vitamins, articleId, too);          
        }
                
      });
    }

    // Nutrition бүрээ ul li үүсгэх
    function getNutrition(nutritionName, el , arr, articleId, too) {
      $('#' + articleId).append('<h4 class="listSubHeading">' + firstUpperCase(nutritionName) + '</h4>');
      
      var ulId = nutritionName + '-'+ too.toString();
      $('#' + articleId).append('<ul class="list" id="' + ulId + '"></ul>');         
      
      for (var i = 0; i < el[nutritionName].length; i++) {
        var newListItem = $('<li>' + arr[i] + ': <span>' + el[nutritionName][i] + '</span></li>');
        $('#' + ulId).append(newListItem);
      } 
    }
    // Эхний үсгийг том болгох
    function firstUpperCase(txt) {return txt.substr(0,1).toUpperCase() + txt.substr(1);}
   
    // Хайх текстийг хэлбэржүүлэх
    function editTxt(txt) {return txt.toLowerCase().trim().replace(/,/gi, '').replace('(','').replace(')','').replace("%",'');}
    

    // function getFoodList(foodGroups){
    //   $.each(foodGroups, function (index, element) {
        
    //     var liId = index.replace(/ |,/gi, "_").replace('(','').replace(')','').replace("%",''); 
    //     $(divSearch).append('<li id="' + liId + '"> <i class="fas fa-chevron-right"></i>' + index + '</li>');
        
    //     var ulId = liId + 'ul';
    //     $('#' + liId).append('<ul class="sublist" id="' + ulId + '"></ul>');

    //     for (var i = 0; i < element.length; i++) {
    //       var subListItem = $('<li>' + element[i] + '</li>');
    //       $('#' + ulId).append(subListItem);
    //     }
    //   });
    // }

    // var b = true;
    // $('#listSearch ul li').on('click', function () {
    //   if (b) {
    //     $('#listSearch ul li ul').css("display", "block");
    //     $('#listSearch ul li ul').css("position", "relative");
    //     b = false;
    //   }
    //   else {
    //     $('#listSearch ul li ul').css("display", "none");
    //     b = true;
    //   }      
    // });


    // $('#listSearch ul li').each(function () {
    //   $(this).focus(function () {
    //       $(this).addClass('textBoxStyle');
    //   });
    //   $(this).blur(function () {
    //       $(this).removeClass('textBoxStyle');
    //   });
    // });



  });
    
});