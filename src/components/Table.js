import React, { Component } from 'react';
import TableCell from './TableCell';
import _ from 'lodash';
import './../styles/table.css';

class Table extends Component {

   renderList(){
      let mainList;

      //Show all items (1 : All) so the mainList will be like the parent's list 
      if(this.props.rows === 1){
        mainList = this.props.tableData;
      }else{
        //Show a set of items (10,25,50,100 : some), so we'll update an array based on the parent's list
        let refreshList = [];
        let rows = 0;
        let listIndex;

        //If the index is greater than the list, it means the amount of items have changed.
        //Therefore, the index is reset to (1). Otherwise, calculate the initial index by
        //extracting (1) from the current page and multiplying to the amount of items.
        //This refreshes the list and restarts it to zero in case the show amount is changed 
        //on the parent.
        if( ((this.props.pageNumber - 1) * this.props.rows) >= this.props.tableData.length){
          listIndex = 0;
        }else{
          listIndex = (this.props.pageNumber - 1) * this.props.rows;
        }

        // //Fill the new list until all the rows are the same amount of items, and render them.
        for(listIndex; listIndex < this.props.tableData.length; listIndex++){
          if(this.props.tableData[listIndex] != null){
              refreshList.push(this.props.tableData[listIndex]);
              rows++;

              if(rows == this.props.rows){
                break;
              }
          }
        }

        mainList = refreshList;
      }

      //After deciding which one is the mainList, then render it
      return _.map(mainList, (publisher, index) => {
        if(publisher == null){
          debugger;
        }
          return (
              <tr key={index}>
                <TableCell topic={publisher._id} />
                <TableCell topic={publisher.revenue_share.revenue_share_method} />
                <TableCell markupType='td-obj' topic={publisher.revenue_share.both} />
                <TableCell markupType='Button' topic={publisher._id} pub={publisher} btnStyle='primary' title='Edit' onSelectItem={(...args) => this.props.onSelectRow(...args)} />
              </tr>
          )
        });
  }

  render() {
      return (
        <div>
          <table className="publishers-table">
                <tbody>
                  
                    {/* Map all the columns titles */}
                    <tr>
                      {this.props.tableColumns != null ? _.map(this.props.tableColumns, (title, id) => <TableCell key={id} markupType='th' topic={title} />) : ''}
                    </tr>
                  {/* Map the list from parent (contains its own <tr>, do not add here */}
                    {this.renderList()}
                </tbody>
          </table>
        </div>
      );
  }
}

export default Table;