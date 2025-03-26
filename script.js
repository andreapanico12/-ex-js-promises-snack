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
      const post = postData;
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

getPost(1)
.then(post=> console.log(post))
.catch(error => console.error(error))