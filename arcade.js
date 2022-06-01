const BLOCK_SIZE = 50;
const COLOR_DATA = {
    BOARD: "#EEEEEE",
    PLAYER: [
        "#FFE162",
        "#FF6464"
    ],
    BLOCK: [
        [
            "#91C483"
        ]
    ],
    LINE: [
        [
            "#000000"
        ]
    ]
}

class App{
    constructor(){
        this.DOM = {};
        this.DOM.canvas = document.getElementById('canvas');
        this.DOM.gameBtn = document.querySelector("#gameBtn");
        this.ctx = canvas.getContext('2d');

        this.game = new Game(this);
    }

    init(){
        this.DOM.gameBtn.addEventListener('click', () => {
            if(!this.game.started){
                this.game.start();
            }
        });

        window.addEventListener('keydown', (e) => {
            if(this.game.started){
                this.game.keyEvent(e.keyCode, true);
                this.drawBoard();
            }
        });
        window.addEventListener('keyup', (e) => {
            if(this.game.started){
                this.game.keyEvent(e.keyCode, false);
                this.drawBoard();
            }
        });
    }
    
    drawBoard(){
        if(!this.game.started){
            return;
        }
        this.ctx.fillStyle = COLOR_DATA["BOARD"];
        this.ctx.fillRect(0, 0, 450, 350);

        this.game.players.forEach((player, idx) => {
            if(player){
                this.ctx.fillStyle = COLOR_DATA["PLAYER"][idx];
                this.ctx.beginPath();
                this.ctx.arc(player.x, player.y, 20, 0, 2*Math.PI);
                this.ctx.stroke();
                this.ctx.fill();
            }
        });
        function BubbleImg(path, len) {
            this.images = [];
            for (var i = 0; i < len; i++) {
                this.images[i] = new Image();
                this.images[i].src = path + i + '.png';
            }
            this.index = 0;
            this.len = len;
        
        }      
        BubbleImg.prototype.next = function () {
            this.index++;
            this.index %= this.len;
        }
        BubbleImg.prototype.image = function () {
            this.width = 30;
            this.height = 30;
            return this.images[this.index];
        }
        var img = new BubbleImg('./image/',5);
        for(let i = 0; i < 9; i++)
            for(let j = 0; j < 7; j++)
                if(this.game.map[i][j] != 0){
                        this.drawBlock({x : i, y : j, blockCode : 0});
                    }
                    this.game.bubbles.forEach((bubble) => {
                                           
                      //  img.src = './image/0.png';
                        this.ctx.beginPath();
                        img.next();
                        this.ctx.drawImage(img.image(), bubble.x * BLOCK_SIZE + 7 , bubble.y * BLOCK_SIZE + 8); //버블생성 및 크기
                      //  this.ctx.arc(bubble.x * BLOCK_SIZE + BLOCK_SIZE / 2, bubble.y * BLOCK_SIZE + BLOCK_SIZE / 2, 20, 0, 2 * Math.PI);
                        
                        this.ctx.closePath();
                    })
                    this.game.fieldItems.forEach((item) => {
                        this.ctx.beginPath();
                        this.ctx.fillStyle = "rgb(133, 204, 252)";
                        this.ctx.arc(item.x * BLOCK_SIZE + BLOCK_SIZE / 2, item.y * BLOCK_SIZE + BLOCK_SIZE / 2, 10, 0, 2 * Math.PI);
                        this.ctx.fill();
                        this.ctx.closePath();
                    });
                    
    }
    drawBombTrace(bombTraces){
        bombTraces.forEach((bombTrace) => {
            bombTrace.forEach((position) => {
                this.ctx.fillStyle = COLOR_DATA["BUBBLE"];
                this.ctx.fillRect(position.x * BLOCK_SIZE, position.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            });
        });
    }



    drawBlock({x, y, blockCode}){
        this.ctx.fillStyle = COLOR_DATA["BLOCK"][blockCode][0];
        this.ctx.strokeStyle = 'black';
        this.ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }


}
function Do_a_Frame() {
    img.next();
    this.ctx.drawImage(img.image(), bubble.x * BLOCK_SIZE + 7 , bubble.y * BLOCK_SIZE + 8);

    
}

function Bubbletime(){
    var timerId = null;
    timerId = setInterval(Do_a_Frame, 1000);

}
function Bubblebomb(){
    if(timerId != null){
        clearInterval(timerId);
    }
   
}

window.onload = () => {
    let app = new App();
    app.init();
}
