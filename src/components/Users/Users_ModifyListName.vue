<template>
    <button
      class="btn btn-success btn-sm rounded-0"
      type="button"
      data-toggle="tooltip"
      data-placement="top"
      title="Edit"
      @click="$emit('modifyListName')"
    >
      <i class="fa fa-edit"></i>
    </button>
</template>

<script>
export default{
    name: 'ModifyListName',
    emits: ['modifyListName'],
}
</script>