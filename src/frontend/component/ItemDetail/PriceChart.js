import React,{Component} from 'react';
import { Chart } from "react-charts";
import ReactApexChart from 'react-apexcharts';

// class PriceChart extends Component{

//     constructor(props){
//         super(props);
//         this.state={
//             data:[]
//         }
//     }

    

//     render(){
//         return(
//             <div
//             style={{
//               width: "400px",
//               height: "300px"
//             }}
//           >
//        {/* [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]] */}
//             <Chart
//               data={[
//                 {
//                   label: "Series 1",
//                   data: this.state.data
//                 }
//               ]}
//               axes={[
//                 { primary: true, type: "time", position: "bottom" },
//                 { type: "time", position: "left" }
//               ]}
//             />
//           </div>
//         );
//     }
// }

// export default PriceChart;



class PriceChart extends React.Component {
      
    constructor(props) {
      super(props);
      
      this.state = {
        selection: 'one_year',
        options: {
          annotations: {
          yaxis: [{
            y: 30,
            borderColor: '#999',
            label: {
              show: true,
              text: 'Support',
              style: {
                color: "#fff",
                background: '#00E396'
              }
            }
          }],
          xaxis: [{
            x: new Date('14 Nov 1995').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'Rally',
              style: {
                color: "#fff",
                background: '#775DD0'
              }
            }
          }]
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: new Date('01 Mar 1995').getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        }
        },
        series: [{
          data: []
        }],
      }

    }

    datediff(){
        var first_date = new Date(this.props.PriceDate.date[0])
       
        var datearry=[];
        datearry.push(first_date.getTime());
        for(var i=1;i<this.props.PriceDate.date.length;i++){
            var d2 = new Date(this.props.PriceDate.date[1]);
            // var timeDiff = d2.getTime() - first_date.getTime();
            // var DaysDiff = timeDiff / (1000 * 3600 * 24);
            datearry.push(d2.getTime());
        }
        
        // this.setState({datesdiff:datearry});
        // console.log("~~~~~~~~"+datearry);
        return datearry;

    }

    coordinator()
    {
        var graph_date = []
        var date_array = this.datediff()
        this.props.PriceDate.price.map((price,index)=>{
            graph_date.push([date_array[index],price])
        });

        this.setState({series:[{data:graph_date}]});
        console.log("this is the managed array:" + graph_date);
    }
    
    componentDidMount(){
        this.coordinator();
    }

    updateData (timeline) {
      this.setState({
        selection: timeline
      })
      
      switch (timeline) {
        case 'one_month':
          this.setState({
            options: {
              xaxis: {
                min: new Date('28 Jan 2013').getTime(),
                max: new Date('27 Feb 2013').getTime(),
              }
            }
          })
          break;
        case 'six_months':
          this.setState({
            options: {
              xaxis: {
                min: new Date('27 Sep 2012').getTime(),
                max: new Date('27 Feb 2013').getTime(),
              }
            }
          })
          break;
        case 'one_year':
          this.setState({
            options: {
              xaxis: {
                min: new Date('27 Feb 2012').getTime(),
                max: new Date('27 Feb 2013').getTime(),
              }
            }
          })
          break;
        case 'ytd':
          this.setState({
            options: {
              xaxis: {
                min: new Date('01 Jan 2013').getTime(),
                max: new Date('27 Feb 2013').getTime(),
              }
            }
          })
          break;
        case 'all':
          this.setState({
            options: {
              xaxis: {
                min: undefined,
                max: undefined,
              }
            }
          })
          break;
        default:

      }
    }

    render() {

      return (
        

        <div id="chart">
          <div className="toolbar">
            <button onClick={()=>this.updateData('one_month')} id="one_month" className={ (this.state.selection==='one_month' ? 'active' : '')}>1M</button>
            <button onClick={()=>this.updateData('six_months')} id="six_months" className={ (this.state.selection==='six_months' ? 'active' : '')}>6M</button>
            <button onClick={()=>this.updateData('one_year')} id="one_year" className={ (this.state.selection==='one_year' ? 'active' : '')}>1Y</button>
            <button onClick={()=>this.updateData('ytd')} id="ytd" className={ (this.state.selection==='ytd' ? 'active' : '')}>YTD</button>
            <button onClick={()=>this.updateData('all')} id="all" className={ (this.state.selection==='all' ? 'active' : '')}>ALL</button>
          </div>
          <ReactApexChart options={this.state.options} series={this.state.series} type="area" height="350" />
        </div>


      );
    }
  }

export default PriceChart;