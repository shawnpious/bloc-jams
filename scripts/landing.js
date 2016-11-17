var animatePoints = function () {
      
    var points = document.getElementsByClassName('point');
    var  revealPoint = function (index) {
            points[index].style.opacity = 1;
            points[index].style.transform = "stranslateY(0)";
            points[index].style.msTransform = "stranslateY(0)";
            points[index].style.WebkitTransform = "stranslateY(0)";
            
        };
   
    for (var i = 0; i < points.length; i++) {
                
                revealPoint(i);
            }
    

};
