const apiurl = `https://orvapi.onrender.com`
async function addcharacter() {
    const form = document.getElementById('addcharacter')
    const formData = new FormData(form)

    try {
        const response = await fetch(`${apiurl}/characters`, {
            method: 'POST',
            body: formData
        })
        if (response.ok) {
            alert('Personagem adicionado!')
            form.reset()
            mostracharacters()
        }
        else {
            throw new Error('Erro ao adicionar personagem')
        }
    }
    catch(error) {
        console.error('Erro:' + error);
    }
}

async function fetchpersonagens() {
    let container = document.getElementById('container')
    container.innerHTML = ''
    try {
        let response = await fetch(`${apiurl}/characters`)
        let personagens = await response.json()

        if (personagens.length == 0) {
            container.innerHTML ='<h1>Nenhum personagem registrado</h1>'
            return
        }

        personagens.forEach (personagem => {
            let card = `
            <div class="card">
                <img src="${personagem.img1}" alt="${personagem.name}1">
                <img src="${personagem.img2}" alt="${personagem.name}2">
                <h3>Nome: <b>${personagem.name}</b></h3>
                <h4>Raça: ${personagem.race}</h4>
                <h4>Patrocinador: ${personagem.constellation}</h4>
                <h6>Id: ${personagem.id}</h6>
                <p><b>Descrição:</b> ${personagem.description}</p>
            </div>`
            console.log(personagem.img1)
            console.log(personagem.img2)
            container.innerHTML += card
        });
    }
    catch (error) {
        console.error('erro ao mostrar personagens')
    }
}