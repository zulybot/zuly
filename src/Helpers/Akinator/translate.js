const translator = require('@vitalets/google-translate-api');

/**
 *
 * @param {String} string
 * @param {String} language
 */

module.exports = async function translate (string, language) {
	if (!string) return console.log('Translator: No Strings Provided!');
	if (!language) return console.log('Translator: No Language Provided!');

	if (language === 'zh') language = 'zh-CN';
	if (language === 'zhcn' || language === 'zh-cn') language = 'zh-CN';
	if (language === 'zhtw' || language === 'zh-tw') language = 'zh-TW';

	let translation = await translator(string, { to: language }).catch(e => console.log(e));
	return translation.text;
};