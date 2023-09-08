# Vanilla Javascript Videogame Level Maker

## This game IS in development AGAIN
Biggest come back baby, let's try harder this time

## [try it online](https://luizon.github.io/LevelMaker/)

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
I was in spanish already, Imma let this like that for now

	[ ] Agregar imagenes a este readme, para mejor entendimiento de las teclas y juego
	[ ] Agregar objetos obtenibles (la típica moneda, I guess)
	[ ] Agregar un objetivo
		¿vencer todos los enemigos?
		¿conseguir todos los objetos obtenibles?
		¿llegar a un punto objetivo en el nivel?
		[ ] Agregar un mensaje de ¡Felicidades! o algo al conseguir el objetivo
	[ ] Touch screen
		[ ] Permitir que se pueda jugar
		[ ] Dibujar un joystick donde toca para dar a entender como mueves al personaje
			[ ] Animar el joystick sin suavidad
			[ ] Animar el joystick con suavidad
		[ ] Que el joystick se mueva donde el dedo, para facilitar el movimiento en screen
	[ ] Colisiones
		[ ] Reparar colisión con block del jugador
			[ ] colisión lateral: No quiere colaborar con los saltos cuando la resolución es grande.
			[ ] choque vertical: pierde velocidad horizontal el chocar la cabeza del personaje
			[ ] subir lateralmente: se teletransporta a arriba cuando falta poco para llegar, no debería
			[ ] a poca resolución y/o pocos FPS se clava en los techos al caer lentamente
			[ ] atravieza la pared levemente al estar cerca de la orilla, lo que lo hace subir al instante a bloques o clavarse dejando softlockeado al jugador
	[ ] Undo y Redo
		[ ] Agregar control y
	[ ] Nubes
		[ ] Hacer más redondas a las nubes, menos círculos
			[ ] Evitar que grandes resoluciones hagan más feas las nubes
		[ ] Corregir para que la velocidad sea relativamente la misma sin importar la resolución
			O que sea relativo a gridX como mínimo
	[ ] Pinchos
		[ ] Cambiar la imagen como hace el bloque para que no sean solo muchas bolas espinosas
		[ ] Dar colores más notables (se pierde fácilmente con el color del fondo)
	[ ] UX/UI
		[ ] Agregar interacción de cursor (por css o algo)
		[ ] Hacer que los clicks y "hovers" convivan
		[ ] Describir todo
			[ ] Agregar una descripción a cada objeto
			[ ] Mostrar la descripción en pantalla
			[ ] Hacerlo bonito
		[ ] Corregir el tamaño de fuente (si no es Arial no se ve bien, comprobado en Linux)
		[ ] Permitir que se cargue un archivo de nivel si se arrastra al canvas del juego
	[ ] Bloques
		[ ] Redibujar los bloques al momento de agregar uno nuevo (solo en el frame que se crea)
	[ ] Enemigo
		[ ] Hacer un estado de muerte
			[ ] Hacer una animación de muerte
			[ ] Volverse invisible y luego volver a la posición inicial
	[ ] Jugador
		[ ] Hacer un estado de muerte
			[ ] Detenerse al morir
	[ ] Créditos
		[ ] Agregar link de github
		[ ] Agregar "Made by P_Luizon"
