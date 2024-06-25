Rian Salin - JAVASCRIPT inicial

document.addEventListener('DOMContentLoaded', () => {
    class Jogador {
        constructor(nome, simbolo) {
            this.nome = nome;
            this.simbolo = simbolo;
        }
    }

    class JogoDaVelha {
        constructor() {
            this.buttons = document.querySelectorAll('.game button');
            this.currentPlayerDisplay = document.querySelector('.currentPlayer');
            this.jogadores = [
                new Jogador('Jogador 1', 'X'),
                new Jogador('Jogador 2', 'O')
            ];
            this.currentPlayerIndex = 0;
            this.board = ['', '', '', '', '', '', '', '', ''];
            this.winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            this.init();
        }

        init() {
            this.buttons.forEach((button, index) => {
                button.addEventListener('click', () => this.handleMove(index));
            });
            this.updateDisplay();
        }

        handleMove(index) {
            if (this.board[index] === '' && !this.checkWinner()) {
                this.board[index] = this.currentJogador.simbolo;
                this.buttons[index].textContent = this.currentJogador.simbolo;
                const winner = this.checkWinner();
                if (winner) {
                    this.currentPlayerDisplay.textContent = `Vencedor: ${winner.nome}`;
                } else if (this.isBoardFull()) {
                    this.currentPlayerDisplay.textContent = 'Empate!';
                } else {
                    this.switchJogador();
                }
            }
        }

        get currentJogador() {
            return this.jogadores[this.currentPlayerIndex];
        }

        switchJogador() {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.jogadores.length;
            this.updateDisplay();
        }

        updateDisplay() {
            this.currentPlayerDisplay.textContent = `Jogador Atual: ${this.currentJogador.nome} (${this.currentJogador.simbolo})`;
        }

        checkWinner() {
            let winner = null;
            this.winningCombinations.forEach(combination => {
                const [a, b, c] = combination;
                if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                    winner = this.currentJogador;
                }
            });
            return winner;
        }

        isBoardFull() {
            return this.board.every(cell => cell !== '');
        }
    }

    
    new JogoDaVelha();
});
