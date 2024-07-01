
var urlBase = 'https://api.yumserver.com/16571/products';

// GUARDAR

function CreandoProducto() {

    const confirmacion = confirm('¿Desea Cargar equipo?');
    

    if(confirmacion)
        {
        const titulo = document.getElementById('Producto').value;
        const precioPeso = document.getElementById('Precioenpesos').value;
        const precioDolar = document.getElementById('Precioenusd').value;
        const fecha = document.getElementById('Fecha').value;

        fetch(urlBase, {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
        titulo:titulo,
        precioPeso:precioPeso,
        precioDolar:precioDolar,
        fecha: fecha,
        })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
    else {console.log('Operacion Cancelada');}
        
}

// CARGAR PRODUCTOS
function CargarProducto(){      
        fetch(urlBase)
        .then(response => response.json())
        .then( MostrarProductos)
        .catch(error => console.error('Error:'))
}


//Mostrar por pantalla productos

function MostrarProductos(data)
{
    const lista = document.getElementById('lista');
    lista.style.display = 'block';
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].titulo)
        html += `
        <tr>
            <td><b>${data[i].idcod}</b></td> 
            <td><b>${data[i].titulo}</b></td>   
            <td>${data[i].precioPeso}</td>
            <td>${data[i].precioDolar}</td>
            <td>${data[i].fecha}</td>
                <td><button class ='btnborrar' data-id='${data[i].idcod}' type='button'>Borrar</button></td>
            <td><button id='btnmodificar' class='btnmodificar' data-id='${data[i].idcod}' type='button'> Modificar</button></td>
            
        </tr>  
        `; 
    }

    document.getElementById('Resultados').innerHTML = html;

    //Capturo el id del boton eliminar
    let btneliminar = document.querySelectorAll('.btnborrar')
    btneliminar.forEach(element => {
        element.addEventListener('click',function() 
        {
            let idCodd = this.getAttribute('data-id');
            BorrarProducto(idCodd);
        })
    });

    let botonesEditar = document.querySelectorAll('.btnmodificar');
        botonesEditar.forEach(boton => {
            boton.addEventListener('click', function() {
                let idProducto = this.getAttribute('data-id');
                ModificarProducto(idProducto);
            });
        });

}

//Eliminar Producto

    function BorrarProducto(idcodigo)
    {
        if(confirm('¿Desea eliminar el producto?'))
        {
            
            fetch(urlBase,{
                    method:'DELETE',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify({
                    idcod: idcodigo,
                    })
            })
            .then(response => {
                if(!response.ok)
                    {
                        throw new Error('Network response was not ok ');
                    }
                    alert('Producto Borrado Correctamente')
                    CargarProducto();
            })
            .catch(error => console.error('Error:', error));
    
        }
        else{
            console.log('Operacion Borrar Cancelada.');
        }

                

    }

//Modificar Producto

    function ModificarProducto(idcodigo)
    {
        window.location.href = `/main/modificador.html?id=${idcodigo}`;
    }

       
                

    