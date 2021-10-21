# Javascript Videogame Level Maker

# This game is currently in development

[try it online](https://luizon.github.io/LevelMaker/)

## Editor keyboard shortcuts

	Num 1: Eraser
	Num 2: Block
	Num 3: Enemy
	Num 4: Player
	ESC: Open the editor menu
	Right/Left key: Change the selected object
	P: play
	G: grid / ungrid
	X: Change the horizontal number of cells
	Y: Change the vertical number of cells

## Game controls

	Left arrow and A : Move to the left
	Right arrow and D : Move to the right
	Up arrow and W: Jump
	P: stop
	
	
## TODO list
	
	[ ] Reparar colisión lateral del jugador. No quiere colaborar con los saltos.
	[ ] Reparar colisión vertical del jugador. Deja muy preciso entrar a un cuadro cayendo o subiendo muy rápido.
	[ ] Reparar choque vertical del jugador, pierde velocidad horizontal el chocar la cabeza del personaje
	[x] Agregar un botón de limpiar pantalla (eliminar todos los objetos)
	[x] Seleccionar un objeto específico con los números
	[x] Hacer que el objeto del menú desplegado no se vea pixeleado
	[x] Evitar que se pueda borrar objetos en modo play
	[ ] Agregar ctrl + z
		[ ] Investigar como funciona esto ¿Es creando un historial de estados y cargándolos?
		[ ] Hacer el sistema de ctrl + z
	
	[ ] Mejorar las nubes
		[ ] Hacer más redonditas a las nubes, menos círculos
			[ ] Evitar que grandes resoluciones hagan más feas las nubes
		[x] Hacer que la cantidad de nubes sea relativo a la anchura de ventana
	
	[x] Mejorar los bloques
		[x] Hacer que identifiquen que bloques les rodean para adaptar el pasto
			[x] laterales
			[x] esquinas
	
	[ ] Agregar bloque de daño (pinchos quizá)
		[ ] Crear objeto agregable
		[ ] Darle imagen
		[ ] Darle lógica de daño al jugador
	
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
			[x] Detenerse al morir
			[x] Desactivar al morir
			[ ] Hacer una animación de muerte
			[ ] Volverse invisible y luego volver a la posición inicial
			[x] Hacer que muera al ser aplastado por el jugador

	[x] Hacer un botón de play
		[x] Hacer que al darle click cambie de estado el juego
		[x] Hacer que sea un canvas para darle transparencia
		[x] Cambiar imagen del botón a stop/play según el estado que se encuentre
		[x] Activar a los enemigos cuando le das a ese botón
		[x] Activar al jugador cuando se active el botón
		[x] Devolver a los enemigos y al jugador a su posición original y resetear las variables
			[x] Para el enemigo
			[x] Para el jugador

	[ ] Hacer el jugador
		[x] Hacer dos variables de posición inicial para devolver al jugador cuando el juego tenga playing = false o cuando muera
		[x] Darle jugabilidad
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
			[x] Devolver al inicio trás morir
			[x] Dar muerte cuando tocas a un enemigo y no es cayéndole encima
		[x] Mata al enemigo al caer sobre él
			[x] El enemigo muere
			[x] Jugador da un pequeño salto al matarlo
		[x] Muere al tocar al enemigo
		[x] Muere al caer al vacío
