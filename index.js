import React from "react";
import PropTypes from "prop-types";
import { ImageBackground, ActivityIndicator, View } from "react-native";
import Image from "react-native-fast-image";

const Blurs = [
  require("./imgs/blur-0.jpg"),
  require("./imgs/blur-1.jpg"),
  require("./imgs/blur-2.jpg"),
  require("./imgs/blur-3.jpg"),
  require("./imgs/blur-4.jpg"),
  require("./imgs/blur-5.jpg"),
  require("./imgs/blur-6.jpg"),
  require("./imgs/blur-7.jpg"),
  require("./imgs/blur-8.jpg"),
  require("./imgs/blur-9.jpg"),
  require("./imgs/blur-10.jpg"),
  require("./imgs/blur-11.jpg"),
  require("./imgs/blur-12.jpg"),
  require("./imgs/blur-13.jpg"),
  require("./imgs/blur-14.jpg"),
  require("./imgs/blur-15.jpg"),
  require("./imgs/blur-16.jpg"),
  require("./imgs/blur-17.jpg"),
  require("./imgs/blur-18.jpg"),
  require("./imgs/blur-19.jpg")
];

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
      customImagePlaceholderDefaultStyle,
      style
    } = this.props;
    return (
      <View
        style={[
          styles.viewImageStyles,
          { borderRadius: borderRadius },
          backgroundColor ? { backgroundColor: backgroundColor } : {},
          style
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
                  mode === "blur" ? styles.imageBlurStyle : {},
                  style
                ]
          }
          source={
            placeholderSource
              ? placeholderSource
              : mode === "blur"
              ? imgBlur()
              : require("./imgs/empty-image.png")
          }
        />
      </View>
    );
  }

  render() {
    const { style, source, resizeMode, borderRadius, children } = this.props;
    return (
      <View
        style={[
          {
            borderRadius: borderRadius,
            position: "relative",
            flex: 1
          },
          style
        ]}
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
          <View style={[styles.viewImageStyles, style]}>
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
    alignItems: "center",
    position: "relative"
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
