import React from 'react';
import { connect } from 'react-redux';
import { MessageBox } from '@adminjs/design-system';
import { dropNotice } from '../../store/actions/drop-notice';
import { setNoticeProgress } from '../../store/actions/set-notice-progress';
import allowOverride from '../../hoc/allow-override';
const TIME_TO_DISAPPEAR = 3;
export class NoticeElement extends React.Component {
  constructor(props) {
    super(props);
    const {
      notice
    } = props;
    this.timer = null;
    this.state = {
      progress: notice.progress || 0
    };
  }
  componentDidMount() {
    const {
      drop,
      notice,
      notifyProgress
    } = this.props;
    this.timer = setInterval(() => {
      this.setState(state => {
        const progress = state.progress + 100 / TIME_TO_DISAPPEAR;
        notifyProgress({
          noticeId: notice.id,
          progress
        });
        return {
          progress
        };
      });
    }, 1000);
    setTimeout(() => {
      if (this.timer) {
        clearInterval(this.timer);
      }
      drop();
    }, 1000 * (TIME_TO_DISAPPEAR + 1));
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  render() {
    const {
      notice,
      drop
    } = this.props;
    return /*#__PURE__*/React.createElement(MessageBox, {
      style: {
        minWidth: '480px'
      },
      message: notice.message,
      variant: notice.type === 'success' ? 'success' : 'danger',
      onCloseClick: drop
    });
  }
}
const NoticeBox = props => {
  const {
    drop,
    notices,
    notifyProgress
  } = props;
  const notice = notices.length ? notices[notices.length - 1] : null;
  if (notice) {
    return /*#__PURE__*/React.createElement("div", {
      "data-testid": "notice-wrapper",
      "data-css": "notice-wrapper"
    }, /*#__PURE__*/React.createElement(NoticeElement, {
      key: notice.id,
      notice: notice,
      drop: () => drop(notice.id),
      notifyProgress: notifyProgress
    }));
  }
  return /*#__PURE__*/React.createElement("div", null);
};
const mapStateToProps = state => ({
  notices: state.notices
});
const mapDispatchToProps = dispatch => ({
  drop: noticeId => dispatch(dropNotice(noticeId)),
  notifyProgress: ({
    noticeId,
    progress
  }) => dispatch(setNoticeProgress({
    noticeId,
    progress
  }))
});
const ConnectedNoticeBox = connect(mapStateToProps, mapDispatchToProps)(NoticeBox);
const OverridableConnectedNoticeBox = allowOverride(ConnectedNoticeBox, 'NoticeBox');
export { OverridableConnectedNoticeBox as default, OverridableConnectedNoticeBox as NoticeBox };