<script>
    export default {
        name: 'HighLight',

        props: [
            'query', 'given',
        ],

        render: function (h) {
            let query = this.query;
            let startQueryPosition = this.given.indexOf(query);

            if (startQueryPosition === -1) {
                return (
                    <span>{this.given}</span>
                );
            }

            let endQueryPosition = startQueryPosition + query.length;

            let beforeText = this.given.substr(0, startQueryPosition);
            let afterText = this.given.substr(endQueryPosition, this.given.length);

            return (
                <span>
                <span>{beforeText}</span>
                <span style='color:red'>{query}</span>
                <span>{afterText}</span>
                </span>
            );
        },
    }
</script>
