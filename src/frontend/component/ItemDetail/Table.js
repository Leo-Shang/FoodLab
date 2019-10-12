import { Descriptions, Badge } from 'antd';
import React from 'react';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

const Nutrition = (props)=>{
    return(
        <Descriptions title="Nutrition" bordered>
            <Descriptions.Item label="calories">{props.calories} </Descriptions.Item>
            <Descriptions.Item label="fat">{props.fat}</Descriptions.Item>
            <Descriptions.Item label="vitamin_a">{props.vitamin_a}</Descriptions.Item>
            <Descriptions.Item label="vitamin_c">{props.vitamin_c}</Descriptions.Item>
            <Descriptions.Item label="carbohydrate">{props.carbohydrate}</Descriptions.Item>
            <Descriptions.Item label="calcium">{props.calcium}</Descriptions.Item>
            <Descriptions.Item label="iron">{props.iron}</Descriptions.Item>
            <Descriptions.Item label="sodium">{props.sodium}</Descriptions.Item>
            <Descriptions.Item label=""></Descriptions.Item>
        </Descriptions>
        // mountNode,
    );
};

export default Nutrition