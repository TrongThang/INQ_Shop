import React from 'react';

const UnitList = ({ units, onEdit, onDelete }) => {
    return (
        <div className="card">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Mã đơn vị tính</th>
                            <th>Tên đơn vị tính</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit, index) => (
                            <tr key={index}>
                                <td>{unit.id}</td>
                                <td>{unit.name}</td>
                                <td>
                                    <button
                                        className="btn btn-light btn-sm me-2"
                                        onClick={() => onEdit(unit.id)}
                                    >
                                        <i className="bi bi-pencil"></i> Sửa
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onDelete(unit.id)}
                                    >
                                        <i className="bi bi-trash"></i> Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UnitList;