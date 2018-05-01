import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCityAndLoadForecast } from '../actions/index';
import AddCity from '../components/AddCity';

const mapDispatchToProps = dispatch =>
    bindActionCreators({addCityAndLoadForecast}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(AddCity)