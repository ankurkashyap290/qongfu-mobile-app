import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import theme from '../../styles/theme.style';
// const TextMoreLess = ({text, }) => {
//   const [usedLines, setUsedLines] = useState(0);
//   const [contentDisplayMode, setContentDisplayMode] = useState('more');
//   const descRef = useRef(null);
//   const _onLayout = (e) => {
//     if (e.nativeEvent.layout.height > 0) {
//       console.log(
//         'height',
//         Math.floor(e.nativeEvent.layout.height / textStyle.fontSize),

//         descRef.current,
//       );
//       setUsedLines(
//         Math.floor(e.nativeEvent.layout.height / textStyle.fontSize),
//       );
//     }
//   };
//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//         }}>
//         <Text
//           ref={descRef}
//           style={textStyle}
//           ellipsizeMode="tail"
//           numberOfLines={contentDisplayMode === 'less' ? undefined : 4}
//           onLayout={(e) => _onLayout(e)}>
//           {text}
//         </Text>
//       </View>
//       {usedLines >= 6 ? (
//         <View
//           style={{
//             alignItems: 'flex-end',
//           }}>
//           <Button
//             mode="text"
//             compact
//             onPress={() => {
//               setContentDisplayMode(
//                 contentDisplayMode === 'less' ? 'more' : 'less',
//               );
//             }}
//             labelStyle={[
//               {
//                 fontSize: 12,
//                 fontFamily: 'Roboto',
//                 fontWeight: theme.FONT_WEIGHT_MEDIUM,
//                 marginVertical: 0,
//               },
//               moreButtonStyle ? moreButtonStyle : {},
//             ]}>
//             {contentDisplayMode}
//           </Button>
//         </View>
//       ) : null}
//     </View>
//   );
// };

// export default TextMoreLess;

export default class TextReadMore extends React.Component {
  state = {
    measured: false,
    shouldShowReadMore: false,
    showAllText: false,
  };

  async componentDidMount() {
    this._isMounted = true;
    await nextFrameAsync();

    if (!this._isMounted) {
      return;
    }

    // Get the height of the text with no restriction on number of lines
    const fullHeight = await measureHeightAsync(this._text);
    this.setState({measured: true});
    await nextFrameAsync();

    if (!this._isMounted) {
      return;
    }

    // Get the height of the text now that number of lines has been set
    const limitedHeight = await measureHeightAsync(this._text);
    if (fullHeight > limitedHeight) {
      this.setState({shouldShowReadMore: true}, () => {
        this.props.onReady && this.props.onReady();
      });
    } else {
      this.props.onReady && this.props.onReady();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let {measured, showAllText} = this.state;

    let {numberOfLines} = this.props;

    return (
      <View>
        <Text
          numberOfLines={measured && !showAllText ? numberOfLines : 0}
          style={this.props.textStyle}
          ref={(text) => {
            this._text = text;
          }}>
          {this.props.children}
        </Text>

        {this._maybeRenderReadMore()}
      </View>
    );
  }

  _handlePressReadMore = () => {
    this.setState({showAllText: true});
  };

  _handlePressReadLess = () => {
    this.setState({showAllText: false});
  };

  _maybeRenderReadMore() {
    let {shouldShowReadMore, showAllText} = this.state;

    if (shouldShowReadMore && !showAllText) {
      if (this.props.renderTruncatedFooter) {
        return this.props.renderTruncatedFooter(this._handlePressReadMore);
      }

      return (
        <Button
          mode="text"
          style={this.props.moreButtonStyle}
          onPress={this._handlePressReadMore}>
          Read more
        </Button>
      );
    } else if (shouldShowReadMore && showAllText) {
      if (this.props.renderRevealedFooter) {
        return this.props.renderRevealedFooter(this._handlePressReadLess);
      }

      return (
        <Button
          mode="text"
          style={this.props.moreButtonStyle}
          onPress={this._handlePressReadLess}>
          Hide
        </Button>
      );
    }
  }
}

function measureHeightAsync(component) {
  return new Promise((resolve) => {
    component.measure((x, y, w, h) => {
      resolve(h);
    });
  });
}

function nextFrameAsync() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
