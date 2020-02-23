<template>
    <vs-row>
        <vs-col vs-lg="4" vs-sm="4" vs-xs="12" v-for="post in news">
            <vs-card actionable >
                <div slot="header">
                    <h3>
                        {{ post.title | cutText(75) }}
                    </h3>
                </div>

                <div slot="media">
                    <img src="@/assets/images/big/img1.jpg">
                </div>

                <div class="mb-2">
                    <h6 class="mb-2">{{ post.pub_date }}</h6>
                    <span v-if="post.description">
                        {{ post.description | cutText(150)}}
                    </span>
                    <span v-else>
                        {{ post.title | cutText(150)}}
                    </span>
                </div>

                <vs-button
                        color="success"
                        type="filled"
                        @click="openPost(post)"
                >
                    Прочитать подробнее
                </vs-button>
            </vs-card>

            <ModalResult
                    v-if="isOpenModalResult"
                    v-bind:post="modalPost"
                    @closeModal="closeModalResult"
            />
        </vs-col>
    </vs-row>    
</template>

<script>
import ModalResult from "../../../components/based/ExternalNewsModal";
export default {
    name: "Blogs",

    components: {
        ModalResult
    },

    data() {
        return {
            'news': [],
            isOpenModalResult: false,
            resultAction: '',
            modalPost: ''
        }
    },

    methods: {
        loadNews() {
            this.$axios.get(API_EXTERNAL_NEWS_INDEX + 'chart')
                .then(response => {
                    this.news = response.data.data;

                    console.log(this.news);
                })
        },
        openPost(post) {
            this.modalPost = post;
            this.$openModalResult(post.description);
        },
        closeModalResult() {
            this.isOpenModalResult = false;
        }
    },
    created() {
        this.loadNews();
    }
}
</script>