import { NativeModules, Platform, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const responsiveHeight = h => height * (h / 100);

export const responsiveWidth = w => width * (w / 100);

export const responsiveFontSize = f =>
    Math.sqrt(height * height + width * width) * (f / 100);

