document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const width = 10;
  const ScoreDisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');

  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPosition = 4;
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];


  // draw & undraw the tetrominoes

  const draw = () => {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  };

  const undraw = () => {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
    });
  };

  // make the tetrominoes move down per second
  const freeze = () => {
    if (current.some(index =>
      squares[currentPosition + index + width].classList.contains('taken')
    )) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  const moveDown = () => {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  };

  // timerId = setInterval(moveDown, 500);

  const moveLeft = () => {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }

    draw();
  };

  const moveRight = () => {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

    if (!isAtRightEdge) {
      currentPosition += 1;
    }

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }

    draw();
  };

  const control = e => {
    if (e.keyCode === 37) { // left arrow key
      moveLeft();
    } else if (e.keyCode === 38) { // up arrow key
      // rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }

  document.addEventListener('keyup', control);

});