import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios'
import cheerio from 'cheerio';
import https from 'https';

const cmc = `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?CMC_PRO_API_KEY=${process.env.CMC_KEY}&amount=1&symbol=`
const hostname = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`
const botname = "@yakoolbot"
let chatId: string
let inlineId: string

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

	try {
		const bodyJson = JSON.parse(event.body + '')
		const hook = bodyJson
		let text = ''

		if (!!hook.message) {

			chatId = hook.message.chat.id
			text = hook.message.text
			if (hook.message.via_bot) {

				return { statusCode: 0 }
			}
		}
		if (!!hook.inline_query) {

			text = hook.inline_query.query
			inlineId = hook.inline_query.id
		}

		const words = text.toUpperCase().split(' ').filter(w => w !== botname);

		// Stock
		if (['CK', 'C', '/CK', '/C'].includes(words[0])) {
			if (words.length > 1) {
				const code = words[1];
				const url = `https://s.cafef.vn/ajax/StockChartV3.ashx?symbol=${code}`
				const response = await axios.get(url) as any
				const data = response.data.realtimePrice
				const message = `<code>${code}</code> <b>${data[data.length - 1][1]}</b>`;
				_sendMessage(message, chatId, inlineId);
				return { statusCode: 200, data: message }
			}
			return { statusCode: 200 }
		}

		// Vietlott
		if (['VL', '/VL'].includes(words[0])) {
			const rs = await check();
			const message = `<code>${rs}</code>`;
			await _sendMessage(message, chatId, inlineId);
			return { statusCode: 200 }
		}

		// Default - coin
		const code = words[0].replace("/", "");
		const rs = await axios.get(`${cmc}${code}`);
		const data = rs.data.data[0];
		_sendMessage(`<code>${code}</code> <b>${data.quote.USD.price}</b>`, chatId, inlineId);

	}
	catch (err) {
		console.log('xxx', err)
		await _sendMessage('Cắc!', chatId, inlineId)
	}
	return { statusCode: 200 }
};

export { handler };

function _sendMessage(message: string, chatId: string | number | undefined, inlineId: string | undefined): any {

	if (inlineId) {
		return axios.post(`${hostname}/answerInlineQuery`, {
			inline_query_id: inlineId,
			results: [
				{
					type: "article",
					id: "1",
					title: "Hasagiiii",
					input_message_content: {
						message_text: message,
					},
				},
			],
		});
	}

	if (chatId) {
		return axios.post(`${hostname}/sendMessage`, {
			chat_id: chatId,
			text: message,
			parse_mode: "HTML",
		});
	}

	return Promise.resolve(1)
}




async function getSpanText(url: string): Promise<string> {
	// Fetch the HTML page
	console.log('xxx', url)
	const html = await getHtmlString(url)

	// Parse the HTML using cheerio
	const $ = cheerio.load(html);

	// Find the div element by its class name
	const my_div = $('.day_so_ket_qua_v2');

	// Find all the span elements inside the div
	const my_spans = my_div.find('span');

	// Get the text contents of each span element
	const date = $('.chitietketqua_title').find('b').eq(1).text();

	const span_text = my_spans.toArray().map((span) => $(span).text());

	// Return the list of span text
	return date + ' - ' + span_text.join('-');
}

async function getHtmlString(url: string): Promise<string> {
	try {
		const rs = await axios({
			url,
			method: 'get',
			httpsAgent: new https.Agent({ rejectUnauthorized: false }),
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
			}
		})
		return rs.data
	} catch (err) {
		console.log(err)
		return ''
	}
}

async function check(): Promise<string> {
	const vipurl = 'https://103.68.77.68/vi/trung-thuong/ket-qua-trung-thuong/'
	const red = await getSpanText(vipurl + '645');
	const yellow = await getSpanText(vipurl + '655');
	const r = yellow + '\n' + red;
	console.log(r)
	return r
}



//
//  curl -X POST localhost:8888/.netlify/functions/telehook -H 'Content-Type: application/json' -d '{"message":{"text": "vl", "chat": {"id":"672069284"}}}'

//  curl -X POST https://stunning-conkies-063c33.netlify.app/.netlify/functions/telehook -H 'Content-Type: application/json' -d '{"message":{"text": "vl", "chat": {"id":"672069284"}}}'


