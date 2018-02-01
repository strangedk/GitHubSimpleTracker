import React from "react";
import BarChartD3 from "./BarChartD3";

class CommitChart extends React.Component {
    updateData = (newProps) => {
        const commits = newProps.currentRepoCommits;
        const dates = [0,0,0,0,0,0,0,0,0,0,0,0];

        for (let key in commits) {
            let c = commits[key].commit;
            let a = c.author;
            let d = a.date;
            let m = new Date(d).getMonth();

            if (dates[m] !== 0)
                dates[m]++;
            else
                dates[m] = 1;
        }

        this.setState({
            data: dates
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.updateData(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.updateData(newProps);
    }

    render() {
        return (
            <BarChartD3 color={"#fa0"}
                        data={this.state.data}
                        width={500} height={380}/>
        )
    }
}

export default CommitChart;