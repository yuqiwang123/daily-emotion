export async function query(data) {
	const response = await fetch(
		// fetch(): returning a promise which is fulfilled once the response is available.
		"https://api-inference.huggingface.co/models/Emanuel/bertweet-emotion-base",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result_json = await response.json();
	// result =  await response.json()
	// console.log(result_json)
	return result_json; 
}

export function gen_emotion(result_json) {
	const emotions = ["sadness", "joy", "love", "anger", "fear", "surprise"]
	// console.log(result_json.length)
	const result_obj_arr = result_json[0]
	let max_score = 0
	let emotion = "gen_emotion is wrong"

	// console.log(result_obj_arr)
	for (let i = 0; i < result_obj_arr.length; i++) {
		let result_obj = result_obj_arr[i]	
		let idx = result_obj["label"][6]
		// console.log(idx)	
		let score = result_obj["score"]
		if (score > max_score) {
			max_score = score
			emotion = emotions[idx]
		}
		// console.log(emotion)	
		// console.log(score)		
	}
	return emotion
}