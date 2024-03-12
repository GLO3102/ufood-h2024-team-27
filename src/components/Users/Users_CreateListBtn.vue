<template>
    <button @click="$emit('createList')" type="button" class="btn btn-primary" data-bs-dismiss="modal">
              Create List
            </button>
</template>

<script>
export default{
    name: 'CreateListBtn',
  
}
</script>