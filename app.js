document.querySelector('input').addEventListener('input', e => {
	const input = document.querySelector('input').value

	const unique_strings = get_unique_strings(input)
	const longest_string = get_longest_string(unique_strings)
	
	document.querySelector('#result').textContent = `Longest string is "${longest_string}" which is ${longest_string.length} characters`
})

function get_longest_string(input) {
	if (input.length == 0) {
		return input
	}

	return input.reduce((a, b) => a.length <= b.length ? b : a)
}

// get array of unique strings
function get_unique_strings(string) {
	const unique_strings = []
	const current_string = []
	let i = 0

	while (true) {
		if (!current_string.includes(string[i])) { // if character is unique, add it to character array
			current_string.push(string[i])
		} else { // character is NOT unique, flush current array of characters
			unique_strings.push(current_string.join(''))
			current_string.length = 0

			// since we found repeating character, go back to previous occurrence of it
			i = find_closest_index_back(string, i - 1, string[i])
		}

		i++

		if (string.length <= i) {
			unique_strings.push(current_string.join(''))
			break
		}
	}

	return unique_strings
}

// goes back from provided "start_idx" to find closes "character" index
function find_closest_index_back(string, start_idx, character) {
	i = start_idx

	while (true) {
		if (string[i] == character) {
			return i
		}

		i--
	}
}