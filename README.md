# Javascript Videogame Level Maker

# This game was in development
It is currently abandoned, game is a lil bit broke and also code is a lil bit messy.
Is not that bad tho C:

[try it online](https://luizon.github.io/LevelMaker/)

## Editor keyboard shortcuts

	Num 1: Eraser
	Num 2: Block
	Num 3: Enemy
	Num 4: Player
	Num 5: Spikes block
	ESC: Open the editor menu
	Right/Left key: Change the selected object
	P: play
	G: grid / ungrid
	X: Change the horizontal number of cells
	Y: Change the vertical number of cells
	alt + O: Open a level
	alt + S: Save current level
	alt + Z: Undo
	control + Z: Undo

## Game controls

	Left arrow and A : Move to the left
	Right arrow and D : Move to the right
	Up arrow and W: Jump
	P: stop
	
	
## TODO list
I'm not even sure why I put this here, heh, I also write it in spanish idk why tbh but yeh

	[ ] Agregar objetos obtenibles (la típica moneda, I guess)
	[ ] Agregar un objetivo
		¿vencer todos los enemigos?
		¿conseguir todos los objetos obtenibles?
		¿llegar a un punto objetivo en el nivel?
		[ ] Agregar un mensaje de ¡Felicidades! o algo al conseguir el objetivo
	
	[x] Agregar botón de guardar nivel
	[x] Agregar botón de cargar nivel
	[ ] Agregar gameplay para touch screen
		[ ] Permitir que se pueda jugar
		[ ] Dibujar un joystick donde toca para dar a entender como mueves al personaje
			[ ] Animar el joystick sin suavidad
			[ ] Animar el joystick con suavidad
		[ ] Que el joystick se mueva donde el dedo, para facilitar el movimiento en screen
	
	[ ] Reparar colisiones
		[ ] colisión con block del jugador
			[ ] colisión lateral: No quiere colaborar con los saltos cuando la resolución es grande.
			[x] colisión vertical: Deja muy preciso entrar a un cuadro cayendo o subiendo muy rápido.
			[ ] choque vertical: pierde velocidad horizontal el chocar la cabeza del personaje
			[ ] subir lateralmente: se teletransporta a arriba cuando falta poco para llegar, no debería
			[ ] a poca resolución y/o pocos FPS se clava en los techos al caer lentamente
			[ ] atravieza la pared levemente al estar cerca de la orilla, lo que lo hace subir al instante a bloques o clavarse dejando softlockeado al jugador
		[x] enemigo
			[x] colisión con block, traspasa o se traba según cuantos blocks tiene a un lado el enemigo
		
	[x] Agregar un botón de limpiar pantalla (eliminar todos los objetos)
	[x] Seleccionar un objeto específico con los números
	[x] Hacer que el objeto del menú desplegado no se vea pixeleado
	[x] Evitar que se pueda borrar objetos en modo play
	[ ] Agregar ctrl + z
		[x] Hacer un sistema de pila de objetos añadidos
		[x] Agregar también objetos eliminados a la pila
		[x] Hacer magia para que funcione
		[x] Limitar a x movimientos la pila
		[ ] Agregar control y
	
	[ ] Mejorar las nubes
		[ ] Hacer más redonditas a las nubes, menos círculos
			[ ] Evitar que grandes resoluciones hagan más feas las nubes
		[x] Hacer que la cantidad de nubes sea relativo a la anchura de ventana
		[ ] Corregir para que la velocidad sea relativamente la misma sin importar la resolución
			O que sea relativo a gridX como mínimo
	
	[x] Mejorar los bloques
		[x] Hacer que identifiquen que bloques les rodean para adaptar el pasto
			[x] laterales
			[x] esquinas
	
	[x] Agregar bloque de daño (pinchos)
		[x] Crear objeto agregable
		[x] Darle imagen
		[x] Darle lógica de daño al jugador
		[ ] Cambiar la imagen como hace el bloque para que no sean solo muchas bolas espinosas
		
	[ ] UI UX
		[x] Agregar interacción tipo hover en botones
		[ ] Agregar interacción de clicks
		[ ] Hacer que los clicks y "hovers" convivan
		[ ] Describir todo
			[ ] Agregar una descripción a cada objeto
			[ ] Mostrar la descripción en pantalla
			[ ] Hacerlo bonito
		[ ] Corregir el tamaño de fuente (si no es Arial no se ve bien, comprobado en Linux)
	
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
