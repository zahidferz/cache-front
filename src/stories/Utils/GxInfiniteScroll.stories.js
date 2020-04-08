import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import CenterDecorator from '../addons/CenterDecorator'
// import GxInfiniteScroll from '@components/_Core/Utils/GxInfiniteScroll.vue'
import GxInfiniteScrollStatic from '@components/_Core/Utils/GxInfiniteScrollStatic.vue'
import TestItem from '@components/_Core/Utils/TestItem.vue'
import GxLoader from '@components/_Core/Utils/GxLoader.vue'
import axios from 'axios'
import virtualList from 'vue-virtual-scroll-list'
import sortBy from 'lodash/sortBy'

storiesOf('Utils/GxInfiniteScroll', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add(
    'GxInfiniteScrollStatic',
    () => ({
      components: {
        GxInfiniteScrollStatic,
        GxLoader,
        VirtualList: virtualList,
        TestItem,
      },
      data() {
        return {
          list: [],
          itemSize: 48,
          searchTerm: '',
          item: TestItem,
          showVirtualList: true,
        }
      },
      created() {
        axios
          .get(
            'https://cdn.gestionix.com/cat/cat_006_mex_es_cfdi_clave_de_producto_o_servicio&c.json'
          )
          .then((res) => {
            this.list = Object.freeze(sortBy(res.data, ['d']))
          })
      },
      methods: {
        getItemProps(itemIndex) {
          return {
            key: itemIndex,
            props: {
              item: this.list[itemIndex] || {},
            },
          }
        },
      },
      watch: {
        searchTerm(newVal) {
          this.$nextTick(() => {
            this.$refs.virtualList.forceRender()
          })
        },
      },
      template: `
        <div class="w-full">
          <div><input v-model="searchTerm" placeholder="Búsqueda" /></div>
          <GxInfiniteScrollStatic :list="list" :page-size="30" :search-keys="['d']" :search-term="searchTerm" component="ul" class="w-full">
              <template slot-scope="{ loading, listData }">
                <VirtualList
                  ref="virtualList"
                  :size="48"
                  :remain="30"
                  :pagemode="true"
                />
                  <TestItem v-for="item of listData" :item="item" :key="item.c" />
                </VirtualList>
              </template>
          </GxInfiniteScrollStatic>
        </div>
      `,
    }),
    {
      info: {
        summary: `
          An infinite scroller that takes a custom array of objects and provides search and pagination for it.
          It requires the following props:
          list - the array of objects to paginate and search
          searchTerm - string to search against
          searchKeys - array of object keys to search against (required if searchTerm is provided)
          component - wrapper element (defaults to a div)
          pageSize - How many items to return per page
        `,
      },
    }
  )
