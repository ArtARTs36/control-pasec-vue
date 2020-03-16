<template lang="html">
    <vs-card actionable >
        <div slot="header">
            <h3>
                {{ parser.title | cutText(75) }}
            </h3>
        </div>

        <div slot="media">
            <img src="@/assets/images/big/img1.jpg">
        </div>

        <div class="mb-2">
            {{ parser.template }}
        </div>

        <vs-button
                color="success"
                type="filled"
        >
            Прочитать подробнее
        </vs-button>
    </vs-card>
</template>

<script>
    export default {
        props: [
            'parser'
        ],
    }
</script>
