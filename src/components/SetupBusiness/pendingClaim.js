import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Dimensions, Image, Linking} from 'react-native';
import {Divider, List, Button, Portal} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/businessAccount.style';
import PageLayout from '../../layout/PageLayout';
import BusinessSetupIcon from '../../assets/img/business_setup.svg';
import DocumentsRequiredIcon from '../../assets/img/sad_smiley.svg';
import * as NavigationService from '../../navigators/NavigationService';
import {fetchGlobalConfig} from '../../../redux/app/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import HelpDesk from '../User/HelpDesk';
import {stringify} from 'qs';

const BusinessAccount = ({globalConfig, profile, navigation}) => {
  const resetScreen = navigation.getParam('reset') || false;
  const action = navigation.getParam('action');
  const claimItem = navigation.getParam('claimItem');
  const [isHelpDeskVisible, setHelpDeskVisible] = useState(false);

  const [businessConfig, setBusinessConfig] = useState(null);
  const [businessStatus, setBusinessStatus] = useState(null);

  useEffect(() => {
    if (resetScreen) {
      setBusinessStatus(null);
      navigation.setParams({reset: false});
    }
  }, [resetScreen]);
  useEffect(() => {
    if (globalConfig) {
      setBusinessConfig(
        globalConfig.data.find((item) => item.name === 'business-status'),
      );
    } else {
      setBusinessConfig(null);
    }
  }, [globalConfig]);

  useEffect(() => {
    if (businessConfig) {
      let formConfig = null;
      try {
        const tmpData = JSON.parse(businessConfig.configuration);
        formConfig = tmpData.data.find((item) => item.type === action);
        formConfig = formConfig['form-configuration'][0];
      } catch (ex) {
        console.log('Error while parsing configuration');
      }
      setBusinessStatus(formConfig);
    } else {
      setBusinessStatus(null);
    }
  }, [businessConfig]);

  const renderIcon = (icon) => {
    if (
      icon === 'business' ||
      icon === 'business-rejected' ||
      icon === 'review'
    ) {
      return (
        <React.Fragment>
          <Image
            source={require('../../assets/img/Qongfu_Logo_Small.png')}
            style={styles.qongfuLogo}
          />
          <BusinessSetupIcon />
        </React.Fragment>
      );
    } else if (icon === 'documents') {
      return <DocumentsRequiredIcon />;
    }
  };

  const handleAction = (item) => {
    const action = item.action;
    if (action === 'full-claim') {
      // when user created place no claim record
      // then show claim screen
      NavigationService.navigate('BusinessSetupStep5', {
        place: {...claimItem},
      });
    } else if (action === 'documents-claim') {
      NavigationService.navigate('DocumentUploadStep6', {
        reset: true,
        place: {...claimItem.place_details},
        claim: {...claimItem},
        ownershipType: claimItem.claim_applications.ownership_type,
        documentsRequired: true,
      });
    } else if (action === 'helpdesk') {
      setHelpDeskVisible(true);
    } else if (action === 'email') {
      if (item.data) {
        Linking.openURL(
          `mailto:${item.data.email_to}?subject=${encodeURIComponent(
            item.data.subject
              .replace('##PLACE_ID##', claimItem.place_details.id)
              .replace('##PLACE_NAME##', claimItem.place_details.place_name),
          )}`,
        ).catch((err) => console.error('An error occurred', err));
      }
    }
  };

  const isDangerButton = (item) => {
    return item.action === 'deactivate';
  };

  const getRejections = () => {
    return (
      <View>
        {claimItem.claim_applications.rejection_reasons.map((item) => (
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 14,
              color: '#EA8D21',
            }}>
            {item.reason}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={businessStatus === null} textContent="" />
      {businessStatus ? (
        <React.Fragment>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginLeft: 30,
              marginRight: 30,
            }}>
            <Text style={styles.accountStatusTitle}>
              {businessStatus.title}
            </Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {renderIcon(businessStatus.icon)}
            </View>
            {action.indexOf('rejected-') >= 0 ? getRejections() : null}
            <Text style={styles.accountStatusContent}>
              {businessStatus.content}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flex: 1,
              marginBottom: 40,
            }}>
            {businessStatus.actions.map((item) => (
              <Button
                key={`pending-claim-btn-${item.action}`}
                mode={isDangerButton(item) ? 'outlined' : 'contained'}
                onPress={() => handleAction(item)}
                style={[
                  styles.nextButton,
                  {marginBottom: 10},
                  isDangerButton(item) ? styles.nextButtonDanger : null,
                ]}
                labelStyle={[
                  styles.nextButtonLabel,
                  isDangerButton(item) ? styles.nextButtonLabelDanger : null,
                ]}>
                {item.label}
              </Button>
            ))}
          </View>
        </React.Fragment>
      ) : null}
      <Portal>
        <HelpDesk
          profile={profile}
          visible={isHelpDeskVisible}
          onClose={() => {
            setHelpDeskVisible(false);
          }}
        />
      </Portal>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    globalConfig: state.app.globalConfig,
    profile: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchGlobalConfig}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BusinessAccount);
