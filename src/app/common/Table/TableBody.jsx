import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, col) => {
    return item._id + (col.path || col.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={_.uniqueId()} className={`${this.props.classNamePrefix}-tr`}>
            {columns.map((col) => (
              <td
                key={_.uniqueId()}
                className={`${this.props.classNamePrefix}-td`}
              >
                {this.renderCell(item, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
