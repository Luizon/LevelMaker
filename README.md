# Javascript Videogame Level Maker

# This game is currently in development

[try it online](https://luizon.github.io/LevelMaker/)

## Editor keyboard shortcuts

	ESC: Open the editor menu
	Right/Left key: Change the selected object
	P: play
	G: grid / ungrid
	X: Change the horizontal number of cells
	Y: Change the vertical number of cells

## Game controls

	Right/Left arrow key: Move sideways
	Up arrow key: Jump
	P: stop
	
	
## TODO list
	
	[x] Agregar un botón de limpiar pantalla (eliminar todos los objetos)
	[x] Hacer que el objeto del menú desplegado no se vea pixeleado
	[ ] Agregar ctrl + z
		[ ] Investigar como funciona esto ¿Es creando un historial de estados y cargándolos?
		[ ] Hacer el sistema de ctrl + z
	
	[ ] Mejorar las nubes
		[ ] Hacer más redonditas a las nubes, menos círculos
			[ ] Evitar que grandes resoluciones hagan más feas las nubes
		[x] Hacer que la cantidad de nubes sea relativo a la anchura de ventana
	
	[ ] Hacer un IA para el enemigo
		[x] Hacer una variable de posición inicial para devolver al enemigo cuando el juego tenga playing = false
		[x] Hacer una función para retornar una hitbox reducida, para fines prácticos
		[x] Hacer que pueda moverse lateralmente
		[x] Hacer que reconozca cuando choca con el borde del nivel y se devuelva
		[x] Hacer que pueda reconocer si pisa suelo para avanzar, y al llegar a un borde dar vuelta
		[x] Hacer que reconozca paredes, sacando curva antes de chocar con una
		[x] Hacer que reconozca a otros enemigos, sacando curva en cuanto choque con uno
		[x] Hacer que no sea posible poner enemigos cuando se está playing
		[ ] Invertir la imagen cuando va a la izquierda
			[x] Hacer el cambio de posición directo
			[ ] Mover suavemente los ojos al girar
		[ ] Hacer un estado de muerte
			[ ] Detenerse al morir
			[ ] Desactivar al morir
			[ ] Hacer una animación de muerte
			[ ] Volverse invisible y luego volver a la posición inicial
			[ ] Hacer que muera al ser aplastado por el jugador

	[ ] Hacer un botón de play
		[x] Hacer que al darle click cambie de estado el juego
		[x] Hacer que sea un canvas para darle transparencia
		[x] Cambiar imagen del botón a stop/play según el estado que se encuentre
		[x] Activar a los enemigos cuando le das a ese botón
		[ ] Activar al jugador cuando se active el botón
		[ ] Devolver a los enemigos y al jugador a su posición original y resetear las variables
			[x] Para el enemigo
			[ ] Para el jugador

	[ ] Hacer el jugador
		[x] Hacer dos variables de posición inicial para devolver al jugador cuando el juego tenga playing = false o cuando muera
		[ ] Darle jugabilidad
			[x] Hacer que el juego reconozca las teclas
			[x] Hacer que el jugador se mueva lateralmente presionando izquierda y derecha
			[x] Crear un sistema de choque lateral con los bloques
			[x] Crear un sistema de gravedad
			[x] Hacer que el jugador salte al presionar arriba
				[x] Hacer que se eleve al presionar el botón de salto
				[x] Hacer que el salto sea más alto o más bajo si mantiene o no más tiempo el botón de salto
			[x] Crear un sistema de suelo para los bloques
			[x] Limitar los saltos, solo puedes saltar si estás pisando suelo
			[x] Hacer que el jugador deje de subir al chocar contra un block desde abajo
			[x] Hacer que el jugador deje de bajar al chocar contra un block desde arriba
		[x] Evitar que el jugador pueda salirse de los bordes del juego
		[ ] Invertir la imagen cuando va a la izquierda
			[x] Hacer el cambio de posición directo
			[ ] Mover suavemente los ojos al girar
		[x] Subir los ojos cuando el jugador sube y bajarlos cuando él baja
			[x] Hacer el cambio de posición directo
			[x] Hacer el movimiento fluido
		[ ] Hacer un estado de muerte
			[ ] Detenerse al morir
			[ ] Devolver al inicio trás morir
			[ ] Dar muerte cuando tocas a un enemigo y no es cayéndole encima
		[ ] Mata al enemigo al caer sobre él
			[ ] El enemigo muere
			[ ] Jugador da un pequeño salto al matarlo
		[ ] Muere al tocar al enemigo
		[ ] Muere al caer al vacío
