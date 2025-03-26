/* SNACK 1
Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.*/


function getPostTitle(id){
  const promise = new Promise((resolve,reject) => {
   fetch(`https://dummyjson.com/posts/${id}`)
   .then(response => response.json())
   .then( data => resolve(data.title))
   .catch(reject)

  })

  return promise
}


getPostTitle(1)
.then(data => console.log(data))
.catch(error => console.error(error))

// BONUS SNACK 1

function getPost(id){
  const promise = new Promise((resolve,reject) =>{
    fetch(`https://dummyjson.com/posts/${id}`)
    .then(response => response.json())
    .then(postData => {
      const post = {...postData};
      fetch(`https://dummyjson.com/users/${post.userId}`)
      .then(response => response.json())
      .then(userData => {
        post.user = userData;
        resolve(post);
      })
      .catch(reject)
    })
    
    .catch(reject)
  })

  return promise
}

// getPost(1)
// .then(post=> console.log(post))
// .catch(error => console.error(error))

/* SNACK 2
Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".*/

function lanciaDado(){
  const promise = new Promise((resolve,reject) => {
    console.log("Lancio il dado")
    setTimeout(() =>{ 
      let probabilità = Math.floor(Math.random() * 101);
      if ( probabilità > 20){
        const dado = Math.floor(Math.random() * 6) + 1;
        const messaggio = `Il tuo tiro è ${dado}`;
        resolve(messaggio)
      } else {
        const error = `Il dado si è incastrato`
        reject(error)
      }
    }, 3000)
  })
  return promise

}


lanciaDado()
.then(messaggio => console.log(messaggio))
.catch(error => console.log(error))


function creaLanciaDado(){
  let risultato

  return function checkRisultato(){
    const promise = new Promise((resolve,reject) => {
      console.log("Lancio il dado")
      setTimeout(() =>{ 
        let messaggio
        let probabilità = Math.floor(Math.random() * 101);
        if ( probabilità > 20){
          let dado = Math.floor(Math.random() * 6) + 1;
          if(risultato === dado){
            messaggio = `Il tuo tiro è sempre ${dado}, INCREDIBILE!`
            resolve(messaggio)
          } else{
            risultato = dado
            messaggio = `Il tuo tiro è ${dado}`;
            resolve(messaggio)
          } } else {
          const error = `Il dado si è incastrato`
          reject(error)
        }
      }, 3000)
    })
    return promise

  } 
  
}

const lancia = creaLanciaDado();
lancia()
.then(messaggio => console.log(messaggio))
.catch(error => console.error(error))
lancia()
.then(messaggio => console.log(messaggio))
.catch(error => console.error(error))
lancia()
.then(messaggio => console.log(messaggio))
.catch(error => console.error(error))


