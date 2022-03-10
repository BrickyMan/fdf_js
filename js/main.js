let	doc = document.documentElement,
	can = document.querySelector('#canvas'),
    ctx = can.getContext('2d');
	width = doc.clientWidth,
    height = doc.clientHeight,
	map = [],
	mapW = 20,
	mapH = 20,
	scale = Math.round(width / (mapW + mapH)),
	disturbance = 20;

// Подгон размеров холста под размер экрана браузера
can.width = width;
can.height = height;

ctx.strokeStyle = '#FFF';

// Сдвиг
function ix(x, y) {
	return (x - y);
}

function iy(x, y) {
	return ((x + y) / 2) * scale;
}

let	x_offset = (width / 2) - ((mapW - 1) / 2),
	y_offset = (height / 2) - (iy(mapH - 1, mapW - 1) / 2);

// Иммитация алгоритма Брезенхейма
function brhm(x0, y0, x1, y1) {
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.stroke();
}

// Рандомайзер
function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

// Создание карты
function createMap(map, w, h) {
    map = [];
    for(let i = 0; i < h; i++) {
        map.push([]);
        for(let j = 0; j < w; j++) {
            map[i].push(getRandom(0, disturbance));
        }
    }
    return map;
}

map = createMap(map, mapW, mapH);

// Расчёт координаты x в изометрии
function xIso(x, y) {
	return((x - map[y][x] / 50) - (y - map[y][x] / 50)) * scale;
}

// Расчёт координаты y в изометрии
function yIso(x, y)
{
	return(((x - map[y][x] / 50) + (y - map[y][x] / 50)) / 2) * scale;
}

// Отрисовка ландшафта
function drawLandscape() {
	// Очистка холста
	ctx.clearRect(0, 0, can.width, can.height);
	for (let y = 0; y < map.length; y++)
	for (let x = 0; x < map[y].length; x++) {
		// Проверка, что точка не на последнем значении по x
		if (x < map[y].length - 1) {
			// отрисовка линии от х1 у1 до х2 у2 (изометрическая координата + отступ от соответстующей стороны)
			brhm(xIso(x, y) + x_offset, yIso(x, y) + y_offset, xIso(x + 1, y) + x_offset, yIso(x + 1, y) + y_offset);
		}
		// Проверка, что точка не на последнем значении по у
		if (y < map.length - 1) {
			brhm(xIso(x, y) + x_offset, yIso(x, y) + y_offset, xIso(x, y + 1) + x_offset, yIso(x, y + 1) + y_offset);
		}
	}
}

// Это вид сверху 
// if (x < map[y].length - 1) {
// 	// iX2 = (x + 1) - y;	
// 	brhm(x * scale + x_offset, y * scale + y_offset, (x + 1) * scale + x_offset, y * scale + y_offset);
// }
// if (y < map.length - 1) {
// 	// iY2 = (x + 1 + y) / 2;
// 	brhm(x * scale + x_offset, y * scale + y_offset, x * scale + x_offset, (y + 1) * scale + y_offset);
// }

drawLandscape();
document.addEventListener('keydown', (event) => {
	// Зум
	// if (event.keyCode == 69) {
	// 	y_offset -= 5;
	// 	x_offset -= 5;
	// 	scale++;
	// 	drawLandscape();
	// }
	// else if (event.keyCode == 81) {
	// 	y_offset += 5;
	// 	x_offset += 5;
	// 	scale--;
	// 	drawLandscape();
	// }
	// Сдвиг
	if (event.keyCode == 87) {
		y_offset += 10;
		drawLandscape();
	}
	else if (event.keyCode == 83) {
		y_offset -= 10;
		drawLandscape();
	}
	if (event.keyCode == 65) {
		x_offset += 10;
		drawLandscape();
	}
	else if (event.keyCode == 68) {
		x_offset -= 10;
		drawLandscape();
	}
})

// Зум
document.addEventListener('wheel', (event) => {
	if (event.deltaY < 0) {
		y_offset -= 5;
		// x_offset -= 5;
		scale++;
		drawLandscape();
	}
	else if (event.deltaY > 0) {
		y_offset += 5;
		// x_offset += 5;
		scale--;
		drawLandscape();
	}
})