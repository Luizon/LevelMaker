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
	[ ] Agregar una cámara que siga al jugador
		[ ] En juego
			[ ] Movimiento
				[ ] Tiene movimiento suave
				[ ] La cámara se eleva un poco si se sostiene hacia arriba
				[ ] La cámara desciende un poco si se sostiene hacia abajo
				[ ] La cámara se coloca hacia el frente de donde el jugador mira
				[ ] La cámara respeta los bordes de los niveles
			[ ] Permitir desplazamiento vertical en la cámara
			[ ] Permitir desplazamiento horizontal en la cámara
			[ ] Optimizar
				[ ] Desactivar los objetos que están fuera del foco de la cámara
					[ ] Blocks
						[ ] Desactivar dibujo
					[ ] SpikesBlocks
						[ ] Desactivar dibujo
					[ ] Enemies
						[ ] Desactivar movimiento
						[ ] Desactivar dibujo
					[ ] Clouds
						[ ] Desactivar dibujo
		[ ] En editor
			[ ] Agregar un tamaño máximo de nivel antes de que se active la cámara
			[ ] Permitir desplazamiento vertical en la cámara
			[ ] Permitir desplazamiento horizontal en la cámara
			[ ] Dibujar cuadrado de cámara cuando el nivel sea muy grande
			[ ] Agregar un tamaño máximo de nivel global
	[ ] Agregar objetos obtenibles (la típica moneda, I guess)
	[ ] Agregar un objetivo
		¿vencer todos los enemigos?
		¿conseguir todos los objetos obtenibles?
		¿llegar a un punto objetivo en el nivel?
		[ ] Agregar un mensaje de ¡Felicidades! o algo al conseguir el objetivo
	[ ] Undo y Redo
		[ ] Agregar control y
	[ ] Checkpoints
		[ ] Agregar una bandera de checkpoint para aparecer trás morir
	[ ] Nubes
		[ ] Hacer más redondas a las nubes, menos círculos
			[ ] Evitar que grandes resoluciones hagan más feas las nubes
		[ ] Corregir para que la velocidad sea relativamente la misma sin importar la resolución
			O que sea relativo a gridX como mínimo
	[ ] Pinchos
		[ ] Cambiar la imagen como hace el bloque para que no sean solo muchas bolas espinosas
		[ ] Dar colores más notables (se pierde fácilmente con el color del fondo)
		[ ] Reducir hitbox
	[ ] UX/UI
		[ ] Agregar un botón para reiniciar el nivel (que haga lo mismo que el botón R del teclado, y solo aparezca mientras se está jugando)
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
	[x] Enemigo
		[x] Hacer un estado de muerte
			[x] Hacer una animación de muerte
			[x] Volverse invisible
	[ ] Jugador
		[x] Hacer un estado de muerte
			[x] Detenerse al morir
		[ ] Reparar colisión con block
			[ ] colisión lateral: No quiere colaborar con los saltos cuando la resolución es grande.
			[ ] choque vertical: pierde velocidad horizontal el chocar la cabeza del personaje
			[ ] subir lateralmente: se teletransporta a arriba cuando falta poco para llegar, no debería
			[ ] a poca resolución y/o pocos FPS se clava en los techos al caer lentamente
			[ ] atravieza la pared levemente al estar cerca de la orilla, lo que lo hace subir al instante a bloques o clavarse dejando softlockeado al jugador
	[ ] Touch screen
		[ ] Permitir que se pueda jugar
		[ ] Dibujar un joystick donde toca para dar a entender como mueves al personaje
			[ ] Animar el joystick sin suavidad
			[ ] Animar el joystick con suavidad
		[ ] Que el joystick se mueva donde el dedo, para facilitar el movimiento en screen
	[ ] Créditos
		[ ] Agregar link de github
		[ ] Agregar "Made by P_Luizon"
