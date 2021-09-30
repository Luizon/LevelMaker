# Javascript Videogame Level Maker

# This game is currently in development

[try online](https://luizon.github.io/LevelMaker/)

#### TODO list

	[ ] Hacer un IA para el enemigo
		[x] Hacer una variable de posición inicial para devolver al enemigo cuando el juego tenga playing = false
		[ ] Hacer una función para retornar una hitbox reducida, para fines prácticos
		[ ] Hacer que pueda moverse lateralmente
		[ ] Hacer que pueda reconocer si pisa suelo para avanzar, y al llegar a un borde dar vuelta
		[ ] Hacer que reconozca paredes, sacando curva antes de chocar con una
		[ ] Hacer que reconozca a otros enemigos, sacando curva en cuanto choque con uno
		[ ] Hacer un estado de muerte
			[ ] Detenerse al morir
			[ ] Desactivar al morir
			[ ] Hacer una animación de muerte
			[ ] Volverse invisible y luego volver a la posición inicial
			[ ] Hacer que muera al ser aplastado por el jugador

	[ ] Hacer un botón de play
		[ ] Cambiar imagen del botón a stop/play según el estado que se encuentre
		[ ] Activar a los enemigos cuando le das a ese botón
		[ ] Activar al jugador cuando se active el botón

	[ ] Hacer el jugador
		[x] Hacer dos variables de posición inicial para devolver al jugador cuando el juego tenga playing = false o cuando muera
		[ ] Darle jugabilidad
			[ ] Hacer que el juego reconozca las teclas
			[ ] Hacer que el jugador se mueva lateralmente presionando izquierda y derecha
			[ ] Crear un sistema de choque lateral con los bloques
			[ ] Crear un sistema de gravedad
			[ ] Crear un sistema de suelo para los bloques
			[ ] Hacer que el jugador salte al presionar arriba
			[ ] Limitar los saltos, solo puedes saltar si estás pisando suelo
			[ ] Hacer que el jugador deje de subir al chocar contra un block desde abajo
			[ ] Hacer que el jugador deje de bajar al chocar contra un block desde arriba
			[ ] Hacer que el jugador de un mini salto trás chocar contra un enemigo desde arriba
				[ ] Hacer que el enemigo muera cuando esto pase
		[ ] Evitar que el jugador pueda salirse de los bordes del juego
		[ ] Hacer un estado de muerte
			[ ] Detenerse al morir
			[ ] Devolver al inicio trás morir
			[ ] Dar muerte cuando tocas a un enemigo y no es cayéndole encima
