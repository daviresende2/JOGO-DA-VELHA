Rian Salin - JAVASCRIPT inicial
Davi Resende - JAVASCRIPT Atualizado com Local Storage para placar, botões responsivos e funcionalidade para elencar os vencedores.

document.addEventListener('DOMContentLoaded', () => {
    class Jogador {
        constructor(nome, simbolo) {
            this.nome = nome;
            this.simbolo = simbolo;
            this.pontos = 0;
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
            this.loadFromLocalStorage();
            this.buttons.forEach((button, index) => {
                button.addEventListener('click', () => this.handleMove(index));
            });
            this.updateDisplay();

            // Adiciona evento ao botão "NOVO JOGO"
            document.getElementById('novoJogoBtn').addEventListener('click', () => this.novoJogo());
        }

        handleMove(index) {
            if (this.board[index] === '' && !this.checkWinner()) {
                this.board[index] = this.currentJogador.simbolo;
                this.buttons[index].textContent = this.currentJogador.simbolo;
                const winner = this.checkWinner();
                if (winner) {
                    this.currentPlayerDisplay.textContent = `Vencedor: ${winner.nome}`;
                    winner.pontos++;
                    this.updatePlacar();
                    this.saveToLocalStorage();
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
            this.currentPlayerDisplay.textContent = `Jogador atual: ${this.currentJogador.nome} (${this.currentJogador.simbolo})`;
        }

        updatePlacar() {
            document.getElementById('jogador1Nome').textContent = this.jogadores[0].nome;
            document.getElementById('jogador1Pontos').textContent = this.jogadores[0].pontos;
            document.getElementById('jogador2Nome').textContent = this.jogadores[1].nome;
            document.getElementById('jogador2Pontos').textContent = this.jogadores[1].pontos;
        }

        checkWinner() {
            for (let combination of this.winningCombinations) {
                const [a, b, c] = combination;
                if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                    return this.currentJogador;
                }
            }
            return null;
        }

        isBoardFull() {
            return this.board.every(cell => cell !== '');
        }

        saveToLocalStorage() {
            localStorage.setItem('jogadores', JSON.stringify(this.jogadores));
        }

        loadFromLocalStorage() {
            const jogadoresData = localStorage.getItem('jogadores');
            if (jogadoresData) {
                this.jogadores = JSON.parse(jogadoresData).map(data => new Jogador(data.nome, data.simbolo));
                this.updatePlacar();
            }
        }

        novoJogo() {
            this.board = ['', '', '', '', '', '', '', '', ''];
            this.buttons.forEach(button => button.textContent = '');
            this.currentPlayerIndex = 0;
            this.updateDisplay();
            this.currentPlayerDisplay.textContent = ''; // Limpa o texto de vencedor/empate
        }
    }

    new JogoDaVelha();
});

