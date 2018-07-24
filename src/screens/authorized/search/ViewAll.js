import React from "react"
import { StyleSheet, View, WebView } from "react-native"

export default class ViewAll extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{
                        html:
                            "<style>p{text-align:justify}</style>" +
                            "<p>" +
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo tortor ut ipsum pharetra sodales. Praesent sed diam non lacus convallis dapibus. Sed vulputate erat risus, ac hendrerit eros egestas id. Etiam pellentesque auctor ipsum, non cursus nisi gravida sed. Ut eget pretium risus. Curabitur a lectus odio. Etiam felis urna, pharetra ut odio in, tristique suscipit tortor. Cras vitae risus odio. Etiam a leo elit. Duis molestie fermentum mi vitae pretium. Morbi luctus semper quam, et suscipit nisi convallis dictum. Fusce sit amet est dapibus, interdum ante non, lacinia metus. Donec at nulla non ante consectetur vulputate. Cras tristique porttitor ligula quis posuere. Integer nec laoreet felis, at tempor leo. Ut et convallis quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo tortor ut ipsum pharetra sodales. Praesent sed diam non lacus convallis dapibus. Sed vulputate erat risus, ac hendrerit eros egestas id. Etiam pellentesque auctor ipsum, non cursus nisi gravida sed. Ut eget pretium risus. Curabitur a lectus odio. Etiam felis urna, pharetra ut odio in, tristique suscipit tortor. Cras vitae risus odio. Etiam a leo elit. Duis molestie fermentum mi vitae pretium. Morbi luctus semper quam, et suscipit nisi convallis dictum. Fusce sit amet est dapibus, interdum ante non, lacinia metus. Donec at nulla non ante consectetur vulputate. Cras tristique porttitor ligula quis posuere. Integer nec laoreet felis, at tempor leo. Ut et convallis quam." +
                            "</p>"
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 20
    }
})