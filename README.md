# diccionario-app
Proyecto diccionario rapanui, 2022


### puesta en marcha:

Al clonar  el repo, correr comando:

  npm install
  
### Previsualización

 Por la inclusión de SQLite, para el manejo de información en memoria del telefono, se debe realizar la 
instalación de la aplicación en un emulador o dispositivo, por medio de Android studio, o alguna alternativa.

### Compilar para android studio:

  ionic build
  
  npx cap sync android
  
  npx cap open android
  
  el ultimo comando, abrirá android studio y cargará directamente el proyecto. luego quedará a tu cuidado si utilizar el 
 emulador, o tu celular.
 
### Habilitando Hot reload:

  necesitaremos 2 terminales.
  
  en una correremos:
  
  npm start
  
  en la segunda, correremos:
  
  ionic capacitor run android -l --host=192.168.0.13
  
  la ip "192.168.0.13" es solo un ejemplo, se debe completar con tu ip
  
  
  
  
