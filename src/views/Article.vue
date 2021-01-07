<template>
    <div>
        <prismic-rich-text :field="fields.title"/>
    </div>
</template>

<script>
    export default {
        name: 'post',
        data () {
            return {
                documentId: null,
                fields: {
                    title: null,
                },
            }
        },
        methods: {
            getContent (uid) {
                //Query to get post content
                this.$prismic.client.getByUID('article', uid)
                    .then((document) => {
                        if (document) {
                            this.documentId = document.id
                            this.fields.title = document.data.title
                        }
                        else {
                            //returns error page
                            this.$router.push({ name: 'home' })
                        }
                    })
            }
        },
        created () {
            this.getContent(this.$route.params.uid)
        },
        beforeRouteUpdate (to, from, next) {
            this.getContent(to.params.uid)
            next()
        }
    }
</script>
