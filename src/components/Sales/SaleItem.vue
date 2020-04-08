<script>
import NewConcept from '@components/Sales/NewConcept'

export default {
  name: 'SaleItem',
  components: {
    NewConcept,
  },
  filters: {
    currency(amount) {
      let validAmount = isNaN(amount) || !amount ? 0 : amount
      return Number(Number(validAmount).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2,
      })
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'MXN',
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateItem(concept) {
      this.$emit('update', concept)
    },
    isValid() {
      if (!this.$refs.saleItemRefConcept.isValid()) {
        return false
      }
      return true
    },
  },
}
</script>
<template>
  <!-- Need a wrapper element to provide the click handler and close automatically when a click occurs outside the bounds of both -->
  <!-- the concept summary and the concept edit -->
  <div v-on="$listeners">
    <div v-show="edit">
      <NewConcept
        ref="saleItemRefConcept"
        :key="item.localId"
        :item-local-id="item.localId"
        :item="item"
        class="mb-8"
        :edit="edit"
        :index="index"
        @updateItem="updateItem"
      />
    </div>
    <div v-show="!edit" class="de:p-8 de:pt-0 px-4 pb-4 cursor-pointer">
      <!-- descripción -->
      <p class="pb-2 truncate">{{ item.description }}</p>
      <!-- Clave -->
      <p class="pb-2 truncate">{{ item.key }} </p>
      <!-- Clave SAT -->
      <!-- <p class="pb-2">
        {{ item.itemAdditionalDataLocalizedInput_MEX.claveProductoServicioSAT }} -
        {{
          item.itemAdditionalDataLocalizedInput_MEX
            .claveProductoServicioSATDescripcion
        }}
      </p> -->
      <!-- cantidad + unidad  -->
      <p class="pb-2"
        >{{ item.quantity }}
        {{
          item.itemAdditionalDataLocalizedInput_MEX &&
          item.itemAdditionalDataLocalizedInput_MEX.claveUnidadMedidaSAT
            ? item.itemAdditionalDataLocalizedInput_MEX.claveUnidadMedidaSAT
            : ''
        }}
        {{
          item.itemAdditionalDataLocalizedInput_MEX &&
          item.itemAdditionalDataLocalizedInput_MEX
            .claveUnidadMedidaSATDescripcion
            ? ` - ${
                item.itemAdditionalDataLocalizedInput_MEX
                  .claveUnidadMedidaSATDescripcion
              }`
            : ''
        }}</p
      >
      <!-- Impuesto trasladado, porcentaje, monto  -->
      <!-- <p
        v-for="(taxes, taxIndex) in item.selectedTransferredTaxes"
        :key="`transferred-${taxIndex}-${JSON.stringify(taxes)}`"
        class="pb-2"
      >
        <span
          >{{ taxes.name }} trasladado, Tasa {{ taxes.percentage }}%, Monto ${{
            Number(taxes.amount).toLocaleString('en', {
              minimumFractionDigits: 2,
            })
          }}
          {{ item.currency }}
        </span>
      </p> -->
      <!-- Impuesto retenido, porcentaje, monto -->
      <!-- <p
        v-for="(taxes, position) in item.selectedWithheldTaxes"
        :key="`withheld-${position}-${JSON.stringify(taxes)}`"
        class="pb-2"
      >
        <span
          >{{ taxes.name }} Retenido, Tasa {{ taxes.percentage }}%, Monto ${{
            Number(taxes.amount).toLocaleString('en', {
              minimumFractionDigits: 2,
            })
          }}
          {{ item.currency }}
        </span>
      </p> -->

      <!-- Descuento , monto -->
      <p v-if="item.discountPercentage" class="pb-2"
        >Descuento {{ item.discountPercentage }}%, Monto ${{
          Number(item.discountAmount).toLocaleString('en', {
            minimumFractionDigits: 2,
          })
        }}
        {{ item.currency }}</p
      >

      <!-- <p v-if="item.additionalNotes" class="pb-2 truncate">{{
        item.additionalNotes
      }}</p> -->
      <p class="de:pb-0 pb-4 text-right de:pt-2 gx-body de:gx-body"
        >Importe ${{ item.totalAmount | currency }} {{ currency }}</p
      >

      <p
        class="flex text-gray-500 gx-caption de:gx-caption font-bold py-2 mb-4 uppercase"
      >
        <!-- <button
          class="flex ml-auto gx-caption de:gx-caption items-center cursor-pointer"
          @click.prevent="edit = true"
          >Editar concepto <GxIcon class="text-primary ml-2" icon="edit"
        /></button> -->
      </p>
    </div>
  </div>
</template>
