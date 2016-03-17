(function (root) {

    if(isNaN(root.timer) || root.timer == null){
        //дефолтное значение, если не установлено значение в константах
        root.timer = 3;
    }
    var rootTimerStep = (root.timer) * 2;
    var pathTimer = root.timer * 10;
    var pathTimerStep = pathTimer * 2;


    /**
     * функция отображает ячейку как пройденную
     * @param {number} x координата текущей ячейки по оси X
     * @param {number} y координата текущей ячейки по оси Y
     * @param {number} time время задержки, что бы различить шаги прохождения
     **/
    function setPathStyle(x, y, time) {
           setTimeout(function () {
           document.getElementsByClassName("maze")[0].children[y].children[x].className += " maze__cell_path";
       }, time);
    }


    /**
     * функция отображает  прохождение пути к выходу
     *
     * @param {[number, number][]} path маршрут к выходу представленный списоком пар координат
     **/
    root.showPath = function showPath(path) {
         setTimeout(function () {
             var pathReversed = path.reverse();
             var timer = pathTimer;
             while (pathReversed.length > 0) {
                timer += pathTimerStep;
                var cell = pathReversed.shift();
                setPathStyle(cell[0], cell[1], timer);
         }
        }, root.timer);
    };


    /**
     * функция отображает ранг ячейки
     *
     * @param {number} x координата текущей ячейки по оси X
     * @param {number} y координата текущей ячейки по оси Y
     * @param {number} currentValue  значение текущей ячейки
     **/
    root.showCellRange = function showPath(x, y, currentValue) {
        root.timer += rootTimerStep;
        setTimeout(function () {
            var el =  document.getElementsByClassName("maze")[0].children[y].children[x];
            el.childNodes[0].nodeValue = currentValue;
        }, root.timer);
    };



    root.showDefaultCellValue = function (element, maze,  x, y) {
        var currentValue = maze[y][x];
        element.appendChild(document.createTextNode(currentValue.toString()));
    }

    
})(this);
