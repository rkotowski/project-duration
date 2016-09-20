import React from 'react';
import { getClient } from '../../helper/AppHelper';
import ProjectProgressBar from '../../progress_bar/index';


/* 
 * TODO: "opcje dodatkowe", feature do zrobienia na kiedyś, przykładowe opcje dodatkowe :
 * o - zmiana daty (np przesunięcie daty końcowej o datę pożądaną
 * o - usunięcie zakończonego już projektu (ważne żeby było to dostępne tylko dla projektów zakończonych
 */

let Project = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        employee: React.PropTypes.object.isRequired,
        index: React.PropTypes.number.isRequired,
        client: React.PropTypes.array.isRequired
    },
    getProjectIndex: function (index) {
        if (index == 0) {
            return <div className="col-sm-2 emplName">{this.props.employee.name}</div>
        } else {
            return <div className="col-sm-2 emplName"></div>
        }
    },

    render(){
        let clientObj = new Object(getClient(this.props.data.client_id, this.props.client));
        
        return (
            <div className="col-sm-12 project">
                {this.getProjectIndex(this.props.index)}
                <div className="col-sm-8">
                    <span className="clientName">{clientObj.name}</span>
                    <ProjectProgressBar
                        startDate={this.props.data.startDate}
                        endDate={this.props.data.endDate} />
                </div>
                <div className="col-sm-2">opcje dodatkowe
                    <div className="options">
                        <a role="button" disabled="disabled" className="btn btn-default btn-xs editProject">
                            <i className="glyphicon glyphicon-wrench" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
});

export default Project;