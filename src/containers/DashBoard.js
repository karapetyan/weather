import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeCity } from '../actions/index';
import DashBoard from '../components/DashBoard';

const mapStateToProps = state => ({
    cities: state.cities
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({removeCity}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard)