let changeMap = createMap(map, mapW, mapH),
	waveRow = 0,
	waveSize = 10;

function wave() {
	for (let y = 0; y < map.length; y++)
	for (let x = 0; x < map[y].length; x++) {
		if (map[y][x] == changeMap[y][x]) {
			if (y == waveRow || y == waveRow + 1) {
				if (map[y][x] > disturbance * waveSize * 0.1) {
					waveRow++;
				}
				changeMap[y][x] = getRandom(disturbance * waveSize * 0.55, disturbance * waveSize * 0.6);
			}
			else {
				changeMap[y][x] = getRandom(0, disturbance);
			}
		}
		else if (map[y][x] > changeMap[y][x]) {
			map[y][x] -= 1;
			if (y == waveRow && map[y][x] != changeMap[y][x]) {
				map[y][x] -= 1;
			}
		}
		else {
			map[y][x] += 1;
			if (y == waveRow && map[y][x] != changeMap[y][x]) {
				map[y][x] += 1;
			}
		}
	}
	if (waveRow == map.length) {
		waveRow = 0;
	}
}

let timer = setInterval(() => {
	wave();
	drawLandscape();
}, 900 / disturbance);