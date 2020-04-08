import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Date Format/DateFormat', module)
  .addDecorator(withInfo)
  .add(
    'default',
    () => ({
      components: {},
      methods: {
        clicked(msg) {
          alert(msg)
        },
      },
      template: `
     <div class="flex flex-col p-4">
      <h1 class="gx-h3 mb-8 font-bold">FORMATOS DE FECHA Y HORA</h1>
     <div class="flex ">
       <div class="flex flex-col justify-between mr-8">
          <p class="font-bold mb-2"> Sólo mes</p>
          <p class="font-bold mb-2"> Rango mismo mes </p>
          <p class="font-bold mb-2"> Rango meses </p>
          <p class="font-bold"> Hoy </p>
        </div>
        <div class="flex flex-col justify-between mr-8">
            <p> Junio</p>
            <p> 17 al 23 de junio </p>
            <p> 30 de sep al 6 de oct </p>
            <p> Hoy - <span> Junio</span></p>
          </div>

        <div class="flex flex-col justify-between mr-8">
            <p class="font-bold"> Hora exacta</p>
            <p class="font-bold">Cuando se refiere a segundos</p>
            <p class="font-bold"> Rango meses diferentes </p>
            <p class="font-bold"> Hoy con hora </p>
          </div>

          <div class="flex flex-col justify-between mr-8">
            <p> 4:39 a.m.</p>
            <p>Hace unos momentos</p>
            <p> Hace 25 minutos </p>
            <p> Hoy a las 5:30 p.m.</p>
          </div>

         <div class="flex flex-col justify-between mr-8">
            <p class="font-bold"> Ayer con hora</p>
            <p class="font-bold">Fecha y hora</p>
            <p class="font-bold"> Fecha, año y hora </p>
          </div>

          <div class="flex flex-col justify-between">
            <p>Ayer a las 3:39 p.m.</p>
            <p> 9 de julio a las 4:30 a.m.  </p>
            <p> 9 de julio del 2017 a la 1:30 p.m.</p>
          </div>
         </div>
        `,
    }),
    {
      info: {
        summary: `El puntaje de la fecha y la hora, dependerá del elemento en donde se utilicé pero el formato siempre debe respetarse.`,
      },
    }
  )
  .add(
    'contracción',
    () => ({
      template: `
     <div class="flex flex-col p-4">
     <h1 class="gx-h3 mb-8 font-bold">CONTRACCIÓN</h1>
      <div class="flex mb-8">
        <p class="font-bold mr-13"> Hoy / hora - <span> Hoy 5:30 a.m.</span></p>
        <p class="font-bold"> Hora exacta - <span> 4:59 a.m. </span> </p>
        </div>

        <div class="flex mb-8">
        <p class="font-bold mr-8"> Ayer con Hora - <span> Ayer 2:30 a.m. </span> </p>
        <p class="font-bold">Fecha con año y hora - <span> 31/12/2017, 1:30 p.m.</span> </p>
         </div>
               <p >Cuando por motivos de espacio no podamos utilizar el formato de fecha, se deben ocupar las contracciones.</p>
    </div>

        `,
    }),
    {
      info: {
        summary: `Cuando por motivos de espacio no podamos utilizar el formato de fecha, se deben ocupar las contracciones.`,
      },
    }
  )
