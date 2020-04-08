import { storiesOf } from '@storybook/vue'
import GxMultiselect from '../../components/_Core/Forms/GxMultiselect.vue'
import { withInfo } from 'storybook-addon-vue-info'
import GxIcon from '../../components/_Core/Icons/GxIcon.vue'
import StoryRouter from 'storybook-vue-router'

storiesOf('Forms/GxMultiselect', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'default',
    () => ({
      components: {
        GxMultiselect,
        GxIcon,
      },
      data() {
        return {
          dropdownValue: '',
          options: ['Option 1', 'Option 2', 'Option 3'],
        }
      },
      template: `
        <div class="w-full p-4 ">
          <h1 class="font-bold" >GxMultiselect<h1/>
          <p class="mt-2 mb-8">This component is a dropdown that improves the user experience by being able to search for the desired option. <br/> In front-end we named this input as GxMultiselect which  is a simple wrapper over  <a target="_blank" class="italic text-primary" href="https://vue-multiselect.js.org">Vue Multiselect.</a> </br>
          Default GxMultiselect allows the user to search and select an option. The error message "No encontramos tu búsqueda" will be displayed if the typed option does not exist. It is changable by passing notFoundMsg prop.
          </p>

          <GxMultiselect selectLabel="Label" v-model="dropdownValue" placeholder="Elige una opción" :options="options" ></GxMultiselect>

          <div class="mt-32">
            <p class="font-bold"> Props description:<p/>
            <ul>
              <li>* allowEmpty: Can't deselect a value if it is true <li/>
              <li>* keepTypedValue: Keeps the value on the input even if it doesnt exists into the options <li/>
              <li>* multiple: Allows multiple selections<li/>
              <li>* taggable: Allows taggable options<li/>
              <li>* iconRight: Displays chevron_right at the end of the multiselect input<li/>
              <li>* iconRightClickHandler: Receives a function that will take the user to a list<li/>
              <li>* notFountMsg: Displays error message<li/>
              <li>* error: Displays error message and change input colors to alert user something is wrong or missing<li/>
            </ul>
          </div>
        </div>

      `,
      propsDescription: {
        GxMultiselect: {
          allowEmpty: 'cant deselect a value if it is true',
          keepTypedValue:
            'Keeps the value on the input even if it doesnt exists into the options',
          multiple: 'allows multiple selections',
          taggable: 'Allows taggable options',
          iconRight:
            'Displays chevron_right at the end of the multiselect input',
          iconRightClickHandler:
            'Receives a function that will take the user to a list ',
        },
      },
    })
    // {
    //   info: {
    //     summary: `
    //       GxMultiselect is a simple wrapper over Vue Multiselect https://vue-multiselect.js.org\n
    //     `,
    //   },
    // }
  )
  .add(
    'taggable',
    () => ({
      components: {
        GxMultiselect,
        GxIcon,
      },
      data() {
        return {
          dropdownValue: [],
          options: ['Option 1', 'Option 2', 'Option 3'],
        }
      },
      template: `
        <div class="w-full p-4">
        <h1 class="font-bold" >Taggable<h1/>
        <p class="mt-2 mb-8">This is a GxMultiselect variant which allows multiple selection of options and a searchable input to find the desire option. <br>
        To add tagging functionality set both :taggable and :multiple props to true. To know more info about vue multiselect tagging functionality click <a target="_blank"class="text-primary" href="https://vue-multiselect.js.org/#sub-tagging">here</a> </p>

        <GxMultiselect selectLabel="Label" v-model="dropdownValue" :multiple="true" :taggable="true" placeholder="Elige una o más opciones" :options="options">
          </GxMultiselect>

          <div class="mt-32">
          <p class="font-bold"> Props description:<p/>
          <ul>
            <li>* allowEmpty: Can't deselect a value if it is true <li/>
            <li>* keepTypedValue: Keeps the value on the input even if it doesnt exists into the options <li/>
            <li>* multiple: Allows multiple selections<li/>
            <li>* taggable: Allows taggable options<li/>
            <li>* iconRight: Displays chevron_right at the end of the multiselect input<li/>
            <li>* iconRightClickHandler: Receives a function that will take the user to a list<li/>
            <li>* notFountMsg: Displays error message<li/>
            <li>* error: Displays error message and change input colors to alert user something is wrong or missing<li/>
          </ul>
        </div>
        </div>
      `,
      propsDescription: {
        GxMultiselect: {
          allowEmpty: 'cant deselect a value if it is true',
          keepTypedValue:
            'Keeps the value on the input even if it doesnt exists into the options',
          multiple: 'allows multiple selections',
          taggable: 'Allows taggable options',
          iconRight:
            'Displays chevron_right at the end of the multiselect input',
          iconRightClickHandler:
            'Receives a function that will take the user to a list ',
        },
      },
    })
    // {
    //   info: {
    //     summary: `
    //       GxMultiselect is a simple wrapper over Vue Multiselect https://vue-multiselect.js.org\n
    //     `,
    //   },
    // }
  )
  .add(
    'custom caret',
    () => ({
      components: {
        GxMultiselect,
        GxIcon,
      },
      data() {
        return {
          dropdownValue: '',
          options: ['Option 1', 'Option 2', 'Option 3'],
        }
      },
      methods: {
        goToSomeList() {
          alert('Some list')
        },
      },
      template: `
      <div class="p-4">
        <h1 class="font-bold" >Custom caret<h1/>
          <p class="mt-2 mb-8"> You can pass an icon-right props, with a corresponding icon-right-click-handler to override the standard caret. <br> This variant is useful for scenarios such as picking a category, where you want to use Multiselect, but also provide
          a way to go to the Categories list page from the form you're on.</p>
        <div/>

      <GxMultiselect class="w-full pr-8"  :icon-right="true" :icon-right-click-handler="goToSomeList" :to="{name: 'home'}"  select-label="cuenta bancaria" v-model="dropdownValue" placeholder="cuenta bancaria" :options="options">
          </GxMultiselect>

      <div class="mt-32">
        <p class="font-bold"> Props description:<p/>
        <ul>
         <li>* allowEmpty: Can't deselect a value if it is true <li/>
         <li>* keepTypedValue: Keeps the value on the input even if it doesnt exists into the options <li/>
         <li>* multiple: Allows multiple selections<li/>
         <li>* taggable: Allows taggable options<li/>
         <li>* iconRight: Displays chevron_right at the end of the multiselect input<li/>
         <li>* iconRightClickHandler: Receives a function that will take the user to a list<li/>
         <li>* notFountMsg: Displays error message<li/>
         <li>* error: Displays error message and change input colors to alert user something is wrong or missing<li/>
        </ul>
      </div>
      `,
      propsDescription: {
        GxMultiselect: {
          allowEmpty: 'cant deselect a value if it is true',
          keepTypedValue:
            'Keeps the value on the input even if it doesnt exists into the options',
          multiple: 'allows multiple selections',
          taggable: 'Allows taggable options',
          iconRight:
            'Displays chevron_right at the end of the multiselect input',
          iconRightClickHandler:
            'Receives a function that will take the user to a list ',
        },
      },
    })
    // {
    //   info: {
    //     summary: `
    //       GxMultiselect is a simple wrapper over Vue Multiselect https://vue-multiselect.js.org\n
    //       You can pass an icon-right props, with a corresponding icon-right-click-handler to override the standard caret.
    //       This is useful for scenarios such as picking a category, where you want to use Multiselect, but also provide
    //       a way to go to the Categories page from the form you're on.
    //     `,
    //   },
    // }
  )

  .add(
    'keep typed value',
    () => ({
      components: {
        GxMultiselect,
      },
      data() {
        return {
          value: '',
          options: ['Option 1', 'Option 2', 'Option 3'],
        }
      },
      methods: {
        myFunction() {
          alert('More detail')
        },
      },
      template: `
      <div class="p-4">
        <h1 class="font-bold" >Keeping typed value<h1/>
        <p class="mt-2 mb-8"> Use :keep-typed-value prop to keep the value typed on the input. If this prop is set to false, GxMultiselect will only search for the option user might be looking for, <br> but when it comes to creat a new option (like a normal input) this prop must be set to true. </p>
      <div/>

        <GxMultiselect
        v-model="value"
        :icon-right="true"
        :icon-right-click-handler="myFunction"
        placeholder="Nombre del concepto*"
        select-label="Nombre del concepto*"
        :options="options"
        class="w-full pr-8"
        :multiple="false"
        :allow-empty="false"
        :taggable="false"
        :keep-typed-value="true"
      >
      </GxMultiselect>
      <div class="mt-32">
      <p class="font-bold"> Props description:<p/>
      <ul>
        <li>* allowEmpty: Can't deselect a value if it is true <li/>
        <li>* keepTypedValue: Keeps the value on the input even if it doesnt exists into the options <li/>
        <li>* multiple: Allows multiple selections<li/>
        <li>* taggable: Allows taggable options<li/>
        <li>* iconRight: Displays chevron_right at the end of the multiselect input<li/>
        <li>* iconRightClickHandler: Receives a function that will take the user to a list<li/>
        <li>* notFountMsg: Displays error message<li/>
        <li>* error: Displays error message and change input colors to alert user something is wrong or missing<li/>
      </ul>
      </div>
      `,
      propsDescription: {
        GxMultiselect: {
          allowEmpty: 'cant deselect a value if it is true',
          keepTypedValue:
            'Keeps the value on the input even if it doesnt exists into the options',
          multiple: 'allows multiple selections',
          taggable: 'Allows taggable options',
          iconRight:
            'Displays chevron_right at the end of the multiselect input',
          iconRightClickHandler:
            'Receives a function that will take the user to a list ',
        },
      },
    })
    // {
    //   info: {
    //     summary: `
    //       GxMultiselect is a simple wrapper over Vue Multiselect https://vue-multiselect.js.org\n
    //       You can pass an icon-right props, with a corresponding icon-right-click-handler to override the standard caret.
    //       This is useful for scenarios such as picking a category, where you want to use Multiselect, but also provide
    //       a way to go to the Categories page from the form you're on.
    //     `,
    //   },
    // }
  )
