import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import _ from 'lodash';

class CustomPagination extends Component {

  constructor(props){
      super(props);

      this.state = {
          totalPages: 20,
          currentPage: 1,
          itemsPerPage: 10
      }

      this.selectPage = this.selectPage.bind(this);
      this.refreshList = this.refreshList.bind(this);
  }

  refreshList(evt, evtKey){

        if(evt.target.value == 1){
            this.setState({itemsPerPage: this.props.totalItems});
        }else{
            this.setState({itemsPerPage: parseInt(evt.target.value)});
        }

        let calculateTotalPages = (evt.target.value == 1 ? this.props.totalItems / this.props.totalItems : this.props.totalItems / evt.target.value);
        let thisPage = Math.ceil(Math.ceil(calculateTotalPages) / this.props.totalItems);
        
        this.setState({totalPages: Math.ceil(calculateTotalPages)});
        this.setState({currentPage: thisPage});

        this.props.onUpdateItems(evt.target.value);
  }

  selectPage(evtKey){
      this.setState({currentPage: evtKey});
      this.props.onSelectPage(evtKey);
  }

  showOptionsList(){
      return _.map(this.props.showOptions, (opt) => {
        return <option key={opt} value={opt}> Show {opt == 1 ? "All" : opt}</option>
      });
  }

  render() {

      return (
        <div className="navigator">
          <div className="dropdown">
            <select onChange={this.refreshList} value={this.state.itemsPerPage} id="show-items-dropdown">
              {this.showOptionsList()}
            </select>
          </div>

          <div>Showing {this.state.itemsPerPage == 1 ? "All" : this.state.itemsPerPage} items in Pages {this.state.currentPage} of {this.state.totalPages}</div>
          <Pagination bsSize="small" prev next first last ellipsis boundaryLinks items={this.state.totalPages} maxButtons={10} activePage={this.state.currentPage} onSelect={this.selectPage} />
        </div>
      );
  }
}

export default CustomPagination;