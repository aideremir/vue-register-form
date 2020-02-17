<template>
  <div class="default-layout">
    <nuxt />
    <base-modal @close="hideModal" :is-visible="isModalVisible">
      <portal-target name="modal" />
    </base-modal>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import BaseModal from '~/components/base/BaseModal';

  export default {
    components: {
      BaseModal
    },
    computed: {
      ...mapState('modal', ['isModalVisible'])
    },
    methods: {
      ...mapMutations('modal', ['hideModal'])
    }
  };
</script>
