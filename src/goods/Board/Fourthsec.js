import { Component } from 'react';
import axios from 'axios';
import './Fourthsec.css';
import Recommand from './Recommand';
import Slider from 'react-slick';
import Store from './Store';

class Fourthsec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount = () => {
    axios
      .post('http://15.165.44.114:5000/getBoardRelation', {
        category: this.props.data.board.category,
        gender: this.props.data.board.gender,
        limit: 10,
      })
      .then((res) => {
        this.setState({ data: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let settings = {
      dots: true,
      infinite: false,
      autoplaySpeed: 10000,
      pauseOnHover: true,
      slidesToShow: 2.4,
      slidesToScroll: 1,
      autoplay: false,
    };
    return (
      <section className='Board_fourth_section' id='location'>
        <div style={{ paddingTop: '120px' }}>
          <div>
            <div className='store_title'>매장 위치</div>
            <Store data={this.props.data.board.store} />
          </div>
          {this.state.data.length > 1 ? (
            <>
              <div className='store_title' style={{ marginTop: '60px' }}>
                추천시술
              </div>
              <div>
                <Slider {...settings}>
                  {this.state.data.map((e) => (
                    <Recommand key={e.id} e={e} />
                  ))}
                </Slider>
              </div>
            </>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Fourthsec;
