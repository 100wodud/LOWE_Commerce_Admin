import { Component } from "react";
import BAimg from "./BAimg";
import Caution from "./Caution";
import Mainimg from "./Mainimg";
import "./Thirdsec.css"
import store from "../../data/Store";

class Thirdsec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainimg: [],
            BAimg: [],
            subimg: [],
            store: "",
        };
    }
    
    componentDidMount = () => {
        if(this.props.data.board.Images){
            let mainimg =[];
            let BAimg = [];
            let subimg = [];
            for(let i = 0; i < this.props.data.board.Images.length; i++){
                if(this.props.data.board.Images[i].imgType === 0 ){
                    mainimg.push(this.props.data.board.Images[i]);
                } else if (this.props.data.board.Images[i].imgType === 2) {
                    BAimg.push(this.props.data.board.Images[i]);
                } else if (this.props.data.board.Images[i].imgType === 1) {
                    subimg.push(this.props.data.board.Images[i]);
                }
            }
            this.setState({mainimg: mainimg, BAimg: BAimg, subimg:subimg});
        }

        this.props.data.board.store === '신촌점' ?
          this.setState({store:store[0]}) :
          this.props.data.board.store === '홍대입구역점' ?
            this.setState({store:store[2]}) :
            this.props.data.board.store === '합정점' ?
              this.setState({store:store[1]}) :
              this.props.data.board.store === '강남점' ?
                this.setState({store: store[3]}) :
                this.setState({store: store[3]})
        
    }

    render() {
        console.log(this.state)
        return (
            <section className="Board_third_section" id="goods">
                {
                    this.state.mainimg.length ?
                        <div className="Board_mainimg">
                            <Mainimg data={this.state.mainimg} sub={this.state.subimg} />
                        </div>
                     : null
                }
                <div className="BaA">Before & After</div>
                {
                    this.state.BAimg.length ?
                    this.state.BAimg.map((e, i)=>(
                        <div className="Board_BAimg" key={i}>
                            <BAimg data={e} />
                        </div>
                    )) : null
                }
                <div className="Board_caution">
                    <Caution data={this.props.data.board.category} />
                </div>
                <div className="private">Private Room</div>
                <div className="private_div" >
                {
                    this.state.store ?
                    this.state.store.private.map((e, i)=>(
                        <img src={process.env.PUBLIC_URL + e} key={i} alt="사진리뷰" className="private_img" />
                    )) : null
                }
                </div>
            </section>
        )
    }
}

export default Thirdsec;