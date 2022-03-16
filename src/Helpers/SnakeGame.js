const Discord = require('discord.js');
const WIDTH = 15;
const HEIGHT = 10;
const gameBoard = [];
const apple = { x: 1, y: 1 };

/**
 * The main class, initializes a new Snake game.
 */
class SnakeGame {
	constructor (options = {}) {
		this.snake = [{ x: 5, y: 5 }];
		this.snakeLength = 1;
		this.score = 0;
		this.gameEmbedMessage = null;
		this.inGame = false;
		this.options = options;
		for(let y = 0; y < HEIGHT; y++) {
			for(let x = 0; x < WIDTH; x++) {
				gameBoard[y * WIDTH + x] = '🟦';
			}
		}
	}

	/**
     * Creates a new game board for a Snake game.
     */
	gameBoardToString () {
		let str = '';
		for(let y = 0; y < HEIGHT; y++) {
			for(let x = 0; x < WIDTH; x++) {
				if(x == apple.x && y == apple.y) {
					str += '🍎';
					continue;
				}

				let flag = true;
				for(let s = 0; s < this.snake.length; s++) {
					if(x == this.snake[s].x && y == this.snake[s].y) {
						str += '🟩';
						flag = false;
					}
				}

				if(flag) {
					str += gameBoard[y * WIDTH + x];
				}
			}
			str += '\n';
		}
		return str;
	}

	isLocationInSnake (pos) {
		return this.snake.find(sPos => sPos.x == pos.x && sPos.y == pos.y);
	}

	/**
     * Moves the apple around the game board.
     */
	newAppleLocation () {
		let newApplePos = { x: 0, y: 0 };
		do {
			newApplePos = { x: parseInt(Math.random() * WIDTH), y: parseInt(Math.random() * HEIGHT) };
		} while(this.isLocationInSnake(newApplePos));

		apple.x = newApplePos.x;
		apple.y = newApplePos.y;
	}

	/**
     * Creates a new Snake game
     * @param {Discord.Message} msg - The message instance.
     */
	async newGame (msg) {
		if(this.inGame) {
			return;
		}

		this.inGame = true;
		this.score = 0;
		this.snakeLength = 1;
		this.snake = [{ x: 5, y: 5 }];
		this.newAppleLocation();
		const embed = new Discord.MessageEmbed()
			.setColor(this.options.color || 'RANDOM')
			.setTitle(this.options.title || 'Snake: The Game')
			.setDescription(this.gameBoardToString());

		if(this.options.timestamp) {
			embed.setTimestamp();
		}

		msg.channel.slashReply({ embeds: [embed] }).then(async (message) => {
			this.gameEmbedMessage = message;
			await this.gameEmbedMessage.react('⬅️');
			await this.gameEmbedMessage.react('⬆️');
			await this.gameEmbedMessage.react('⬇️');
			await this.gameEmbedMessage.react('➡️');

			this.waitForReaction();
		});
	}

	/**
     * Updates the game board (and the snake if it ate an apple).
     */
	step () {
		if(apple.x == this.snake[0].x && apple.y == this.snake[0].y) {
			this.score += 1;
			this.snakeLength++;
			this.newAppleLocation();
		}

		const editEmbed = new Discord.MessageEmbed()
			.setColor(this.options.color || 'RANDOM')
			.setTitle(this.options.title || 'Snake Game')
			.setDescription(this.gameBoardToString());

		if(this.options.timestamp) {
			editEmbed.setTimestamp();
		}

		this.gameEmbedMessage.edit({ embeds: [editEmbed] });
		this.waitForReaction();
	}

	gameOver () {
		this.inGame = false;
		const editEmbed = new Discord.MessageEmbed()
			.setColor(this.options.color || 'RANDOM')
			.setTitle(this.options.gameOverTitle || 'Game Over')
			.setDescription(`SCORE: **${this.score}**`);

		if(this.options.timestamp) {
			editEmbed.setTimestamp();
		}

		this.gameEmbedMessage.edit({ embeds: [editEmbed] });
		this.gameEmbedMessage.reactions.removeAll();
	}

	/**
     * Handles reactions on the game embed.
     */
	waitForReaction () {
		this.gameEmbedMessage.awaitReactions({ filter: (reaction, user) => {
			return ['⬅️', '⬆️', '⬇️', '➡️'].includes(reaction.emoji.name) && user.id !== this.gameEmbedMessage.author.id;
		}, max: 1, time: 60000, errors: ['time'] }).then(collected => {
			const reaction = collected.first();

			const snakeHead = this.snake[0];
			const nextPos = { x: snakeHead.x, y: snakeHead.y };
			if(reaction.emoji.name === '⬅️') {
				let nextX = snakeHead.x - 1;
				if(nextX < 0) {
					nextX = WIDTH - 1;
				}
				nextPos.x = nextX;
			}
			else if(reaction.emoji.name === '⬆️') {
				let nextY = snakeHead.y - 1;
				if(nextY < 0) {
					nextY = HEIGHT - 1;
				}
				nextPos.y = nextY;
			}
			else if(reaction.emoji.name === '⬇️') {
				let nextY = snakeHead.y + 1;
				if(nextY >= HEIGHT) {
					nextY = 0;
				}
				nextPos.y = nextY;
			}
			else if(reaction.emoji.name === '➡️') {
				let nextX = snakeHead.x + 1;
				if(nextX >= WIDTH) {
					nextX = 0;
				}
				nextPos.x = nextX;
			}

			reaction.users.remove(reaction.users.cache.filter(user => user.id !== this.gameEmbedMessage.author.id).first().id).then(() => {
				if(this.isLocationInSnake(nextPos)) {
					this.gameOver();
				}
				else {
					this.snake.unshift(nextPos);
					if(this.snake.length > this.snakeLength) {
						this.snake.pop();
					}

					this.step();
				}
			});
		}).catch(() => {
			this.gameOver();
		});
	}

	/**
     * Sets the custom (or default) title of the game embed.
     * @param {String} title
     */
	setTitle (title) {
		this.options.title = title || 'Snake: The Game';
		return this;
	}

	/**
     * Sets the custom (or default) color of the game embed.
     * @param {Discord.ColorResolvable} color
     */
	setColor (color) {
		this.options.color = color || 'RANDOM';
		return this;
	}

	/**
     * Sets the timestamp of the game embed if requested.
     */
	setTimestamp () {
		this.options.timestamp = true;
		return this;
	}
}

module.exports = SnakeGame;