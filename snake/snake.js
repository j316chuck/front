canvas = document.getElementById("canvas")
canvasContext = canvas.getContext("2d")
const FPS = 15
const WIDTH = canvas.width 
const HEIGHT = canvas.height
const SQUARE_SIZE = 10
const LEFTKEY = 37
const DOWNKEY = 38
const RIGHTKEY = 39 
const UPKEY = 40 


window.onload = () => {
    gameLoop()
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == LEFTKEY) { 
            snake.setDirection(-1, 0)
        } else if (event.keyCode == DOWNKEY) {
            snake.setDirection(0, -1)
        } else if (event.keyCode == RIGHTKEY) {
            snake.setDirection(1, 0)
        } else if (event.keyCode == UPKEY) {
            snake.setDirection(0, 1)
        }
    }, 1)
})

function gameLoop() {
    setInterval(update, 1000 / FPS)
}

function update() {
    snake.move()
    eatApple()
    draw()
} 

function eatApple() {
    if (snake.x == apple.x && snake.y == apple.y) {
        snake.items.unshift(snake.historicalItem)
        apple = new Apple(snake)
    }
}

function draw() {
    // clear canvas
    canvasContext.clearRect(0, 0, WIDTH, HEIGHT)
    // fill canvas black
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT)
    // draw snake
    snake.items.forEach((element) => {
        canvasContext.fillStyle = 'blue'
        canvasContext.fillRect(element.x, element.y, SQUARE_SIZE, SQUARE_SIZE)
    })
    // draw apple 
    canvasContext.fillStyle = 'red'
    console.log(apple.x)
    canvasContext.fillRect(apple.x, apple.y, SQUARE_SIZE, SQUARE_SIZE)
    
    // draw score 
    canvasContext.fillStyle = "green"
    canvasContext.fillText("Score: " + (snake.items.length - 1), canvas.width - 120, 18)
}

class Snake {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.historicalItem = null; 
        this.items = [
            {
                'x' : this.x, 
                'y' : this.y,
            }
        ]
        this.moveX = 1
        this.moveY = 0
    }

    checkHitWall() {
        if (this.x < 0) {
            this.x = this.x + WIDTH 
        } else if (this.x >= WIDTH) {
            this.x = this.x - WIDTH 
        } else if (this.y < 0) {
            this.y = this.y + HEIGHT 
        } else if (this.y >= HEIGHT) {
            this.y = this.y % HEIGHT
        }
    }

    move() {
        this.x += this.moveX * SQUARE_SIZE
        this.y += this.moveY * SQUARE_SIZE
        this.checkHitWall()
        
        this.historicalItem = this.items.shift()
        this.items.push({
          'x': this.x, 
          'y': this.y,  
        })
    }

    setDirection(moveX, moveY) {
        this.moveX = moveX
        this.moveY = moveY
    }
}

class Apple {
    constructor(snake) {
        this.snake = snake
        var unused, location = this.sampleNonCollidingPosition() 
        this.x = location[0]
        this.y = location[1]
    }

    sampleNonCollidingPosition() {
        let snakeLocations = new Set(
            this.snake.items.map((element) => (element.x * WIDTH + element.y))
        )
        let possibleLocations = new Array()
        for (let i = 0; i < WIDTH; i += SQUARE_SIZE) {
            for (let j = 0; j < HEIGHT; j += SQUARE_SIZE) {
                if (!snakeLocations.has(i * WIDTH + j)) {
                    possibleLocations.push([i, j])
                }
            }
        }
        let index = Math.floor(Math.random() * possibleLocations.length)
        return possibleLocations[index]
    }
}

const snake = new Snake(x=200, y=200)
let apple = new Apple(snake)

