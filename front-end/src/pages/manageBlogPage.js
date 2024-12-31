import React from "react";
import ManageBlogItems from "../component/ManageBlogPage/manageBlogItems";
import FilterBlog from "../component/ManageBlogPage/filterBlog";
import Pagination from "../component/Pagination/pagination";
import HeaderBlog from "../component/ManageBlogPage/headerBlog";

function ManageBlogPage() {
    return (
        <div class="main-content-inner">
            <div class="container-fluid py-4">
                <HeaderBlog />
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" class="form-control" placeholder="Tìm kiếm bài viết" />
                        </div>
                    </div>
                    <div class="col-md-2 ">
                        <select class="form-select status">
                            <option>Trạng thái</option>
                            <option>Hiển thị</option>
                            <option>Ẩn</option>
                        </select>
                    </div>
                    {/* Bộ lọc */}
                  <FilterBlog />
                </div>
                <div class="card">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th width="40">
                                        <input type="checkbox" />
                                    </th>
                                    <th>Mã tin</th>
                                    <th>Tiêu đề</th>
                                    <th>Tác giả</th>
                                    <th>Lượt xem</th>
                                    <th>Hình ảnh</th>
                                    <th>Ngày đăng</th>
                                    <th>Trạng Thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* duyệt hết giữ liệu có trong database */}
                                <ManageBlogItems />
                                <ManageBlogItems />
                                <ManageBlogItems />
                                <ManageBlogItems />
                                <ManageBlogItems />
                            </tbody>
                        </table>
                    </div>
                    <Pagination />
                </div>
            </div>
        </div>
    )
};
export default ManageBlogPage;