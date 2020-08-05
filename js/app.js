//Cambiar el color al titulo y que alterne el color indefinidamente
//Punto 1Creamos una funcion donde pasamos como parametro un selector (en este caso en la funcion iniciar juego gameinit tenemos el selector)
function colorTittle(selector) {
  $(selector).animate({
    // Añadimos algo de opacidad.
    opacity:'1',
  }, {
    //step:, la cual nos permite ejecutar acciones mientras se realiza la animación, por ejemplo hacer modificaciones a las propiedades CSS que no tienen valores numéricos
    step: function () {
      $(this).css('color', 'white');
    },
    //queue true: Debe esperar a q se realice la anterior animacion para poder ejecutarse
    queue: true
  })
  .animate({
    opacity:'1'
  }, {
    step:function(){
      $(this).css('color', 'yellow');
    },
    queue:true
  },600)
  //Generamos un tiempo de espera de 1 segundo para activar la siguiente animacion
  .delay(1000)
  .animate({
    opacity:'1'
  }, {
    step: function(){
      $(this).css('color', 'white');
    },
    queue:true
  })
  .animate({
    opacity:'1'
  }, {
    step: function(){
      $(this).css('color', 'yellow');
      //al llamar la funcion hacemos repetido el cambio de colores de amarillo a blanco
      colorTittle('h1.main-titulo');
    },
    queue: true
  });
}
//Punto 2 Generar numeros aleatorios
function numberRandon(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  //retorna un entero aleatorio entre min(incluido) y max (excluido). Mas info ver documento math
  return Math.floor(Math.random() * (max - min)) + min;
}

//Punto 2: pone los elementos dulces en el tablero de juego
function llenarTablero() {
	fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
    //creamos una variable donde guardamos un selector apuntando a la ultima seleccion, con children accedemos al elemento segundario de lo seleccionado, hacemos esto en todas las clases que coinsida con la seleccion anterio (class^="col.")
		var candys = $(this).children().length;
		var agrega = top - candys;
    //Creamos un condicional para que recorra todas las columnas y podamos agregar las imagenes de dulces en cada espacio
		for (var i = 0; i < agrega; i++) {
      //guardamos en una variable la funcion numero aleatorio agregando un minimo y un maximo (esto nos va generar un numero aleatorio )
			var candyType = numberRandon(1, 5);
			if (i === 0 && candys < 1) {
          //Agregamos la ruta de la imagen y llamamos la funcion para generar un numero aleatirio (los nombres de las imagenes dulces tienen que se numeros), para agregar un ducle aleatoriamente al tablero
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
        //Realizamos una busqueda de una imagen en la posicion 0 luego agregamos un elemento antes del elemento seleccionado esto lo hacemos con before
        //Agregamos la ruta de la imagen y llamamos la funcion para generar un numero aleatirio (los nombres de las imagenes dulces tienen que se numeros), para agregar un ducle aleatoriamente al tablero
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
  addCandyEvents();
  setValidations();
}
// Si hay dulces que borrar
function setValidations() {
	validationColumn();
	validationRow();
	// Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		deletesCandyAnimation();
	}
}

//Obtener filas o columnas de dulces ()
function candyArray(arrayType, index){
//Creamos variables donde seleccionamos el espacion de las columnas en el DOM
//Usamos el .children Para acceder a los elementos segundarios
  var candyCol1 = $('.col-1').children();
  var candyCol2 = $('.col-2').children();
  var candyCol3 = $('.col-3').children();
  var candyCol4 = $('.col-4').children();
  var candyCol5 = $('.col-5').children();
  var candyCol6 = $('.col-6').children();
  var candyCol7 = $('.col-7').children();
//creamos una variable donde guardemos en un array las variables creadas anteriormente donde seleccionamos las columnas del DOM
var columnsCandy = $([candyCol1, candyCol2, candyCol3, candyCol4, candyCol5, candyCol6, candyCol7]);
// creamos un condicional donde comparamos si el tipo de dato q nos da index es tipo numerico si si, segun el numero dado se selecciona la fila de las columnas
if(typeof index === 'number'){
 var rowCandy = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index), candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index), candyCol7.eq(index)]);
} else {
   index='';
  }

if(arrayType === 'columns'){
return columnsCandy;
} else if( arrayType === 'rows' && index !==''){
  return rowCandy;
  }
}
  // arreglos de filas
  function candyRows(index) {
  	var candyRow = candyArray('rows', index);
  	return candyRow;
  }

  // arreglos de colunmnas
  function candyColumns(index) {
  	var candyColumn = candyArray('columns');
  	return candyColumn[index];
  }


//punto 3: Validar si hay dulces que se eliminaran
function validationColumn(){
  //Creamos un condicional donde recorremos toda la columna para validar si hay dulces iguales
  for (var j=0; j<7; j++){
    var counter=0;
    var positionCandy=[];
    var positionCandyExtra=[];
    var candyColumn= candyColumns(j);
    var valueComparison = candyColumn.eq(0);
    var gap=false;
    //creamos una condicion cpara recorrer toda la columna y comparar si son iguales el valor de ruta y que sean minimo 3 seguidos
    for (var i= 1; i<candyColumn.length; i++){
      //Creamos dos variables donde guardamos el valor de src (compara el nombre de las imagenes)
      var srcComparison= valueComparison.attr('src');
      var srcCany= candyColumn.eq(i).attr('src');
      //Crear condicional para comparar las dos variables que creamos anteriormente
      if (srcComparison != srcCany){
        if (positionCandy.length>=3){
          gap= true;
        } else {
          positionCandy=[];
        }
        counter=0;
      } else {
        if (counter ==0){
          if(!gap){
            positionCandy.push(i-1);
          }else{
            positionCandyExtra.push(i-1);
          }
        }
        if (!gap){
          positionCandy.push(i);
        } else {
          positionCandyExtra.push(i);
        }
        counter +=1;
      }
      valueComparison = candyColumn.eq(i);
    }
    if (positionCandyExtra.length>2){
      positionCandy = $.merge(positionCandy, positionCandyExtra);
    }
    if (positionCandy.length <=2){
      positionCandy=[];
    }
    candyCount = positionCandy.length;
    if (candyCount >= 3){
      deleteColumnCandy(positionCandy, candyColumn);
    }
  }
}
function deleteColumnCandy(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}
//Valida si hay dulces que eliminar en una fila
function validationRow(){
  for (var j=0; j<6; j++){
    var counter=0;
    var positionCandy=[];
    var positionCandyExtra= [];
    var candyRow= candyRows(j);
    var valueComparison= candyRow[0];
    var gap=false;

    for (var i=1; i<candyRow.length; i++){
      var srcComparison = valueComparison.attr('src');
      var srcCandy = candyRow[i].attr('src');

      if (srcComparison != srcCandy){
        if(positionCandy.length>=3){
          gap=true;
        } else {
          positionCandy=[];
        }
        counter=0;
      } else {
        if(counter ==0){
          if(!gap){
            positionCandy.push(i-1);
          } else {
            positionCandyExtra.push(i-1);
          }
        }
        if(!gap){
          positionCandy.push(i);
        } else {
          positionCandyExtra.push(i);
        }
        counter +=1;
      }
      valueComparison = candyRow[i];
    }
    if (positionCandyExtra.length>2){
      positionCandy= $.merge(positionCandy, positionCandyExtra);
    }
    if (positionCandy.length <=2){
      positionCandy= [];
    }
    candyCount = positionCandy.length;
    if(candyCount>=3){
      deleteHorizontal(positionCandy, candyRow);
       setScore(candyCount);
    }
  }
}

function deleteHorizontal(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}

//Muestra la puntuacion.
function setScore(candyCount){
  var score = Number($('#score-text').text());
  switch (candyCount){
    case 3:
    score +=25;
    break;
  case 4:
    score +=50;
    break;
  case 5:
    score +=75;
    break;
  case 6:
    score +=100;
    break;
  case 7:
    score +=200;
  }
  $('#score-text').text(score);
}

//Eliminacion automatica de los elementos dulces
function deletesCandyAnimation(){
  disableCandyEvents();
  $('img.delete').effect('pulsate', 400);
  $('img.delete').animate({
    opacity: '0'
  }, {
    duration:300
  })
  .animate({
    opacity:'0'
  }, {
    duration:400,
    complete: function(){
      deletesCandy()
        .then(checkBoardPromise)
        .catch(showPromise);
    },
    queue: true
  });
}
// llenado automatico espacios en blanco
function showPromise(error){
  console.log(error);
}
//funcion borrar dulces
function deletesCandy(){
  return new Promise(function(resolve, reject){
    if ($('img.delete').remove()){
      resolve(true);
    } else {
      reject('No se pudo eliminar el dulce...');
    }
  })
}
//punto 4 y 6. temporizador y boton reiniciar
//cambia el aspecto de la página
//final del juego
function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');

}
//punto 5 Registra la cantidad de movimientos realizado
function movementUpdate(){
  var valueActual= Number($('#movimientos-text').text());
  var result= valueActual +=1;
  $('#movimientos-text').text(result);
}
//Punto 3 efecto de movimiento entre los caramelos
//punto 7. interacción del usuario con el elemento caramelo es drag and drop
function addCandyEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: swapCandy
	});
	enableCandyEvents();
}

function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

//hace que el caramelo sea solido al moverse
function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

//reemplaza a los caramelos anteriores
function swapCandy(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		llenarTablero();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			movementUpdate();
		}
	}, 500);

}
function checkBoardPromise(result){
  if (result){
    llenarTablero();
  }
}

function gameinit() {
 colorTittle('h1.main-titulo');
 $('.btn-reinicio').click(function () {
   if ($(this).text() === 'Reiniciar') {
     location.reload(true);
   }
   llenarTablero();
   $(this).text('Reiniciar');
   $('#timer').startTimer({
     onComplete: endGame
   })
 });
}
$(function() {
	gameinit();
});
