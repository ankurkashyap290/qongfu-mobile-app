import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/documentUpload.style';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

const uploadOptions = ['Phone Gallery', 'Phone Camera', 'File Folder'];

const pickerOptions = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  mediaType: 'mixed',
  storageOptions: {
    skipBackup: true,
  },
};

const DocumentUpload = ({buttonLabel, name, onSelect}) => {
  const [actionSheetRef, setActionSheetRef] = useState(null);
  const [selectedImage, setImage] = useState({imageUri: '', imageSource: null});

  useEffect(() => {
    if (selectedImage.imageSource) {
      onSelect(getImageObj(selectedImage.imageSource));
    }
  }, [selectedImage]);

  const getImageObj = (photo) => {
    let uri = '';
    if (Platform.OS === 'android') {
      uri = photo.uri;
    } else {
      uri = photo.uri.replace('file://', '');
    }
    return {
      uri: uri,
      type: photo.type,
      name: name + '.' + uri.split('.').pop(),
    };
  };

  const handleUploadClick = () => {
    actionSheetRef.show();
  };

  const handleLaunchCamera = () => {
    ImagePicker.launchCamera(pickerOptions, (response) => {
      !response.didCancel &&
        setImage({imageUri: response.uri, imageSource: response});
    });
  };

  const handleLaunchGallery = () => {
    ImagePicker.launchImageLibrary(pickerOptions, (response) => {
      !response.didCancel &&
        setImage({imageUri: response.uri, imageSource: response});
    });
  };

  const handleLaunchFileFolder = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.video,
        ],
      });
      setImage({imageUri: response.uri, imageSource: response});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        setImage({imageUri: '', imageSource: null});
      } else {
        console.log('error while picking doc', err);
      }
    }
  };

  return (
    <React.Fragment>
      <Button
        mode="text"
        onPress={handleUploadClick}
        labelStyle={styles.documentUploadButtonLabel}>
        {buttonLabel}
      </Button>
      <ActionSheet
        ref={(aSheet) => {
          setActionSheetRef(aSheet);
        }}
        title={'SELECT'}
        options={[...uploadOptions, 'Cancel']}
        cancelButtonIndex={uploadOptions.length}
        destructiveButtonIndex={1}
        onPress={(index) => {
          switch (index) {
            case 0:
              handleLaunchGallery();
              break;
            case 1:
              handleLaunchCamera();
            case 2:
              handleLaunchFileFolder();
          }
        }}
      />
    </React.Fragment>
  );
};

export default DocumentUpload;
