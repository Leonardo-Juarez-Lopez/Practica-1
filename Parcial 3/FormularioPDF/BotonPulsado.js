document.addEventListener('DOMContentLoaded', function () {
    const btnEnviar = document.getElementById("btnEnviar");
    const formulario = document.getElementById("Forma");

    if (btnEnviar && formulario) {
        btnEnviar.addEventListener("click", async function (event) {
            event.preventDefault(); // Prevenir envío por defecto
            const datosForm = new FormData(formulario);

            try {
                const response = await fetch('http://localhost:8080/Formulario', {
                    method: 'POST',
                    body: datosForm
                });

                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                const data = await response.blob();  // Obtener el archivo PDF como Blob
                const url = URL.createObjectURL(data); // Crear URL para el archivo
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Documento.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

            } catch (error) {
                console.error('Error durante el envío:', error);
            }
        });
    } else {
        console.warn("El formulario o el botón 'Enviar' no existen en el DOM.");
    }
});
