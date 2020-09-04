import React from "react";
import PropTypes from "prop-types";
import { ImageBackground, ActivityIndicator, View } from "react-native";
import Image from "react-native-fast-image";

class ImageLoad extends React.Component {
  static propTypes = {
    isShowActivity: PropTypes.bool,
    mode: PropTypes.string
  };

  static defaultProps = {
    isShowActivity: true,
    mode: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true
    });
  }

  onError() {
    this.setState({
      isError: true
    });
  }

  _renderLoader() {
    const {
      mode,
      borderRadius,
      backgroundColor,
      loadingStyle,
      placeholderSource,
      placeholderStyle,
      customImagePlaceholderDefaultStyle
    } = this.props;
    return (
      <View
        style={[
          styles.viewImageStyles,
          { borderRadius: borderRadius },
          backgroundColor ? { backgroundColor: backgroundColor } : {}
        ]}
      >
        {this.props.isShowActivity && !this.state.isError && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size={loadingStyle ? loadingStyle.size : "small"}
            color={loadingStyle ? loadingStyle.color : "gray"}
          />
        )}
        <Image
          style={
            placeholderStyle
              ? placeholderStyle
              : [
                  styles.imagePlaceholderStyles,
                  customImagePlaceholderDefaultStyle,
                  mode === "blur" ? styles.imageBlurStyle : {}
                ]
          }
          source={
            placeholderSource
              ? placeholderSource
              : mode === "blur"
              ? imgBlur()
              : require("./Images/empty-image.png")
          }
        ></Image>
      </View>
    );
  }

  render() {
    const { style, source, resizeMode, borderRadius, children } = this.props;
    return (
      <View
        style={{
          borderRadius: borderRadius,
          position: "relative",
          flex: 1
        }}
      >
        {typeof children !== "undefined" && children !== null && (
          <ImageBackground
            onLoadEnd={this.onLoadEnd.bind(this)}
            onError={this.onError.bind(this)}
            style={[styles.backgroundImage, style]}
            source={source}
            resizeMode={resizeMode}
            borderRadius={borderRadius}
          >
            {!this.state.isLoaded && this._renderLoader()}
            {children && (
              <View style={styles.viewChildrenStyles}>{children}</View>
            )}
          </ImageBackground>
        )}
        {(typeof children === "undefined" || children === null) && (
          <View style={styles.viewImageStyles}>
            {this.state.isLoaded && !this.state.isError && (
              <Image
                onLoadEnd={this.onLoadEnd.bind(this)}
                onError={this.onError.bind(this)}
                style={[
                  styles.fastImageStyle,
                  { borderRadius: borderRadius },
                  style
                ]}
                source={source}
                resizeMode={resizeMode}
                borderRadius={borderRadius}
              />
            )}
            {!this.state.isLoaded && this._renderLoader()}
          </View>
        )}
      </View>
    );
  }
}

const imgBlur = () => {
  const m = new Date().getMilliseconds() % 100;
  return Blurs[m % 20];
};

const Blurs = [
  require("./Images/blur/blur-0.jpg"),
  require("./Images/blur/blur-1.jpg"),
  require("./Images/blur/blur-2.jpg"),
  require("./Images/blur/blur-3.jpg"),
  require("./Images/blur/blur-4.jpg"),
  require("./Images/blur/blur-5.jpg"),
  require("./Images/blur/blur-6.jpg"),
  require("./Images/blur/blur-7.jpg"),
  require("./Images/blur/blur-8.jpg"),
  require("./Images/blur/blur-9.jpg"),
  require("./Images/blur/blur-10.jpg"),
  require("./Images/blur/blur-11.jpg"),
  require("./Images/blur/blur-12.jpg"),
  require("./Images/blur/blur-13.jpg"),
  require("./Images/blur/blur-14.jpg"),
  require("./Images/blur/blur-15.jpg"),
  require("./Images/blur/blur-16.jpg"),
  require("./Images/blur/blur-17.jpg"),
  require("./Images/blur/blur-18.jpg"),
  require("./Images/blur/blur-19.jpg")
];

const styles = {
  backgroundImage: {
    position: "relative"
  },
  activityIndicator: {
    position: "absolute",
    margin: "auto",
    zIndex: 9
  },
  viewImageStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlurStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  fastImageStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "contain"
  },
  imagePlaceholderStyles: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center"
  },
  viewChildrenStyles: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    backgroundColor: "transparent"
  }
};

export default ImageLoad;
