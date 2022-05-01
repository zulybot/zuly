const buttonMenu = require('./buttonMenu');
const translate = require('./translate');

/**
 * @param {boolean} useButtons If true, use buttons. If false, use text input
 * @param {any} input The Message Sent by the User.
 *
 */

module.exports = async function awaitInput (useButtons, input, botMessage, isGuessFilter, translations, language) {
	// check if useButtons is true. If so, use buttons.  If not, use text input
	if (useButtons) {

		let yes = { type: 2, label: translations.yes, style: 2, custom_id: '✅', emoji: { name: '✅' } };
		let no = { type: 2, label: translations.no, style: 2, custom_id: '❌', emoji: { name: '❌' } };
		let idk = { type: 2, label: translations.dontKnow, style: 2, custom_id: '❓', emoji: { name: '❓' } };
		let probably = { type: 2, label: translations.probably, style: 2, custom_id: '👍', emoji: { name: '👍' } };
		let probablyNot = { type: 2, label: translations.probablyNot, style: 2, custom_id: '👎', emoji: { name: '👎' } };
		let back = { type: 2, label: translations.back, style: 2, custom_id: '⏪', emoji: { name: '⏪' } };
		let stop = { type: 2, label: translations.stop, style: 4, custom_id: '🛑', emoji: { name: '🛑' } };

		let answerTypes = [];

		answerTypes = isGuessFilter ? [yes, no] : [yes, no, idk, probably, probablyNot, back, stop];

		let choice = await buttonMenu(input.client, input, botMessage, answerTypes, 60000);
		return !choice ? null : choice;
	}
	else {
		let filter;
		filter = isGuessFilter ? x => {
				return x.author.id === input.author.id && [
					'y',
					translations.yes.toLowerCase(),
					'n',
					translations.no.toLowerCase(),
				].includes(x.content.toLowerCase());
			} : x => {
				return x.author.id === input.author.id && [
					'y',
					translations.yes.toLowerCase(),
					'n',
					translations.no.toLowerCase(),
					'i',
					'idk',
					translations.dontKnowNoComma.toLowerCase(),
					translations.dontKnow.toLowerCase(),
					'p',
					translations.probably.toLowerCase(),
					'pn',
					translations.probablyNot.toLowerCase(),
					'b',
					translations.back.toLowerCase(),
					's',
					translations.stop.toLowerCase(),
				].includes(x.content.toLowerCase());
			};
		let response = await input.channel.awaitMessages({
			filter: filter,
			max: 1,
			time: 60000
		});

		if (!response.size) {
			return null;
		}
		else {
			await response.first().delete();
			return translate(String(response.first()).toLowerCase(), language);
		}

	}
};
