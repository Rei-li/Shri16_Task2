(function (root) {
    var map = root.maze.MAZE_Y;
    document.querySelector('.outer').appendChild(
        root.maze.render(map, [])
    );
    root.maze.solution(map, 1, 0);

})(this);
