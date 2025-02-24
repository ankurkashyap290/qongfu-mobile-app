import React, {useEffect} from 'react';
import {Portal, Dialog} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  reportAPost,
  resetUpdatedStatusFlag,
} from '../../../redux/places/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import ReportForm from '../custom/ReportForm';
import {
  reportAReview,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
const ReportDialog = ({
  data,
  type,
  visible,
  toggleReportModal,
  token,
  reportAPost,
  resetUpdatedStatusFlag,
  reportPostLoading,
  reportPostError,
  reportPostStatus,
  reportAReview,
  reportReviewLoading,
  reportReviewError,
  reportReviewStatus,
  resetBusinessUpdateStatus,
}) => {
  useEffect(() => {
    if (reportPostStatus) {
      resetUpdatedStatusFlag('reportPost');
      toggleReportModal(false, true);
    }
  }, [reportPostStatus]);

  useEffect(() => {
    if (reportReviewStatus) {
      resetBusinessUpdateStatus('report-review');
      toggleReportModal(false, true);
    }
  }, [reportReviewStatus]);

  const isPost = () => {
    return type === 'post';
  };

  const isReview = () => {
    return type === 'review';
  };

  const getReportFlag = (formValues) => {
    return formValues.reportType === 1
      ? 'Spam'
      : formValues.reportType === 2
      ? 'Offensive'
      : formValues.reportText;
  };

  const handleSubmit = (formValues) => {
    if (isPost()) {
      const payload = {
        gallery_id: data.id,
        flag: getReportFlag(formValues),
      };
      reportAPost(payload, token);
    } else if (isReview()) {
      reportAReview(
        {
          id: data.id,
          type: 1,
          notes: getReportFlag(formValues),
        },
        token,
      );
    }
  };

  const handleCancel = () => {
    toggleReportModal(false, false);
  };

  return (
    <React.Fragment>
      <GlobalOverlayLoading
        loading={isPost() ? reportPostLoading : reportReviewLoading}
        textContent=""
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            toggleReportModal(false, false);
          }}
          style={{
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            borderRadius: 8,
          }}>
          <ReportForm
            title={type}
            error={isPost() ? reportPostError : reportReviewError}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Dialog>
      </Portal>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    place: state.business.place,
    token: state.user.token,
    reportPostLoading: state.places.loading['reportPost'] || false,
    reportPostError: state.places.error['reportPost'] || false,
    reportPostStatus: state.places.updatedStatus['reportPost'] || false,
    reportReviewLoading: state.business.loading['report-review'] || false,
    reportReviewError: state.business.error['report-review'] || false,
    reportReviewStatus:
      state.business.businessUpdateStatus['report-review'] || false,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      reportAPost,
      reportAReview,
      resetUpdatedStatusFlag,
      resetBusinessUpdateStatus,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReportDialog);
