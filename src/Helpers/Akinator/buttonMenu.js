/**
 * @param {Discord.Client} client The Discord Client.
 * @param {any} input The Message Sent by the User.
 * @param {Discord.Message} botMessage The Message for the Bot to Send, also the message which will contain the buttons (Max. 8). MUST BE AN EMBED!
 * @param {Discord.MessageButton[]} buttons An Array of Buttons.
 * @param {Number} time Time in Milliseconds the Menu should last for.
 */

module.exports = async function(client, input, botMessage, buttons, time) {
	// check all our params exist
	if (!client) return console.log('Button Menu Error: No Client Provided!');
	if (!input) return console.log('Button Menu Error: No Message Provided!');
	if (!botMessage) return console.log('Button Menu Error: No Bot Message Provided!');
	if (!buttons) return console.log('Button Menu Error: No Buttons Provided!');
	if (!time) return console.log('Button Menu Error: No Time Provided!');

	let buttonRow = { type: 1, components: [] };
	let buttonRow2 = { type: 1, components: [] };
	let buttonRow3 = { type: 1, components: [] };
	let buttonRows = [];

	for (let i = 0; i < buttons.length; i++) {
		if (i < 3) {
			buttonRow.components.push(buttons[i]);
		}
		else if (i < 5) {
			buttonRow2.components.push(buttons[i]);
		}
		else {
			buttonRow3.components.push(buttons[i]);
		}

	}

	buttonRows.push(buttonRow);
	if (buttons.length >= 5) buttonRows.push(buttonRow2);
	if (buttons.length >= 7) buttonRows.push(buttonRow3);

	botMessage = await botMessage.edit({ embeds: [botMessage.embeds[0]], components: buttonRows });
	// create our collector
	const filter = (i) => {
		if (i.user == input.author.id) {
			return true;
		}
		else {
			i.deferUpdate();
			return false;
		}
	};

	let selection;

	await botMessage.awaitMessageComponent({
		filter: filter,
		time: 60000,
	})
		.then(async (i) => {
			selection = i;
		}).catch(() => {
			// do nothing
		});

	return selection;
};
