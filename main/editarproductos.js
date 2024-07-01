const urlBase = 'https://api.yumserver.com/16571/products';

// Obtengo el id de la url para editar ese producto.
const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get('id');

fetch(`${urlBase}/${idProducto}`)
.then(response => {
    if (!response.ok) {
        throw new Error('No se pudo obtener los datos del producto');
    }
    return response.json();
})
.then(producto => {
    document.getElementById('Producto').value = producto.titulo;
    document.getElementById('Fecha').value = producto.fecha; 
    document.getElementById('Precioenpesos').value = producto.precioPeso;
    document.getElementById('Precioenusd').value = producto.precioDolar;
})
.catch(error => {
    console.error('Error:', error);
    alert('No se pudo obtener los datos del producto');
});

document.getElementById('btnguardar').addEventListener('click', function() {
    const id = idProducto;
    const nuevoTitulo = document.getElementById('Producto').value;
    const fechaNueva = document.getElementById('Fecha').value;
    const nuevoPesos = document.getElementById('Precioenpesos').value;
    const nuevoDolar = document.getElementById('Precioenusd').value;

    const datosActualizados = {
        idcod: id,
        titulo: nuevoTitulo, 
        precioPeso: nuevoPesos,
        precioDolar: nuevoDolar,
        fecha: fechaNueva
    };

    fetch(urlBase ,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al modificar el producto');
        }
        alert('Producto editado correctamente');
        window.location.href = '/main/equipos.html';
    })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto');
    });
});
