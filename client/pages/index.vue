<template>
  <section class="container">
    <client-only>
      <file-uploader class="my-3"/>
      <hr>
      <data-viewer class="my-3"/>
    </client-only>
  </section>
</template>

<script>
import FileUploader from '~/components/FileUploader.vue'
import DataViewer from '~/components/DataViewer.vue'

export default {
    components: {
        FileUploader,
        DataViewer
    }
}
</script>
