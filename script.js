document.addEventListener('DOMContentLoaded', () => {
    const publicacoes = [
        { titulo: 'Publicação 1', ano: 2021, link: '#' },
        { titulo: 'Publicação 2', ano: 2022, link: '#' },
        { titulo: 'Publicação 3', ano: 2023, link: '#' },
    ];

    const listaPublicacoes = document.getElementById('lista-publicacoes');

    publicacoes.forEach(pub => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = `${pub.titulo} (${pub.ano})`;
        a.href = pub.link;
        a.target = '_blank';
        li.appendChild(a);
        listaPublicacoes.appendChild(li);
    });

    const formContato = document.getElementById('form-contato');
    formContato.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso!');
        formContato.reset();
    });
});
