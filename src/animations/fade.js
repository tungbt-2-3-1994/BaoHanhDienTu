const fade = (props) => {
    const { position, layout, scene } = props;

    const thisSceneIndex = scene.index;
    const height = layout.initHeight;
    const width = layout.initWidth;

    const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
    });

    const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
    });

    const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] };

    return scaleWithOpacity;
}


export default fade;