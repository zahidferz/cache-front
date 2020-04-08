import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

storiesOf('Colors/colors', module)
  .addDecorator(withInfo)
  .add(
    'colors',
    () => ({
      template: `
      <div class="p-8">
      <div class="flex flex-col px-4 mb-8">
            <div class="flex flex-col">
              <h5 class="gx-h3 mb-4">Text color</h5>
              <h4 class="gx-h5 mb-4">bg-black</h4>
            </div>
            <div class="flex w-full">
              <div class="flex flex-col text-black px-8">
                <div class="rounded-lg text-center bg-black w-20 h-20"></div>
                <p class="text-black">text color <br/> #191B1D </p>
              </div>
            </div>
             <div class="flex flex-col">
              <h5 class="gx-h3 mb-4">Underlined text</h5>
              <h4 class="gx-h5 mb-4">bg-underlined</h4>
            </div>
            <div class="flex w-full">
              <div class="flex flex-col text-black px-8">
                <div class="rounded-lg text-center bg-underlined w-20 h-20"></div>
                <p class="text-black">underlined <br/> #191B1D </p>
              </div>
            </div>
          </div>
         <div class="flex flex-col px-4 mb-8">
            <div class="flex flex-col">
              <h5 class="gx-h3 mb-4">Primary</h5>
              <h4 class="gx-h5 mb-4">bg-primary-x</h4>
            </div>
            <div class="flex w-full">
              <div class="flex flex-col text-black px-8">
                <div class="rounded-lg text-center bg-primary-600 w-20 h-20"></div>
                <p class="text-black">Purple 600 <br/> #4B23EF </p>
              </div>
              <div class="flex flex-col text-black px-8">
                <div class="rounded-lg text-center bg-primary-500 w-20 h-20"></div>
                <p class="text-black">Purple 500 <br/> #6D31FF  </p>
                <p class="text-black font-bold"> Main </p>
              </div>
               <div class="flex flex-col text-black px-8">
                <div class="rounded-lg text-center bg-primary-400 w-20 h-20"></div>
                <p class="text-black">Purple 400 <br/> #8855FF </p>
               </div>
            </div>
          </div>
          <div class="flex flex-col px-4 mb-8">
            <div class="flex flex-col">
              <h5 class="gx-h3 mb-4">Secondary</h5>
              <h4 class="gx-h5 mb-4">bg-secondary-x</h4>
            </div>
            <div class="flex w-full">
              <div class="flex flex-col text-black px-8">
                <div class="rounded-lg text-center bg-secondary-300 w-20 h-20"></div>
                <p class="text-black">Purple 300 <br/> #A176FF </p>
               </div>
               <div class="flex flex-col text-black px-8">
                 <div class="rounded-lg text-center bg-secondary-200 text-black w-20 h-20"></div>
                 <p class="text-black">Purple 200 <br/> #BEA0FF</p>
               </div>
               <div class="flex flex-col text-black px-8">
                <div class="rounded-lg text-center bg-secondary-100 text-black w-20 h-20"></div>
                <p class="text-black">Purple 100 <br/> #D8C6FE </p>
               </div>
               <div class="flex flex-col text-black px-8">
                 <div class="rounded-lg text-center bg-secondary-50 text-black w-20 h-20"></div>
                 <p class="text-black">Purple 50 <br/> #F1E8FF</p>
                </div>
              </div>
             </div>
             <div class="flex flex-col px-4 mb-8">
               <div class="flex flex-col">
                <h5 class="gx-h3 mb-4">Gradient colors</h5>
                <h4 class="gx-h5 mb-4">bg-gradient-x</h4>
             </div>
             <div class="flex w-full ">
               <div class="flex flex-col text-black px-8">
                <div class="rounded-lg text-center bg-white border w-20 h-20" ></div>
                <p class="text-black">Color/Surface/Main <br/> #FFFFF</p>
              </div>
              <div class="flex flex-col text-black px-8">
                <div class="rounded-lg text-center bg-primary w-20 h-20"></div>
                <p class="text-black">Primary gradient<br/> Color #1: #6D31FF <br/>Color #2: #9167F8</p>
                <p>Degradado para pantallas principales.<br/> Nunca debe competir con botones.</p>
              </div>
              <div class="flex flex-col text-black px-2">
                <div class="rounded-lg text-center bg-primary-2 w-20 h-20"></div>
                 <p class="text-black">Secondary gradient <br/> Color #1: #4B23EF <br/> Color #2: #6D31FF</p>
                 <p>Degradado secundario; siempre se usa en fondos.</p>
                </div>
              </div>
             </div>
            </div>
      `,
    }),
    {
      info: {
        summary: `
          Colors can be used via Tailwind classes for background, text and other utilities.\n
          Black is the default color for all text.\n
          Tailwind reads all colors from CSS custom properties inside our _colors.scss partial.\n
          Should you need to use any of these inside a Vue component and Tailwind classes are not enought, you can use with **var(--gray-400)** like so:
          <pre>
          .customClass{
            color: var(--gray-400);
          }
          </pre>
        `,
      },
    }
  )
  .add(
    'dark and light',
    () => ({
      template: `
        <div class="p-8">
         <div class="flex flex-col px-4 mb-8">
            <div class="flex flex-col">
              <h5 class="gx-h3 mb-4">Dark</h5>
              <h4 class="gx-h5 mb-8">Para brindar dinamismo a la aplicación habrá flujos en versión dark en los cuales el degradado secundario será el color de fondo. En dichos fondos la combinación de colores debe darse de la siguiente manera:</h4>
              </div>
              <div class="flex w-full text-center ">
               <div class="flex flex-col w-full">
                <div class="text-center bg-primary-600 w-50 h-20 w-full"></div>
                 <p>Purple 600 <br/> #4B23EF </p>
                 <p class="m-4">Se usa como fondo en las pantallas versión dark y de color de la nav bar </p>
                </div>
               <div class="flex flex-col w-full">
                <div class=" text-center bg-primary-500 w-50 h-20 w-full"></div>
                 <p>Purple 500 <br/> #6D31FF  </p>
                 <p class="m-4">Main color, acción principal donde debe centrarse la atención del usuario.</p>
                </div>
               <div class="flex flex-col w-full">
                <div class=" text-center bg-primary-400 w-50 h-20 w-full"></div>
                 <p>Purple 400 <br/> #8855FF </p>
                 <p class="m-4">Top Bar o acciones secundarias (iconos o float button)</p>
                </div>
                 <div class="flex flex-col w-full">
                 <div class=" text-center bg-white border w-50 h-20 w-full"></div>
                 <p>White  <br/> #fffffff </p>
                 <p class="m-4">Color de fondo de nuestras cards y modales</p>
               </div>
                <div class="flex flex-col w-full">
                 <div class=" text-center bg-secondary-300 w-50 h-20 w-full"></div>
                 <p>Purple 300 <br/> #A176FF </p>
                 <p class="m-4">Color de contraste en el fondo dark; es el color default de los inputs</p>
                </div>
               </div>
              </div>
             <div class="flex flex-col">
              <h5 class="gx-h3 mb-4">Light</h5>
              <h4 class="gx-h5 mb-8">Dentro de las pantallas cuyo fondo predominante sea el color blanco los colores se combinan de la siguiente manera:</h4>
              </div>
              <div class="flex w-full text-center ">
                <div class="flex flex-col w-full">
                 <div class=" text-center bg-white border w-50 h-20 w-full"></div>
                 <p>White <br/> #fffffff </p>
                 <p class="m-4">Color de fondo de las pantallas en versión light</p>
                </div>
                <div class="flex flex-col w-full">
                <div class=" bg-primary-600 flex-col w-50 h-20 w-full"></div>
                 <p>Purple 600 <br/> #4B23EF </p>
                 <p class="m-4">Color de contraste; se usa en la navbar sólo en las pantallas en donde sea requerida una división evidente. </p>
                </div>
               <div class="flex flex-col w-full">
                <div class=" text-center bg-primary-500 w-50 h-20 w-full"></div>
                 <p>Purple 500 <br/> #6D31FF  </p>
                 <p class="m-4">Main color, acción principal donde debe centrarse la atención del usuario.</p>
                </div>
               <div class="flex flex-col w-full">
                <div class=" text-center bg-primary-400 w-50 h-20 w-full"></div>
                 <p>Purple 400 <br/> #8855FF </p>
                 <p class="m-4">Top Bar o acciones secundarias.</p>
                </div>
               </div>
              </div>
            </div>
          </div>
      `,
    }),
    {
      info: {
        summary: `
          Colors can be used via Tailwind classes for background, text and other utilities.\n
          Black is the default color for all text.\n
          Tailwind reads all colors from CSS custom properties inside our _colors.scss partial.\n
          Should you need to use any of these inside a Vue component and Tailwind classes are not enought, you can use with **var(--gray-400)** like so:
          <pre>
          .customClass{
            color: var(--gray-400);
          }
          </pre>
        `,
      },
    }
  )
  .add(
    'Jerarquía de acciones',
    () => ({
      template: `
      <div class="p-8">
        <div class="flex flex-col ">
          <div class="flex flex-col">
            <h5 class="gx-h3 mb-4">Elementos de igual importancia</h5>
            <h4 class="gx-h5 mb-4">Colores similares, no compiten entre si, el usuario sabe que cualquiera de las dos opciones es la correcta.</h4>
          </div>
        <div class="flex w-full text-center">
          <div class="flex flex-col mr-8 w-full">
            <div class=" bg-primary-400 flex-col w-50 h-20 w-full"></div>
            <p>Purple 400 <br/> #8855FF </p>
          </div>
          <div class="flex flex-col w-full mb-8">
            <div class=" text-center bg-primary-500 w-50 h-20 w-full"></div>
              <p>Purple 500 <br/> #6D31FF  </p>
            </div>
           </div>
           <div class="flex flex-col">
              <h5 class="gx-h3 mb-4">Elementos con uno de mayor importancia buscando guiar al usuario</h5>
              <h4 class="gx-h5 mb-4">Colores de contraste. P500 se muestra con mayor importancia visual frente al P300. Indicamos al usuario que pese a no existir una elección correcta, el proceso es más rápido, fácil o automático al elegir la acción principal.</h4>
            </div>
           <div class="flex w-full text-center">
             <div class="flex flex-col mr-8 w-full mb-8">
              <div class=" bg-secondary-300 flex-col w-50 h-20 w-full"></div>
              <p>Purple 300 <br/> #4B23EF </p>
             </div>
             <div class="flex flex-col w-full">
              <div class=" text-center bg-primary-500 w-50 h-20 w-full"></div>
              <p>Purple 500 <br/> #6D31FF  </p>
              </div>
            </div>
            <div class="flex flex-col">
             <h5 class="gx-h3 mb-4">Elementos que marcan acciones positivas o negativas</h5>
            </div>
            <div class="flex w-full text-center">
              <div class="flex flex-col mr-8 w-full">
                <div class=" bg-alert flex-col w-50 h-20 w-full"></div>
                <p>Alert Color <br/> #DE243A </p>
                <p class="m-4">Marca acciones negativas, de alarma, errores o en las que haya que prestar atención. </p>
             </div>
               <div class="flex flex-col mr-8 w-full">
                <div class=" text-center bg-success w-50 h-20 w-full"></div>
                <p>Success color <br/> #10D372  </p>
                <p class="m-4">Indica acciones positivas, aprobadas y resultados exitosos.</p>
               </div>
               <div class="flex flex-col mr-8 w-full">
                <div class=" text-center bg-pending w-50 h-20 w-full"></div>
                <p>Pending color <br/> #EFB800  </p>
                <p class="m-4">Indica acciones pendientes, no urgentes pero que requieren la atención del usuario</p>
               </div>

              <div class="flex flex-col w-full">
                <div class=" text-center bg-primary-500 w-50 h-20 w-full"></div>
                <p>Purple 500 <br/> #6D31FF  </p>
                <p class="m-4">Indica acciones principales o una única acción posible (ej. continuar)</p>
              </div>
            </div>
          </div>
        </div>


      `,
    }),
    {
      info: {
        summary: `
          Colors can be used via Tailwind classes for background, text and other utilities.\n
          Black is the default color for all text.\n
          Tailwind reads all colors from CSS custom properties inside our _colors.scss partial.\n
          Should you need to use any of these inside a Vue component and Tailwind classes are not enought, you can use with **var(--gray-400)** like so:
          <pre>
          .customClass{
            color: var(--gray-400);
          }
          </pre>
        `,
      },
    }
  )
  .add(
    'Gray scale',
    () => ({
      template: `
      <div class="p-8">
        <div class="flex flex-col px-4 mb-8">
            <div class="flex flex-col">
              <h5 class="gx-h3 mb-4">Gray scale</h5>
              <h4 class="gx-h5 mb-4">bg-gray-x</h4>
              <p class="mb-2">La gama de grises deberá ser usada en las opciones inactivas o para indicar elementos de menor importancia.</p>
            </div>
            <div class="flex flex-col">
              <div class="flex w-full mb-8">
               <div class="flex flex-col text-black px-8">
                 <div class=" text-center bg-gray-700 w-20 h-20" ></div>
                 <p class="text-black">Gray 700 <br/> #707070</p>
               </div>
               <div class="flex flex-col text-black px-8">
                  <div class=" text-center bg-gray-600 w-20 h-20"></div>
                  <p class="text-black">Gray 600 <br/> #7E7E7E</p>
               </div>
               <div class="flex flex-col text-black px-8">
                  <div class=" text-center bg-gray-500 w-20 h-20"></div>
                  <p class="text-black">Gray 500 <br/> #909090</p>
               </div>
               <div class="flex flex-col text-black px-8">
                  <div class=" text-center bg-gray-400 w-20 h-20"></div>
                  <p class="text-black">Gray 400 <br/> ##D0D0D0</p>
               </div>
              </div>
              <div class="flex">
                <div class="flex flex-col text-black px-8">
                 <div class=" text-center bg-gray-300 text-black w-20 h-20"></div>
                  <p class="text-black">Gray 300 <br/> #E0E0E0</p>
                 </div>
                <div class="flex flex-col text-black px-8">
                  <div class=" text-center bg-gray-200 text-black w-20 h-20"></div>
                  <p class="text-black">Gray 200 <br/> #F5F5F5</p>
                </div>
                <div class="flex flex-col text-black px-8">
                  <div class=" text-center bg-gray-100 text-black w-20 h-20"></div>
                  <p class="text-black">Gray 100 <br/> #FAFAFA</p>
               </div>
              </div>
             </div>
            </div>
          </div>
      `,
    }),
    {
      info: {
        summary: `
          Colors can be used via Tailwind classes for background, text and other utilities.\n
          Black is the default color for all text.\n
          Tailwind reads all colors from CSS custom properties inside our _colors.scss partial.\n
          Should you need to use any of these inside a Vue component and Tailwind classes are not enought, you can use with **var(--gray-400)** like so:
          <pre>
          .customClass{
            color: var(--gray-400);
          }
          </pre>
        `,
      },
    }
  )
  .add(
    'Sales and Expenses',
    () => ({
      template: `
      <div class="p-8 flex flex-col">
          <div>
            <div class="flex flex-col">
             <h5 class="gx-h3 mb-4">Colores ventas</h5>
            </div>
            <div class="flex w-full text-center">
              <div class="flex flex-col mr-8 w-full">
                <div class=" bg-sales-1 flex-col w-50 h-20 w-full mb-2"></div>
                <p>Ventas 1 <br/>#2ABDD2 </p>
             </div>
               <div class="flex flex-col mr-8 w-full">
                <div class=" text-center bg-sales-2 w-50 h-20 w-full mb-2"></div>
                <p>Ventas 2 <br/> #22D0DD </p>
               </div>
               <div class="flex flex-col mr-8 w-full">
                <div class=" text-center bg-sales-3 w-50 h-20 w-full mb-2"></div>
                <p>Ventas 3 <br/> #7CDBE8 </p>
               </div>
            </div>
            <div class="flex flex-col">
             <h5 class="gx-h3 mb-4">Colores Gastos</h5>
            </div>
            <div class="flex w-full text-center">
              <div class="flex flex-col mr-8 w-full">
                <div class=" bg-expenses-1 flex-col w-50 h-20 w-full mb-2"></div>
                <p>Gastos 1 <br/>#FF664A </p>
             </div>
               <div class="flex flex-col mr-8 w-full">
                <div class=" text-center bg-expenses-2 w-50 h-20 w-full mb-2"></div>
                <p>Gastos 2 <br/> #FF9A88 </p>
               </div>
               <div class="flex flex-col mr-8 w-full">
                <div class=" text-center bg-expenses-3 w-50 h-20 w-full mb-2"></div>
                <p>Gastos 3 <br/> #FFC8BE </p>
               </div>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          Colors can be used via Tailwind classes for background, text and other utilities.\n
          Black is the default color for all text.\n
          Tailwind reads all colors from CSS custom properties inside our _colors.scss partial.\n
          Should you need to use any of these inside a Vue component and Tailwind classes are not enought, you can use with **var(--gray-400)** like so:
          <pre>
          .customClass{
            color: var(--gray-400);
          }
          </pre>
        `,
      },
    }
  )
  .add(
    'Avatar Colors',
    () => ({
      template: `
      <div class="p-8 flex flex-col">
        <div class="flex flex-col">
          <h5 class="gx-h3 mb-4">Colores para avatares</h5>
            <div class="flex text-center m-4">
              <div class="flex flex-col mr-8">
                <div class=" bg-avatar-0 flex-col w-13 h-13 mb-2 rounded-full"></div>
                <p>#0A1B79</p>
               </div>
               <div class="flex flex-col mr-8 ">
                <div class=" text-center bg-avatar-1 w-13 h-13 rounded-full mb-2"></div>
                <p>#0B3AD8</p>
               </div>
              <div class="flex flex-col mr-8 ">
                <div class=" text-center bg-avatar-2 w-13 h-13 rounded-full mb-2"></div>
                <p>#486FF4</p>
               </div>
               <div class="flex flex-col mr-8">
                 <div class=" bg-avatar-3 flex-col w-13 h-13 rounded-full mb-2"></div>
                 <p>#48A5F4</p>
                </div>
              </div>

              <div class="flex m-4">
               <div class="flex flex-col mr-8">
                <div class=" text-center bg-avatar-4 w-13 h-13 rounded-full mb-2"></div>
                <p>#841313</p>
              </div>
              <div class="flex flex-col mr-8">
                <div class=" text-center bg-avatar-5 w-13 h-13 rounded-full mb-2"></div>
                <p>#C92E00</p>
              </div>
              <div class="flex flex-col mr-8">
                <div class=" bg-avatar-6 flex-col w-13 h-13 rounded-full mb-2"></div>
                <p>#F4660E</p>
              </div>
               <div class="flex flex-col mr-8">
                <div class=" text-center bg-avatar-7 w-13 h-13 rounded-full mb-2"></div>
                <p>#F4BF0E</p>
               </div>
             </div>

             <div class="flex m-4">
               <div class="flex flex-col mr-8 ">
                <div class=" text-center bg-avatar-8 w-13 h-13 rounded-full mb-2"></div>
                <p>#09533C</p>
               </div>
              <div class="flex flex-col mr-8 ">
                <div class=" bg-avatar-9 flex-col w-13 h-13 rounded-full mb-2"></div>
                <p>#2E9A3B</p>
              </div>
               <div class="flex flex-col mr-8 ">
                <div class=" text-center bg-avatar-10 w-13 h-13 rounded-full mb-2"></div>
                <p>#73C437</p>
               </div>
               <div class="flex flex-col mr-8 ">
                <div class=" text-center bg-avatar-11 w-13 h-13 rounded-full mb-2"></div>
                <p>#8AD056</p>
               </div>
              </div>

              <div class="flex m-4">
                <div class="flex flex-col mr-8 ">
                  <div class=" bg-avatar-12 flex-col w-13 h-13 rounded-full mb-2"></div>
                  <p>#A73889</p>
                </div>
                <div class="flex flex-col mr-8 ">
                  <div class=" text-center bg-avatar-13 w-13 h-13 rounded-full mb-2"></div>
                  <p>#CC1987</p>
                </div>
                <div class="flex flex-col mr-8 ">
                  <div class=" text-center bg-avatar-14 w-13 h-13 rounded-full mb-2"></div>
                  <p>#FF029D</p>
                </div>
                <div class="flex flex-col mr-8 ">
                  <div class=" text-center bg-avatar-15 w-13 h-13 rounded-full mb-2"></div>
                  <p>#F76FC2</p>
                 </div>
              </div>

                <div class="flex m-4">
                  <div class="flex flex-col mr-8 ">
                    <div class=" text-center bg-avatar-16 w-13 h-13 rounded-full mb-2"></div>
                    <p>#16171A</p>
                  </div>
                  <div class="flex flex-col mr-8 ">
                    <div class=" text-center bg-avatar-17 w-13 h-13 rounded-full mb-2"></div>
                    <p>#41445D</p>
                  </div>
                  <div class="flex flex-col mr-8 ">
                    <div class=" text-center bg-avatar-18 w-13 h-13 rounded-full mb-2"></div>
                    <p>#727693</p>
                   </div>
                   <div class="flex flex-col mr-8 ">
                    <div class=" text-center bg-avatar-19 w-13 h-13 rounded-full mb-2"></div>
                    <p>#979DC6</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          Colors can be used via Tailwind classes for background, text and other utilities.\n
          Black is the default color for all text.\n
          Tailwind reads all colors from CSS custom properties inside our _colors.scss partial.\n
          Should you need to use any of these inside a Vue component and Tailwind classes are not enought, you can use with **var(--gray-400)** like so:
          <pre>
          .customClass{
            color: var(--gray-400);
          }
          </pre>
        `,
      },
    }
  )
