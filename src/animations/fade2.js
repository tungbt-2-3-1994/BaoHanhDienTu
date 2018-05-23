const fade2 = (props) => {
    const { position, scene } = props

    const index = scene.index

    const translateX = 0
    const translateY = 0

    const opacity = position.interpolate({
        inputRange: [index - 0.5, index, index + 0.5],
        outputRange: [0.5, 1, 0.5]
    })

    return {
        opacity,
        transform: [{ translateX }, { translateY }]
    }
}

export default fade2;