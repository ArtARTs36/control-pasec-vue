<template>
    <vs-row>
        <vs-col vs-lg="4" vs-sm="4" vs-xs="12" v-for="parser in parsers">
            <parser-item v-bind:parser="parser">

            </parser-item>
        </vs-col>
    </vs-row>
</template>

<script>
    import ParserItem from "./parser-item";
    export default {
        name: "TextDataParserList",

        components: {
            ParserItem
        },

        data() {
            return {
                'parsers': [],
                isOpenModalResult: false,
                resultAction: '',
                modalPost: ''
            }
        },

        methods: {
            loadParsers() {
                this.$axios.get(API_URL + '/text-data-parser-components')
                    .then(response => {
                        this.parsers = response.data.data;
                    })
            },
        },
        created() {
            this.loadParsers();
        }
    }
</script>
