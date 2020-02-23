<template lang="html">
    <vs-popup
            class="holamundo"
            :title="post.title"
            :active.sync="isOpenModal"
            @close="closeModal"
    >
        <vs-breadcrumb
                :items="[{
                      title: post.pub_date
                  },
                  {
                      title: post.source.name,
                      url: post.source.link
                  }
                ]"
                separator="|"
        ></vs-breadcrumb>

        {{ post.description ? post.description : post.title }}

        <br/>
        <br/>

        <vs-button
                type="filled"
                :href="post.link"
                style="width: 100%"
                target="_blank"
        >
            Открыть в первоисточнике
        </vs-button>
    </vs-popup>
</template>

<script>
    export default {
        data() {
            return {
                isOpenModal: true
            }
        },

        props: [
            'post',
        ],

        methods: {
            closeModal() {
                this.$emit('closeModal');
            }
        },
        mounted() {
            if (this.title === undefined) {
                this.title = 'Результат сохранения информации';
            }
        }
    }
</script>
