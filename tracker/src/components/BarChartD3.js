import React from "react"

import {scaleLinear} from "d3-scale"
import {max, min} from "d3-array"
import {select} from "d3-selection"

import "../styles/barChartD3.css";

class BarChartD3 extends React.Component {
    monthes = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    updateChartComponent = () => {
        const node = this.node;
        const dataMax = max(this.props.data);
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.height]);

        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .enter()
            .append("rect");

        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .exit()
            .remove();

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', this.props.color)
            .attr('x', (d, i) => i * 20)
            .attr('y', d => this.props.height - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 5);
    };

    updateInfoData = (newProps) => {
        let minValue = min(newProps.data);
        let maxValue = max(newProps.data);

        this.setState({
            minValue: minValue,
            maxValue: maxValue,
            minMonth: newProps.data.indexOf(minValue),
            maxMonth: newProps.data.lastIndexOf(maxValue)
        });
    };

    componentWillReceiveProps(newProps) {
        this.updateInfoData(newProps);
    }

    componentDidMount() {
        this.updateChartComponent();
        this.updateInfoData(this.props);
    }

    componentDidUpdate() {
        this.updateChartComponent();
    }

    render() {
        const showData = !!this.state;
        if (showData) {
            const maxMonthString = this.monthes[this.state.maxMonth];
            const minMonthString = this.monthes[this.state.minMonth];
            const theBestMonth = "The best is " +
                maxMonthString + " : " +
                this.state.maxValue + " commits";

            var dataMonth = (this.state.maxValue > 0) ? <div>{theBestMonth}</div> : null;
        }

        return (
            <div className="bar-chart-container">
                {dataMonth}

                <svg ref={(node) => {
                    this.node = node
                }} width={this.props.width} height={this.props.height}/>
            </div>
        );
    }
}

export default BarChartD3