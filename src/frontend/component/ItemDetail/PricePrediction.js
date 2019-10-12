import React, { Component } from 'react';
import { Statistic, Card, Row, Col, Icon } from 'antd';
const tf = require('@tensorflow/tfjs');

class PricePrediction extends Component{
    constructor(props){
        super(props)
        this.state={
            predict:null
        }
    }
    datediff(){
        var first_date = new Date(this.props.PriceDate.date[0])
       
        var datearry=[];
        datearry.push(0);
        for(var i=1;i<this.props.PriceDate.date.length;i++){
            var d2 = new Date(this.props.PriceDate.date[1]);
            var timeDiff = d2.getTime() - first_date.getTime();
            var DaysDiff = timeDiff / (1000 * 3600 * 24);
            datearry.push(DaysDiff);
        }
        
        // this.setState({datesdiff:datearry});
        // console.log("~~~~~~~~"+datearry);
        return datearry;

    }

    price_prideciton(){
        
        // Define a model for linear regression.
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 1, inputShape: [1]}));

        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
        var len = this.props.PriceDate.price.length
        // Generate some synthetic data for training.
        const xs = tf.tensor2d(this.datediff(), [len, 1]);
        const ys = tf.tensor2d(this.props.PriceDate.price, [len, 1]);

        // Train the model using the data.
        model.fit(xs, ys, {epochs: 5}).then(() => {
            // Use the model to do inference on a data point the model hasn't seen before:
            const result  = model.predict(tf.tensor2d([len+1], [1, 1]));
            // Open the browser devtools to see the output
            const data = result.dataSync();
            this.setState({predict:data[0]})
        });
        // console.log('lol:'+predict.print());
        // console.log("~~~~~~~~~~~~~~~~~~this prediction:"+Prediction);
        // return Prediction;
    }

    // Statistic_ud(){
    //     if (this.state.predict )
    // }
    componentDidMount(){
        this.price_prideciton();
    }


    render(){
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                <Col span={12}>
                    <Card>
                    <Statistic
                        title="Tomorrow Price will be:"
                        value={this.state.predict}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        // prefix={<Icon type="arrow-up" />}
                        suffix="$"
                    />
                    </Card>
                </Col>
                </Row>
            </div>

        );
    }


}

export default  PricePrediction;