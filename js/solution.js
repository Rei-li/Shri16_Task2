(function (root) {
    var EMPTY = root.maze.EMPTY;

    var path = [];
    var leaves = [];

    var start_x;
    var start_y;

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y) {
        start_x = x;
        start_y = y;
        maze[y][x]++;
        leaves.push([x, y]);
        var results = setElementRange(maze);
        if(results != undefined) {
            var exit_X = results[0];
            var exit_Y = results[1];
            var resultsContainer = [results];
            getReturnPath(maze, exit_X, exit_Y, maze[exit_Y][exit_X], resultsContainer);
            if (path.length > 0) {
                root.showPath(path);
            }
        }
        return path;
    }


    /**
     * функция проходит по ячейкам, назначая им ранг по удаленности от точки старта
     *
     * @param {number[][]} maze карта лабиринта, с уже проиндексированными ячейками
     * @returns {[number, number]} пара координат точки выхода
     **/
    function setElementRange(maze) {
        var results;

        // индексируем ячейки, пока не будет найден выход,
        // который будем считать ближайшим, даже если есть еще выходы
        while (leaves.length > 0 &&  results == undefined) {
            var leaf = leaves.shift();

            var x = leaf[0];
            var y = leaf[1];

            var currentValue = maze[y][x];

            root.showCellRange(x, y, currentValue);

            // проверяем ячейку слева
            if (x - 1 >= 0 && maze[y][x - 1] == EMPTY) {
                maze[y][x - 1] = currentValue + 1;
                leaves.push([x - 1, y])

            }
            // проверяем ячейку справа
            if (x + 1 < maze[y].length && maze[y][x + 1] == EMPTY) {
                maze[y][x + 1] = currentValue + 1;
                leaves.push([x + 1, y])

            }
            // проверяем ячейку сверху
            if (y - 1 >= 0 && maze[y - 1][x] == EMPTY) {
                maze[y - 1][x] = currentValue + 1;
                leaves.push([x, y - 1])

            }
            // проверяем ячейку снизу
            if (y + 1 < maze.length && maze[y + 1][x] == EMPTY) {
                maze[y + 1][x] = currentValue + 1;
                leaves.push([x, y + 1]);

                // т.к. по условию точки выхода всегда удовлетворяют условию y=M,
                // проверяем, не достигли ли выхода при сдвиге вниз
                if (y + 1 == maze.length - 1) {
                     results = [x, y + 1];
                    root.showCellRange(x, y + 1, currentValue + 1);
                }
            }
        }
        return results;
    }


  /**
   * функция восстанавливает путь проходом по ячейкам с значениями, последовательно уменьшающимися на 1
   *
   * @param {number[][]} maze карта лабиринта, с уже проиндексированными ячейками
   * @param {number} x координата текущей проверенной точки пути по оси X
   * @param {number} y координата текущей проверенной точки пути по оси Y
   * @param {number} range  значение текущей ячейки
   * @param {number[][]} results ячейки уже принятые как путь
  **/
    function getReturnPath(maze, x, y, range, results) {

        //если достигли точки старта, возвращаем найденный путь
        if (x == start_x && y == start_y) {
            path = results;
        } else {
            var iterationResults = [];
            // проверяем значение ячейки слева
            if (x - 1 >= 0 && maze[y][x - 1] == range - 1) {
                iterationResults.push([x - 1, y]);
            }
            // проверяем значение ячейки справа
            if (x + 1 <= maze[y].length && maze[y][x + 1] == range - 1) {
                iterationResults.push([x + 1, y]);
            }
            // проверяем значение ячейки снизу
            if (y - 1 >= 0 && maze[y - 1][x] == range - 1) {
                iterationResults.push([x, y - 1]);
            }
            // проверяем значение ячейки сверху
            if (y + 1 < maze.length && maze[y + 1][x] == range - 1) {
                iterationResults.push([x, y + 1]);
            }

            // возможно, что из ячейки можно выйти несколькими путями и они будут одинаково оптимальны,
            // но для решеня задачи нам достаточного одного, потому просто берем первый
            if (iterationResults.length > 0) {
                results.push([iterationResults[0][0], iterationResults[0][1]]);
                getReturnPath(maze, iterationResults[0][0], iterationResults[0][1], range - 1, results);
            }
        }
    }

    root.maze.solution = solution;
})(this);
