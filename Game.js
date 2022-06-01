class Game{
    constructor(app){
        this.app = app;
        this.map_default = [
            [0,0,1,1,1,1,0],
            [0,1,1,1,1,0,0],
            [0,1,1,1,1,1,0],
            [1,1,0,0,1,1,1],
            [1,0,1,0,1,0,1],
            [1,1,0,1,0,1,0],
            [1,0,1,1,1,1,1],
            [0,0,1,1,1,1,0],
            [1,1,0,1,1,0,0]
        ];
        this.map;
        this.timer;
        this.started = false;

        this.players = [];
        this.bubbles = [];

        this.bombTraces = [];

        this.keySetting = [
            [
                {key : 32, type: "bubble"},
                {key : 83, func: "Bottom", type: "move"},
                {key : 87, func: "Top", type: "move"},
                {key : 68, func: "Right", type: "move"},
                {key : 65, func: "Left", type: "move"},
            ],
            [
                {key : 191, type: "bubble"},
                {key : 37, func: "Left", type: "move"},
                {key : 38, func: "Top", type: "move"},
                {key : 39, func: "Right", type: "move"},
                {key : 40, func: "Bottom", type: "move"}
            ]
        ];

        this.fieldItems = [];
    }

    keyEvent(keyCode, type){
        this.keySetting.forEach((events, playerIdx) => {
            
            events.forEach((event) => {
                if(event.type == "move" && keyCode == event.key){
                    this.players[playerIdx].direct[event.func] = type;
                }else if(event.type == "bubble" && keyCode == event.key){
                    this.dropBubble({...this.players[playerIdx].position, playerIdx});
                } // 스페이스 누르면 드랍 버블
            });
        });
    }

    start(){
        this.frame();
        this.map = this.map_default;
        this.bubbles = [];
        this.players = [
            new Player(20, 20, this),
            new Player(430, 330, this)
        ];

        this.started = true;
        this.fieldItems = [];
    }

    frame(){
        this.timer = setInterval(() => {
            this.app.drawBoard();
            this.app.drawBombTrace(this.bombTraces);
            this.players.forEach((player) => {
                player.move({canvas : this.app.DOM.canvas, map : this.map, fieldItems : this.fieldItems});
            });
        }, 1000 / 60);
    }
    dropBubble({x, y, playerIdx}){
        if(this.bubbles.filter((bubble) => bubble.x == x && bubble.y == y).length == 0){
            if(this.players[playerIdx].live)
            if(this.players[playerIdx].bombDelay)
            if(this.bubbles.filter((bubble) => bubble.playerIdx == playerIdx).length < this.players[playerIdx].maxBombCount){
                this.bubbles.push(new Bubble(x, y, this.players[playerIdx].bombLength, playerIdx, this));
                this.players[playerIdx].bombDelay = false;
                setTimeout(() => {
                    this.players[playerIdx].bombDelay = true;
                }, 500);
            }
        }
    }//물풍선 설치
    bombBlock({x, y, self}){
        this.players.forEach((player) => {
            let pp = player.getBlockPosition();
            if(pp.x == x && pp.y == y){
                player.die();
                
            }
        });

        if(!self)
        this.bubbles.filter((bubble) => bubble.x == x && bubble.y == y).forEach(bubble => {
            this.deleteBubble(bubble);
            bubble.bomb();
        });

        this.fieldItems.filter((item) => item.x == x && item.y == y).forEach(item => {
            let idx = this.fieldItems.findIndex((fi) => fi == item);
            this.fieldItems.splice(idx, 1);
        });

        if(this.map[x][y] == 0){
            return false;
        }else if(this.map[x][y] == 2){
            return true;
        }else if(this.map[x][y] == 3){
            this.map[x][y] = 0;
            return false;
        }else{
            this.map[x][y] = 0;
            let rnd = Math.floor(Math.random() * 2);
            if(rnd == 0){
                this.fieldItems.push({x, y});
            }
            return true;
        }
    }

    deleteBubble(bubble){
        let idx = this.bubbles.findIndex((b) => b == bubble);
        this.bubbles.splice(idx, 1);
    } //bubble의 timer

}